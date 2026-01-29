#!/usr/bin/env node

/**
 * Data Integrity & JSON Validator
 * 
 * 1. Validates all collection files in public/data/resources/collection/*.json
 * 2. Validates categories in public/data/categories/categories.json
 * 3. Checks for broken links and invalid category references
 * 4. Ensures no cross-resource ID duplicates
 */

const fs = require('fs');
const path = require('path');

function validate() {
    try {
        console.log('🧪 Starting data validation process...');

        const rootDir = path.join(__dirname, '..');
        const collectionDir = path.join(rootDir, 'public/data/resources/collection');
        const categoriesPath = path.join(rootDir, 'public/data/categories/categories.json');

        let hasErrors = false;
        const allResourceIds = new Set();
        const errors = [];

        const logError = (file, message) => {
            errors.push(`[${file}] ${message}`);
            hasErrors = true;
        };

        const readJson = (filePath) => {
            try {
                let content = fs.readFileSync(filePath, 'utf8');
                content = content.replace(/^\uFEFF/, '');
                return JSON.parse(content);
            } catch (e) {
                logError(path.basename(filePath), `Invalid JSON syntax: ${e.message}`);
                return null;
            }
        };

        // 1. Load and Validate Categories
        console.log('📂 Validating categories...');
        const categoriesData = readJson(categoriesPath);
        if (!categoriesData || !Array.isArray(categoriesData.categories)) {
            logError('categories.json', 'Categories file is missing or invalid.');
            process.exit(1);
        }

        const validCategoryIds = new Set(categoriesData.categories.map(c => c.id));
        console.log(`✅ Loaded ${validCategoryIds.size} valid category IDs.`);

        // 2. Validate Resource Collections
        console.log('📂 Validating resource collections...');
        if (!fs.existsSync(collectionDir)) {
            logError('collection', 'Resource collection directory not found.');
        } else {
            const files = fs.readdirSync(collectionDir).filter(f => f.endsWith('.json'));

            files.forEach(file => {
                const filePath = path.join(collectionDir, file);
                const data = readJson(filePath);

                if (!data) return;
                if (!Array.isArray(data.resources)) {
                    logError(file, 'Missing "resources" array.');
                    return;
                }

                data.resources.forEach((r, idx) => {
                    const ctx = `${file} (index ${idx})`;

                    // Required fields
                    if (!r.id) logError(ctx, 'Missing "id" field.');
                    if (!r.title) logError(ctx, `Missing "title" for resource: ${r.id || idx}`);
                    if (!r.shortDescription) logError(ctx, `Missing "shortDescription" for resource: ${r.id || r.title || idx}`);

                    if (r.id) {
                        if (allResourceIds.has(r.id)) {
                            logError(file, `Duplicate Resource ID detected: ${r.id}`);
                        }
                        allResourceIds.add(r.id);
                    }

                    // Category validation
                    if (!Array.isArray(r.categories) || r.categories.length === 0) {
                        logError(ctx, `Resource "${r.title}" must have at least one category.`);
                    } else {
                        r.categories.forEach(catId => {
                            if (!validCategoryIds.has(catId)) {
                                logError(ctx, `Resource "${r.title}" references non-existent category: "${catId}"`);
                            }
                        });
                    }

                    // Link validation
                    if (Array.isArray(r.links)) {
                        r.links.forEach((link, lIdx) => {
                            if (!link.url) logError(ctx, `Link index ${lIdx} for "${r.title}" is missing a URL.`);
                            if (!link.type) logError(ctx, `Link index ${lIdx} for "${r.title}" is missing a type.`);
                        });
                    } else {
                        logError(ctx, `Resource "${r.title}" is missing a "links" array.`);
                    }

                    // Status validation
                    const validStatus = ['active', 'broken', 'scam', 'deprecated'];
                    if (r.status && !validStatus.includes(r.status)) {
                        logError(ctx, `Invalid status "${r.status}" for resource "${r.title}".`);
                    }
                });
            });
        }

        if (hasErrors) {
            console.error('\n❌ DATA VALIDATION FAILED:');
            errors.forEach(err => console.error(`   ${err}`));
            process.exit(1);
        } else {
            console.log('\n✅ Data integrity checks passed!');
            process.exit(0);
        }

    } catch (error) {
        console.error('❌ Validation script failed:', error.message);
        process.exit(1);
    }
}

validate();
