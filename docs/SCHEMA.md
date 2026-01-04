# JSON Schema Documentation

Complete documentation for all JSON schemas used in the Resources Wiki Site.

## Overview

The site uses JSON files for data storage with strict schemas to ensure consistency and quality.

## Main Schemas

### Resource Schema

The core schema for all resource entries.

**File:** `data/schemas/resource-schema.json`

#### Required Fields

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `id` | string | Unique identifier | Kebab-case, lowercase |
| `title` | string | Display name | 1-100 characters |
| `shortDescription` | string | Brief description | 10-150 characters |
| `longDescription` | string | Detailed description | 50-2000 characters |
| `links` | array | Resource links | Min 1 link |
| `categories` | array | Category IDs | Min 1, unique |
| `tags` | array | Tag IDs | Unique items |
| `dateAdded` | string | Addition timestamp | ISO 8601 format |
| `status` | string | Current status | Enum value |

#### Optional Fields

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| `verified` | boolean | Manually verified | `false` |
| `featured` | boolean | Featured on homepage | `false` |
| `lastChecked` | string | Last link check | - |
| `community` | object | Community metrics | - |
| `metadata` | object | Additional info | - |

#### Link Object

```json
{
  "type": "website|github|documentation|download|api|demo|tutorial|video|article|other",
  "url": "https://example.com",
  "label": "Descriptive Label"
}
```

**Validation Rules:**
- URL must start with `http://` or `https://`
- Label max 50 characters
- Type must be from predefined enum

#### Categories

Valid category IDs:

```
artificial-intelligence, cybersecurity, hacking-tools, 
digital-forensics, privacy-anonymity, networking, 
web-development, databases, operating-systems, linux, 
programming-languages, algorithms-data-structures, apis, 
datasets, mathematics, certifications, github-repositories, 
software, useful-websites, youtube-channels, domains, 
nas-backup, monitoring, security, ethical-hacking, miscellaneous
```

#### Status Values

- `active` - Resource is working and maintained
- `deprecated` - No longer maintained but still functional
- `broken` - Links are broken or inaccessible
- `under-review` - Being evaluated for quality
- `archived` - Removed from active listings

#### Community Object

```json
{
  "upvotes": 0,
  "downvotes": 0,
  "workingCount": 0,
  "brokenCount": 0,
  "scamReports": 0
}
```

All values must be non-negative integers.

#### Metadata Object

```json
{
  "platform": ["web", "desktop", "mobile", "browser", "cli", "api", "cloud"],
  "license": "MIT",
  "pricing": "free|freemium|paid|open-source|subscription",
  "language": "English",
  "requiresSignup": false,
  "openSource": true,
  "selfHostable": false
}
```

### Category Schema

Defines category structure and relationships.

**File:** `data/schemas/category-schema.json`

#### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier |
| `name` | string | Yes | Display name |
| `description` | string | Yes | Category description |
| `icon` | string | No | Icon identifier |
| `color` | string | No | Hex color code |
| `parentCategory` | string/null | No | Parent category ID |
| `subcategories` | array | No | Child category IDs |
| `featured` | boolean | No | Homepage feature flag |
| `resourceCount` | integer | No | Number of resources |

#### Example

```json
{
  "id": "cybersecurity",
  "name": "Cybersecurity",
  "description": "Security tools and resources",
  "icon": "shield",
  "color": "#DC2626",
  "parentCategory": null,
  "subcategories": ["ethical-hacking", "digital-forensics"],
  "featured": true,
  "resourceCount": 342
}
```

### Tag Schema

Simple tag definitions.

#### Structure

```json
{
  "id": "opensource",
  "name": "Open Source",
  "description": "Open-source projects",
  "color": "#51CF66",
  "usageCount": 1243
}
```

## Data Files

### all-resources.json

Main database of all resources.

**Location:** `data/resources/all-resources.json`

```json
{
  "version": "1.0.0",
  "lastUpdated": "2026-01-03T00:00:00Z",
  "totalResources": 1247,
  "resources": [
    { /* Resource objects */ }
  ]
}
```

### categories.json

All category definitions.

**Location:** `data/categories/categories.json`

