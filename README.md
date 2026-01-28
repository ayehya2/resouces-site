# Resources <span style="font-family: serif; font-style: italic; font-weight: 900; color: #10b981;">Wiki</span>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/Tailwind-Design-06B6D4?style=for-the-badge&logo=tailwind-css" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Status-Premium_Build-10b981?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/Curation-Manual-orange?style=for-the-badge" alt="Curation" />
</p>

A high-performance, community-curated directory for technical resources, tools, and cybersecurity utilities. Built with a focus on **minimalist aesthetics**, **data density**, and **lightning-fast discovery**.

---

## ✨ Design Philosophy

This project follows a "Technical Wiki" aesthetic, blending the information density of classic documentation with modern, premium dark-theme elements.

- **High-Density UI**: Every pixel is optimized to display maximum information without clutter.
- **Micro-Interactions**: Subtle borders, hover transitions, and monospaced typography create a professional-grade feel.
- **Search-First Workflow**: Typography-optimized search results and fuzzy matching ensure you find what you need in seconds.

## 🏗️ Technical Architecture

### Core Stack
- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router & Server Components)
- **Styling**: Vanilla [Tailwind CSS](https://tailwindcss.com/) with a curated Dark Theme
- **State**: [Zustand](https://github.com/pmndrs/zustand) for reactive, performant UI state
- **Search Engine**: [Fuse.js](https://fusejs.io/) for typotolerant, client-side fuzzy search
- **Icons**: [Lucide React](https://lucide.dev/) for crisp, scalable vector graphics

### Data Orchestration
The site uses a "JSON-as-Database" approach, ensuring the entire directory is version-controlled and fully auditable via GitHub.

- **Automated Syncing**: A custom Node.js orchestration script (`sync-metadata.js`) merges collection batches, updates the global `all-resources.json`, and generates site-wide stats.
- **Schema Validation**: Strict JSON schemas ensure every contribution meets our metadata standards before being merged.

## 📁 Repository Structure

```text
├── public/data/                  # The "Data Layer"
│   ├── resources/collection/     # Batch JSON files (1-100, 101-200, etc.)
│   ├── categories/               # Domain & Category definitions
│   └── metadata.json             # Auto-generated site-wide statistics
├── src/                          # The "Logic Layer"
│   ├── app/                      # Next.js Page & API routes
│   ├── components/               # High-density React components
│   └── lib/                      # Search, Filter, and Data utilities
└── scripts/                      # The "Automation Layer"
    └── sync-metadata.js          # Metadata & Changelog coordinator
```

## 🚀 Development Workflow

### 1. Installation
```bash
# Clone the wiki
git clone https://github.com/ayehya2/resouces-site.git
cd resouces-site

# Install and launch
npm install
npm run dev
```

### 2. Data Synchronization
After adding new resources to the `collection` folder, run the sync script to update the site-wide metadata:
```bash
node scripts/sync-metadata.js
```

## 🤝 Contribution Elite

We value quality over quantity. To contribute a resource:

1. **Add Entry**: Add your resource to the latest batch in `public/data/resources/collection/`.
2. **Follow Schema**: Ensure all metadata (tags, links, pricing) matches our standard.
3. **Sync & Push**: Run the sync script and open a Pull Request.

## 📈 Evolution Roadmap

- [x] **Phase 1**: Premium Dark Theme & High-Density UI
- [x] **Phase 2**: Automated Metadata Orchestration (Hierarchical Sync)
- [x] **Phase 3**: Typotolerant Fuzzy Search (Fuse.js)
- [x] **Phase 4**: Advanced 'On This Page' Dynamic Navigation
- [x] **Phase 5**: Local State Voting & Engagement Metrics
- [ ] **Phase 6**: Incremental Static Regeneration (ISR) for data loading

---

<p align="center">
  Built with precision by the <a href="https://github.com/ayehya2/resouces-site">Resources Wiki Community</a>.
</p>

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
Submit a vote for a resource (Client-side localized persistence)

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

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/ayehya2/resouces-site/issues)
- **Discussions:** [GitHub Discussions](https://github.com/ayehya2/resouces-site/discussions)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- Community contributors
- Open-source tool maintainers
- Vercel & GitHub for infrastructure

---

**Last Updated:** January 28, 2026  
**Version:** 1.1.0  
**Status:** Feature Complete (Automation Driven)
