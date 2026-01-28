#!/usr/bin/env node

/**
 * Duplicate Resource Detector
 * 
 * Checks for duplicate resources based on:
 * 1. Exact ID match
 * 2. Similar titles (fuzzy match)
 * 3. Duplicate URLs
 * 
 * Usage: node scripts/detect-duplicates.js
 */

const fs = require('fs');
const path = require('path');

// Simple string similarity function (Levenshtein distance)
function similarity(s1, s2) {
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;

    if (longer.length === 0) return 1.0;

    const editDistance = levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
}

function levenshteinDistance(s1, s2) {
    const costs = [];
    for (let i = 0; i <= s1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= s2.length; j++) {
            if (i === 0) {
                costs[j] = j;
            } else if (j > 0) {
                let newValue = costs[j - 1];
                if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
                    newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                }
                costs[j - 1] = lastValue;
                lastValue = newValue;
            }
        }
        if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}

// Load all resources from JSON file
function loadResources() {
    const resourcePath = path.join(__dirname, '../public/data/resources/all-resources.json');
    const data = fs.readFileSync(resourcePath, 'utf8');
    return JSON.parse(data).resources;
}

// Detect duplicates
function detectDuplicates(resources) {
    const duplicates = {
        exactIds: [],
        similarTitles: [],
        duplicateUrls: []
    };

    const ids = new Map();
    const urls = new Map();

    // Check for exact ID and URL duplicates
    resources.forEach((resource, index) => {
        // Check ID
        if (ids.has(resource.id)) {
            duplicates.exactIds.push({
                id: resource.id,
                indices: [ids.get(resource.id), index],
                resources: [resources[ids.get(resource.id)], resource]
            });
        } else {
            ids.set(resource.id, index);
        }

        // Check URLs
        resource.links.forEach(link => {
            if (urls.has(link.url)) {
                const existing = urls.get(link.url);
                if (existing.resourceId !== resource.id) {
                    duplicates.duplicateUrls.push({
                        url: link.url,
                        resources: [
                            { id: existing.resourceId, title: existing.title },
                            { id: resource.id, title: resource.title }
                        ]
                    });
                }
            } else {
                urls.set(link.url, { resourceId: resource.id, title: resource.title });
            }
        });
    });

    // Check for similar titles (fuzzy match)
    for (let i = 0; i < resources.length; i++) {
        for (let j = i + 1; j < resources.length; j++) {
            const sim = similarity(
                resources[i].title.toLowerCase(),
                resources[j].title.toLowerCase()
            );

            // If similarity > 85%, flag as potential duplicate
            if (sim > 0.85 && resources[i].id !== resources[j].id) {
                duplicates.similarTitles.push({
                    similarity: Math.round(sim * 100),
                    resources: [
                        { id: resources[i].id, title: resources[i].title },
                        { id: resources[j].id, title: resources[j].title }
                    ]
                });
            }
        }
    }

    return duplicates;
}

// Main
function main() {
    console.log('🔍 Detecting duplicate resources...\n');

    const resources = loadResources();
    console.log(`📦 Loaded ${resources.length} resources\n`);

    const duplicates = detectDuplicates(resources);

    // Report results
    let foundIssues = false;

    if (duplicates.exactIds.length > 0) {
        foundIssues = true;
        console.log('❌ EXACT ID DUPLICATES:');
        duplicates.exactIds.forEach(dup => {
            console.log(`   ID: ${dup.id}`);
            console.log(`   Resources: "${dup.resources[0].title}" and "${dup.resources[1].title}"\n`);
        });
    }

    if (duplicates.duplicateUrls.length > 0) {
        foundIssues = true;
        console.log('⚠️  DUPLICATE URLS:');
        duplicates.duplicateUrls.forEach(dup => {
            console.log(`   URL: ${dup.url}`);
            console.log(`   Used by: "${dup.resources[0].title}" and "${dup.resources[1].title}"\n`);
        });
    }

    if (duplicates.similarTitles.length > 0) {
        foundIssues = true;
        console.log('⚠️  SIMILAR TITLES (Possible Duplicates):');
        duplicates.similarTitles.forEach(dup => {
            console.log(`   Similarity: ${dup.similarity}%`);
            console.log(`   1: "${dup.resources[0].title}" (ID: ${dup.resources[0].id})`);
            console.log(`   2: "${dup.resources[1].title}" (ID: ${dup.resources[1].id})\n`);
        });
    }

    if (!foundIssues) {
        console.log('✅ No duplicates found!');
    } else {
        process.exit(1);
    }
}

main();
