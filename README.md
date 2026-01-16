# Resources Wiki Site

![Status: Work in Progress](https://img.shields.io/badge/Status-Work_in_Progress-orange)

A comprehensive, community-driven resource repository. This project is currently a work in progress as we transition to a mainly static, manually curated site.

## 🎯 Project Overview

This project is a professional-grade resources directory that relies on manual curation to maintain a high-quality collection of tools, links, and references across multiple technical domains.

## 🏗️ Architecture

### Technology Stack

**Frontend:**
- **Framework:** Next.js 14+ (React with App Router)
- **Styling:** Tailwind CSS with dark mode support
- **State Management:** React Context + Zustand
- **Search:** Fuse.js (client-side fuzzy search)
- **UI Components:** Radix UI (headless, accessible)

**Data Storage:**
- JSON files (version-controlled)
- Static Site Generation

**Infrastructure:**
- **Hosting:** Vercel / Netlify (static)
- **CI/CD:** GitHub Actions
- **Version Control:** Git / GitHub

## 📁 Folder Structure

```
resources-site/
├── .github/                      # GitHub configuration
├── data/                         # JSON data storage
│   ├── resources/                # Main resource files
│   ├── categories/               # Category definitions
│   ├── tags/                     # Tag system
│   └── schemas/                  # JSON schemas
│
├── website/                      # Frontend application
│   ├── src/
│   │   ├── app/                 # Next.js app directory
│   │   ├── components/          # React components
│   │   ├── lib/                 # Utilities
│   │   ├── hooks/               # Custom React hooks
│   │   ├── types/               # TypeScript types
│   │   └── styles/              # Global styles
│   └── public/                  # Static assets
│
├── docs/                         # Documentation
├── scripts/                      # Utility scripts
└── tests/                        # Testing
```

## 🎨 Core Features

### 1. Multi-Category Filtering System
- Resources can belong to multiple categories simultaneously
- No duplication in display
- Smart filtering with boolean operators (AND/OR)

### 2. Real-Time Search & Filtering
- Instant client-side search with Fuse.js
- Fuzzy matching for typo tolerance
- Filter by categories, tags, status, pricing

### 3. Minimalist UI
- Clean, distraction-free design
- Dark mode by default with light mode option

### 4. GitHub-Based Submissions
- "Submit Resource" button → GitHub PR
- Community review process
- Merge = instant addition to site

### 5. Link Status Monitoring
- Daily automated link checking
- Auto-flag suspicious redirects

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/resources-site.git
cd resources-site

# Install website dependencies
cd website
npm install

# Run development server
npm run dev
```

## 🤝 Contributing

### Submitting a Resource

1. Click "Submit Resource" button on the website
2. Fill out the GitHub PR template
3. Community reviews and approves
4. Once merged, resource appears on site within minutes

### Code Contributions

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for development guidelines.

## 📈 Roadmap

**Phase 1: Foundation**
- [ ] Basic website with static JSON
- [ ] Search and filter functionality
- [ ] GitHub submission workflow
- [ ] Initial resource seeding

**Phase 2: Community Features**
- [ ] Improved categorization
- [ ] Advanced filtering
- [ ] Mobile responsive improvements

## 📝 JSON Schema Examples

### Complete Resource Entry

```json
{
  "id": "ublock-origin",
  "title": "uBlock Origin",
  "shortDescription": "Efficient ad blocker for browsers",
  "longDescription": "uBlock Origin is a free, open-source ad content blocker. Unlike other blockers, it's easy on memory and CPU while being capable of loading and enforcing thousands of filters. Features include advanced blocking capabilities, extensive filter lists, and no acceptable ads program.",
  "links": [
    {
      "type": "website",
      "url": "https://ublockorigin.com",
      "label": "Official Website"
    },
    {
      "type": "github",
      "url": "https://github.com/gorhill/uBlock",
      "label": "GitHub Repository"
    },
    {
      "type": "documentation",
      "url": "https://github.com/gorhill/uBlock/wiki",
      "label": "Documentation"
    },
    {
      "type": "download",
      "url": "https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/",
      "label": "Firefox Add-on"
    }
  ],
  "categories": ["privacy", "software", "useful-websites"],
  "tags": ["adblock", "privacy", "opensource", "free", "browser-extension"],
  "verified": true,
  "featured": true,
  "dateAdded": "2026-01-03T00:00:00Z",
  "lastChecked": "2026-01-03T00:00:00Z",
  "status": "active",
  "community": {
    "upvotes": 2847,
    "downvotes": 12,
    "workingCount": 2651,
    "brokenCount": 5,
    "scamReports": 0
  },
  "metadata": {
    "platform": ["web", "browser"],
    "license": "GPLv3",
    "pricing": "free",
    "language": "Multiple",
    "requiresSignup": false,
    "openSource": true,
    "selfHostable": false
  }
}
```

### Category Definition

```json
{
  "id": "cybersecurity",
  "name": "Cybersecurity",
  "description": "Security tools, resources, and guides",
  "icon": "shield",
  "color": "#FF6B6B",
  "parentCategory": null,
  "subcategories": ["ethical-hacking", "digital-forensics", "hacking-tools"],
  "featured": true,
  "resourceCount": 342
}
```

### Tag Definition

```json
{
  "id": "opensource",
  "name": "Open Source",
  "description": "Open-source projects with public source code",
  "color": "#51CF66",
  "usageCount": 1243
}
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Validate JSON data
npm run validate:data
```

## 📚 API Documentation

### GET /api/resources
Retrieve all resources with optional filtering

**Query Parameters:**
- `category` - Filter by category
- `tags` - Filter by tags (comma-separated)
- `verified` - Only verified resources
- `search` - Search query

**Example:**
```bash
GET /api/resources?category=cybersecurity&tags=opensource&verified=true
```

### POST /api/vote
Submit a vote for a resource

**Body:**
```json
{
  "resourceId": "ublock-origin",
  "voteType": "upvote"
}
```

### POST /api/report
Report a resource issue

**Body:**
```json
{
  "resourceId": "suspicious-tool",
  "reportType": "scam",
  "reason": "Malware detected"
}
```

## 🎓 Learning Resources

For developers contributing to this project:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Fuse.js](https://fusejs.io/)
- [OpenAI API](https://platform.openai.com/docs)

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/yourusername/resources-site/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/resources-site/discussions)
- **Email:** resources@example.com

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- Community contributors
- Open-source tool maintainers
- AI providers (OpenAI, Anthropic)
- Hosting platforms (Vercel, GitHub)

---

**Last Updated:** January 3, 2026  
**Version:** 1.0.0  
**Status:** In Development
