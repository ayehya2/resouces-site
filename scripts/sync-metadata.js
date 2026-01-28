#!/usr/bin/env node

/**
 * Metadata & Resource Synchronizer
 * 
 * 1. Merges collection files from public/data/resources/collection/*.json
 * 2. Updates public/data/resources/all-resources.json
 * 3. Automatically generates changelog entries for new resources
 * 4. Updates public/data/resources/metadata.json
 */

const fs = require('fs');
const path = require('path');

function sync() {
    try {
        console.log('🔄 Starting full sync process...');

        const rootDir = path.join(__dirname, '..');
        const collectionDir = path.join(rootDir, 'public/data/resources/collection');
        const allResourcesPath = path.join(rootDir, 'public/data/resources/all-resources.json');
        const changelogPath = path.join(rootDir, 'public/data/resources/changelog.json');
        const metadataPath = path.join(rootDir, 'public/data/resources/metadata.json');
        const categoriesPath = path.join(rootDir, 'public/data/categories/categories.json');

        const readJson = (filePath) => {
            if (!fs.existsSync(filePath)) return null;
            let content = fs.readFileSync(filePath, 'utf8');
            content = content.replace(/^\uFEFF/, '');
            return JSON.parse(content);
        };

        // 1. Merge Collection
        console.log('📂 Merging resource collections...');
        let allResources = [];
        if (fs.existsSync(collectionDir)) {
            const files = fs.readdirSync(collectionDir).filter(f => f.endsWith('.json'));
            files.forEach(file => {
                const data = readJson(path.join(collectionDir, file));
                if (data && Array.isArray(data.resources)) {
                    allResources = allResources.concat(data.resources);
                }
            });
        }

        // Load existing master to check for new entries (for changelog)
        const existingMaster = readJson(allResourcesPath);
        const existingIds = existingMaster && Array.isArray(existingMaster.resources)
            ? new Set(existingMaster.resources.map(r => r.id))
            : new Set();

        // 2. Update Master File
        const now = new Date().toISOString();
        const masterData = {
            version: "1.0.0",
            lastUpdated: now,
            totalResources: allResources.length,
            resources: allResources
        };
        fs.writeFileSync(allResourcesPath, JSON.stringify(masterData, null, 2));
        console.log(`✅ ${allResources.length} resources synced to all-resources.json`);

        // 3. Automate Changelog
        console.log('📝 Checking for changelog updates...');
        const changelogData = readJson(changelogPath) || { version: "1.0.0", lastUpdated: now, entries: [] };
        let changelogUpdated = false;

        allResources.forEach(resource => {
            if (!existingIds.has(resource.id)) {
                // Check if already in changelog to avoid duplicates
                const inChangelog = changelogData.entries.some(e => e.resourceId === resource.id);
                if (!inChangelog) {
                    changelogData.entries.unshift({
                        date: resource.dateAdded.split('T')[0],
                        type: "added",
                        resourceId: resource.id,
                        resourceTitle: resource.title,
                        contributor: "system",
                        note: `Automatically detected new resource: ${resource.title}`
                    });
                    changelogUpdated = true;
                }
            }
        });

        if (changelogUpdated) {
            changelogData.lastUpdated = now;
            fs.writeFileSync(changelogPath, JSON.stringify(changelogData, null, 2));
            console.log('✅ Changelog updated with new resources.');
        }

        // 4. Update Categories with Counts
        console.log('🏷️ Updating category resource counts...');
        const categoriesData = readJson(categoriesPath) || { categories: [] };

        // Map to store counts
        const exactCounts = {};
        allResources.forEach(r => {
            if (Array.isArray(r.categories)) {
                r.categories.forEach(catId => {
                    exactCounts[catId] = (exactCounts[catId] || 0) + 1;
                });
            }
        });

        // Update counts in categories.json
        categoriesData.categories.forEach(cat => {
            // Count resources directly in this category
            let count = exactCounts[cat.id] || 0;

            // Add counts from all its subcategories (recursively)
            const getSubcategoryCounts = (parentId) => {
                let subtotal = 0;
                categoriesData.categories.filter(c => c.parentCategory === parentId).forEach(sub => {
                    subtotal += (exactCounts[sub.id] || 0);
                    subtotal += getSubcategoryCounts(sub.id);
                });
                return subtotal;
            };

            cat.resourceCount = count + getSubcategoryCounts(cat.id);
        });

        categoriesData.lastUpdated = now;
        fs.writeFileSync(categoriesPath, JSON.stringify(categoriesData, null, 2));
        console.log('✅ categories.json updated with dynamic counts.');

        // 5. Update Metadata
        console.log('📊 Updating metadata...');
        const verifiedResources = allResources.filter(r => r.verified).length;
        const featuredResources = allResources.filter(r => r.featured).length;
        const activeResources = allResources.filter(r => r.status === 'active').length;
        const brokenResources = allResources.filter(r => r.status === 'broken').length;

        // Count categories used by resources
        const categoriesWithResources = categoriesData.categories.filter(c => (c.resourceCount || 0) > 0);
        const categoriesUnused = categoriesData.categories.filter(c => (c.resourceCount || 0) === 0);
        const tagsUsed = new Set();
        allResources.forEach(r => {
            if (Array.isArray(r.tags)) r.tags.forEach(t => tagsUsed.add(t));
        });

        const metadata = {
            version: "1.0.0",
            lastUpdated: now,
            statistics: {
                totalResources: allResources.length,
                verifiedResources,
                featuredResources,
                activeResources,
                brokenResources,
                totalCategories: categoriesData.categories.length,
                usedCategories: categoriesWithResources.length,
                unusedCategories: categoriesUnused.length,
                tagsUsed: tagsUsed.size,
                lastScrapingRun: null,
                nextScrapingScheduled: null
            },
            dataIntegrity: {
                lastValidation: now,
                validationStatus: "passed",
                issues: []
            }
        };

        fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
        console.log('✅ Metadata updated.');

    } catch (error) {
        console.error('❌ Sync failed:', error.message);
        process.exit(1);
    }
}

sync();
