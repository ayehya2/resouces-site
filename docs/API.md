# API Documentation

Complete API reference for the Resources Wiki Site.

## Base URL

```
Production: https://resources-wiki.com/api
Development: http://localhost:3000/api
```

## Authentication

Most endpoints are public and don't require authentication. Rate limiting applies:

- **Anonymous:** 100 requests/hour
- **Authenticated:** 1000 requests/hour

## Endpoints

### Resources

#### GET /api/resources

Retrieve all resources with optional filtering.

**Query Parameters:**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `category` | string | Filter by category ID | `cybersecurity` |
| `tags` | string | Comma-separated tag IDs | `opensource,free` |
| `verified` | boolean | Only verified resources | `true` |
| `featured` | boolean | Only featured resources | `true` |
| `search` | string | Search query | `ad blocker` |
| `status` | string | Filter by status | `active` |
| `limit` | number | Results per page | `50` |
| `offset` | number | Pagination offset | `0` |

**Example Request:**

```bash
GET /api/resources?category=cybersecurity&tags=opensource&verified=true
```

**Example Response:**

```json
{
  "success": true,
  "data": {
    "resources": [...],
    "total": 342,
    "limit": 50,
    "offset": 0
  },
  "metadata": {
    "timestamp": "2026-01-03T00:00:00Z",
    "version": "1.0.0"
  }
}
```

#### GET /api/resources/:id

Get a specific resource by ID.

**Example Request:**

```bash
GET /api/resources/ublock-origin
```

**Example Response:**

```json
{
  "success": true,
  "data": {
    "id": "ublock-origin",
    "title": "uBlock Origin",
    ...
  }
}
```

### Categories

#### GET /api/categories

Get all categories.

**Example Response:**

```json
{
  "success": true,
  "data": {
    "categories": [...],
    "total": 26
  }
}
```

#### GET /api/categories/:id

Get a specific category with its resources.

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `includeResources` | boolean | Include full resource data |
| `limit` | number | Max resources to return |

### Tags

#### GET /api/tags

Get all available tags.

**Example Response:**

```json
{
  "success": true,
  "data": {
    "tags": [
      {
        "id": "opensource",
        "name": "Open Source",
        "usageCount": 1243
      }
    ]
  }
}
```

### Search

#### GET /api/search

Advanced search with multiple filters.

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `q` | string | Search query (required) |
| `categories` | string | Comma-separated categories |
| `tags` | string | Comma-separated tags |
| `fuzzy` | boolean | Enable fuzzy matching |
| `threshold` | number | Fuzzy match threshold (0-1) |

**Example Request:**

```bash
GET /api/search?q=privacy+tools&categories=cybersecurity&fuzzy=true
```

### Community Features

#### POST /api/vote

Submit a vote for a resource.

**Request Body:**

```json
{
  "resourceId": "ublock-origin",
  "voteType": "upvote" | "downvote",
  "sessionId": "unique-session-id"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "upvotes": 2848,
    "downvotes": 12
  }
}
```

#### POST /api/status

Report a resource's functional status.

**Request Body:**

```json
{
  "resourceId": "ublock-origin",
  "status": "working" | "broken",
  "sessionId": "unique-session-id"
}
```

#### POST /api/report

Report an issue with a resource.

**Request Body:**

```json
{
  "resourceId": "suspicious-tool",
  "reportType": "scam" | "broken" | "outdated" | "spam" | "incorrect",
  "reason": "Detailed explanation",
  "sessionId": "unique-session-id"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "reportId": "rpt_abc123",
    "status": "submitted"
  }
}
```

### Statistics

#### GET /api/stats

Get site-wide statistics.

**Example Response:**

```json
{
  "success": true,
  "data": {
    "totalResources": 1247,
    "verifiedResources": 892,
    "categories": 26,
    "tags": 157,
    "lastUpdate": "2026-01-03T00:00:00Z"
  }
}
```

### Changelog

#### GET /api/changelog

Get recent changes to the resource database.

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `limit` | number | Number of entries |
| `since` | string | ISO date to filter from |

**Example Response:**

```json
{
  "success": true,
  "data": {
    "entries": [
      {
        "date": "2026-01-03",
        "type": "added",
        "resourceId": "new-tool",
        "resourceTitle": "New Tool"
      }
    ]
  }
}
```

### Export

#### GET /api/export

Export resources in various formats.

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `format` | string | `json`, `csv`, `markdown` |
| `category` | string | Filter by category |
| `tags` | string | Filter by tags |

**Example:**

```bash
GET /api/export?format=markdown&category=cybersecurity
```

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested resource was not found",
    "details": {}
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `RESOURCE_NOT_FOUND` | 404 | Resource doesn't exist |
| `INVALID_REQUEST` | 400 | Malformed request |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `VALIDATION_ERROR` | 422 | Invalid data |
| `INTERNAL_ERROR` | 500 | Server error |

## Rate Limiting

Headers included in responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1609459200
```

## Versioning

API version is included in all responses:

```json
{
  "metadata": {
    "version": "1.0.0"
  }
}
```

## WebSocket API (Future)

Real-time updates for resource changes:

```javascript
const ws = new WebSocket('wss://resources-wiki.com/ws');

ws.on('message', (data) => {
  // Handle real-time updates
});
```

## SDK Libraries

Official SDKs coming soon for:
- JavaScript/TypeScript
- Python
- Go
- Rust

---

**Last Updated:** January 3, 2026  
**API Version:** 1.0.0