```json
{
  "version": "1.0.0",
  "lastUpdated": "2026-01-03T00:00:00Z",
  "categories": [
    { /* Category objects */ }
  ]
}
```

### tags.json

All tag definitions.

**Location:** `data/tags/tags.json`

```json
{
  "version": "1.0.0",
  "lastUpdated": "2026-01-03T00:00:00Z",
  "tags": [
    { /* Tag objects */ }
  ]
}
```

### changelog.json

History of all changes.

**Location:** `data/resources/changelog.json`

```json
{
  "version": "1.0.0",
  "lastUpdated": "2026-01-03T00:00:00Z",
  "entries": [
    {
      "date": "2026-01-03",
      "type": "added|updated|removed|status-change",
      "resourceId": "ublock-origin",
      "resourceTitle": "uBlock Origin",
      "contributor": "username",
      "note": "Optional note about the change"
    }
  ]
}
```

### metadata.json

Site-wide statistics and integrity checks.

**Location:** `data/resources/metadata.json`

```json
{
  "version": "1.0.0",
  "lastUpdated": "2026-01-03T00:00:00Z",
  "statistics": {
    "totalResources": 1247,
    "verifiedResources": 892,
    "featuredResources": 45,
    "activeResources": 1198,
    "brokenResources": 12,
    "categoriesUsed": 26,
    "tagsUsed": 157
  },
  "dataIntegrity": {
    "lastValidation": "2026-01-03T00:00:00Z",
    "validationStatus": "passed",
    "issues": []
  }
}
```

### votes.json

Community voting data.

**Location:** `data/community/votes.json`

```json
{
  "version": "1.0.0",
  "lastUpdated": "2026-01-03T00:00:00Z",
  "votes": []
}
```

### reports.json

Community reports and issue tracking.

**Location:** `data/community/reports.json`

```json
{
  "version": "1.0.0",
  "lastUpdated": "2026-01-03T00:00:00Z",
  "reports": [
    {
      "id": "rpt_abc123",
      "resourceId": "suspicious-tool",
      "reportType": "scam|broken|outdated|spam|incorrect",
      "reason": "Detailed explanation",
      "reportedAt": "2026-01-03T00:00:00Z",
      "status": "pending|reviewed|resolved|dismissed",
      "sessionId": "session_xyz789"
    }
  ],
  "thresholds": {
    "autoHideScamReports": 5,
    "autoHideBrokenReports": 10,
    "reviewRequired": 3
  }
}
```

## Validation

### Using JSON Schema Validator

```bash
# Validate all resources
npm run validate:data

# Validate specific file
npm run validate:file -- data/resources/all-resources.json
```

### Manual Validation

```javascript
const Ajv = require('ajv');
const ajv = new Ajv();

const schema = require('./data/schemas/resource-schema.json');
const resource = require('./data/resources/all-resources.json').resources[0];

const valid = ajv.validate(schema, resource);
if (!valid) {
  console.log(ajv.errors);
}
```

## Best Practices

### Resource IDs

- Use kebab-case: `my-awesome-tool`
- Keep short but descriptive
- Avoid special characters
- Must be unique across all resources

### Descriptions

**Short Description:**
- One clear sentence
- Focus on the primary purpose
- 10-150 characters
- No marketing fluff

**Long Description:**
- Detailed but concise
- Include key features
- Mention use cases
- 50-2000 characters
- Proper grammar and spelling

### Links

- Verify all URLs before submission
- Use HTTPS when available
- Include multiple link types when relevant
- Label clearly and consistently

### Categories & Tags

- Choose 1-3 most relevant categories
- Add 5-15 descriptive tags
- Use existing tags when possible
- Suggest new tags if truly needed

### Metadata

- Be accurate with pricing info
- Specify all applicable platforms
- Include license information
- Note signup requirements

## Schema Evolution

### Versioning

Schemas follow semantic versioning:
- **Major:** Breaking changes
- **Minor:** New optional fields
- **Patch:** Documentation updates

### Migration

When schema changes occur:
1. Update schema file
2. Run migration script
3. Validate all existing data
4. Update documentation
5. Notify contributors

---

**Last Updated:** January 3, 2026  
**Schema Version:** 1.0.0
