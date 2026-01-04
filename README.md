# Resources Wiki Site

A comprehensive, community-driven resource repository with AI-powered discovery, intelligent categorization, and real-time search capabilities.

## 🎯 Project Overview

This project is a professional-grade resources directory that combines manual curation with automated AI-driven discovery to maintain a constantly growing, high-quality collection of tools, links, and references across multiple technical domains.

## 🏗️ Architecture

### Technology Stack

**Frontend:**
- **Framework:** Next.js 14+ (React with App Router)
- **Styling:** Tailwind CSS with dark mode support
- **State Management:** React Context + Zustand
- **Search:** Fuse.js (client-side fuzzy search)
- **UI Components:** Radix UI (headless, accessible)

**Backend/API:**
- **Runtime:** Node.js 20+
- **API Framework:** Next.js API Routes / Serverless Functions
- **Data Storage:** JSON files (version-controlled)
- **Database:** PostgreSQL (for community features - votes, reports)
- **Cache:** Redis (optional, for performance)

**AI & Automation:**
- **LLM Integration:** OpenAI GPT-4 / Anthropic Claude
- **Web Scraping:** Puppeteer / Playwright
- **Data Processing:** Python 3.11+ (scraping pipeline)
- **Vector Database:** Pinecone / Weaviate (for LLM context)
- **Task Scheduler:** GitHub Actions / Cron jobs

**Infrastructure:**
- **Hosting:** Vercel / Netlify (static + serverless)
- **CI/CD:** GitHub Actions
- **Version Control:** Git / GitHub
- **Monitoring:** Uptime Robot / Better Uptime
- **Analytics:** Plausible / Umami (privacy-focused)

### Alternative Stack Options

**Lightweight Option:**
- Astro (static site generator)
- Vanilla JavaScript
- Pure CSS with CSS Variables
- GitHub Pages hosting

**Performance-First Option:**
- SvelteKit
- Svelte stores for state
- Tailwind CSS
- Cloudflare Pages

## 📁 Folder Structure

```
resources-site/
├── .github/                      # GitHub configuration
│   ├── workflows/                # CI/CD pipelines
│   │   ├── scraper-daily.yml
│   │   ├── link-checker.yml
│   │   └── deploy.yml
│   ├── ISSUE_TEMPLATE/           # Issue templates
│   └── PULL_REQUEST_TEMPLATE.md  # PR template for submissions
│
├── data/                         # JSON data storage
│   ├── resources/                # Main resource files
│   │   ├── all-resources.json
│   │   ├── metadata.json
│   │   └── changelog.json
│   ├── categories/               # Category definitions
│   │   └── categories.json
│   ├── tags/                     # Tag system
│   │   └── tags.json
│   ├── community/                # Community data
│   │   ├── votes.json
│   │   └── reports.json
│   └── schemas/                  # JSON schemas
│       ├── resource-schema.json
│       └── category-schema.json
│
├── scraper/                      # AI scraping pipeline
│   ├── src/
│   │   ├── scrapers/            # Individual scrapers
│   │   ├── ai/                  # AI processing
│   │   ├── validators/          # Quality checks
│   │   └── utils/               # Helper functions
│   ├── config/                   # Scraper configuration
│   ├── logs/                     # Scraping logs
│   └── requirements.txt          # Python dependencies
│
├── website/                      # Frontend application
│   ├── src/
│   │   ├── app/                 # Next.js app directory
│   │   │   ├── api/             # API routes
│   │   │   ├── resources/       # Resource pages
│   │   │   └── layout.tsx
│   │   ├── components/          # React components
│   │   │   ├── search/          # Search components
│   │   │   ├── filters/         # Filter system
│   │   │   ├── cards/           # Resource cards
│   │   │   └── ui/              # UI primitives
│   │   ├── lib/                 # Utilities
│   │   │   ├── search.ts
│   │   │   ├── filters.ts
│   │   │   └── api-client.ts
│   │   ├── hooks/               # Custom React hooks
│   │   ├── types/               # TypeScript types
│   │   └── styles/              # Global styles
│   ├── public/                  # Static assets
│   └── package.json
│
├── llm/                          # LLM chatbot
│   ├── training-data/           # Fine-tuning data
│   ├── embeddings/              # Vector embeddings
│   ├── prompts/                 # System prompts
│   └── config/                  # LLM configuration
│
├── docs/                         # Documentation
│   ├── CONTRIBUTING.md
│   ├── API.md
│   ├── SCHEMA.md
│   └── DEPLOYMENT.md
│
├── scripts/                      # Utility scripts
│   ├── validate-json.js
│   ├── generate-embeddings.py
│   └── export-markdown.js
│
└── tests/                        # Testing
    ├── unit/
    ├── integration/
    └── e2e/
```

## 📊 Data Structure

### Resource JSON Schema

```json
{
  "id": "unique-identifier",
  "title": "Resource Name",
  "shortDescription": "Brief one-liner description",
  "longDescription": "Detailed explanation with technical details",
  "links": [
    {
      "type": "website",
      "url": "https://example.com",
      "label": "Official Website"
    },
    {
      "type": "github",
      "url": "https://github.com/example/repo",
      "label": "GitHub Repository"
    },
    {
      "type": "documentation",
      "url": "https://docs.example.com",
      "label": "Documentation"
    }
  ],
  "categories": ["cybersecurity", "privacy", "tools"],
  "tags": ["adblock", "privacy", "opensource", "free"],
  "verified": true,
  "featured": false,
  "dateAdded": "2026-01-03T00:00:00Z",
  "lastChecked": "2026-01-03T00:00:00Z",
  "status": "active",
  "community": {
    "upvotes": 145,
    "downvotes": 3,
    "workingCount": 132,
    "brokenCount": 2,
    "scamReports": 0
  },
  "metadata": {
    "platform": ["web", "desktop", "mobile"],
    "license": "MIT",
    "pricing": "free",
    "language": "English",
    "requiresSignup": false
  }
}
```

## 🎨 Core Features

### 1. Multi-Category Filtering System
- Resources can belong to multiple categories simultaneously
- No duplication in display
- Smart filtering with boolean operators (AND/OR)
- Category intersection views

### 2. Real-Time Search & Filtering
- Instant client-side search with Fuse.js
- Fuzzy matching for typo tolerance
- Filter by categories, tags, status, pricing
- Keyboard shortcuts for power users

### 3. Community Trust System
- **Upvote/Downvote:** Basic quality signal
- **Working/Broken:** Functional status tracking
- **Scam Reporting:** Automated review triggers
- **Threshold-based hiding:** Auto-hide after X reports
- **Verification badges:** Manually vetted resources

### 4. Minimalist UI with Toggle
- Default: Short description + key info
- Expanded: Full details, multiple links, metadata
- Smooth transitions
- Clean, distraction-free design
- Dark mode by default with light mode option

### 5. AI-Powered Daily Discovery
```python
# Daily Scraping Pipeline
1. Scrape target sources (Reddit, HN, GitHub Trending, etc.)
2. Extract potential resources
3. AI evaluation (GPT-4) for quality and relevance
4. Deduplication check against existing data
5. Category & tag assignment (AI-assisted)
6. Human review queue for approval
7. Auto-merge approved resources
8. Update embeddings for LLM
```

### 6. GitHub-Based Submissions
- "Submit Resource" button → GitHub PR
- Pre-filled template with schema
- Automated validation checks
- Community review process
- Merge = instant addition to site

### 7. Custom LLM Assistant
- Trained on approved resources
- Can answer: "Show me free privacy tools"
- Explains technical concepts
- Recommends based on use case
- Updates daily with new resources

### 8. Link Status Monitoring
- Daily automated link checking
- Status updates in JSON
- Email alerts for broken links
- Auto-flag suspicious redirects

### 9. Changelog & New Badge
- Dedicated `/new` page for recent additions
- "New" badge for resources added within 7 days
- Full changelog with dates and contributors
- RSS feed for updates

### 10. Markdown Export
- One-click copy formatted markdown
- Batch export selected resources
- Custom formatting templates

## 📋 Categories

1. **Artificial Intelligence** - AI tools, models, frameworks
2. **Cybersecurity** - Security tools, resources, guides
3. **Hacking Tools** - Penetration testing, security assessment
4. **Digital Forensics** - Investigation tools, analysis software
5. **Privacy & Anonymity** - VPNs, proxies, privacy tools
6. **Networking** - Network tools, protocols, infrastructure
7. **Web Development** - Frameworks, libraries, tools
8. **Databases** - DBMS, query tools, administration
9. **Operating Systems** - OS resources, customization, guides
10. **Linux** - Distributions, configurations, tools
11. **Programming Languages** - Python, JavaScript, etc.
12. **Algorithms & Data Structures** - Learning resources, visualizers
13. **APIs** - Public APIs, documentation, tools
14. **Datasets** - Open datasets for research and ML
15. **Mathematics** - Math tools, calculators, learning resources
16. **Certifications** - Study materials, exam prep
17. **GitHub Repositories** - Notable repos, awesome lists
18. **Software** - Applications, utilities, productivity tools
19. **Useful Websites** - Handy online tools and services
20. **YouTube Channels** - Educational content creators
21. **Domains** - Domain tools, registrars, management
22. **NAS & Backup** - Storage solutions, backup tools
23. **Monitoring** - System monitoring, uptime tracking
24. **Security** - General security resources
25. **Ethical Hacking** - Learning resources, certifications
26. **Miscellaneous** - Cool finds that don't fit elsewhere

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- Python 3.11+ (for scraper)
- Git
- PostgreSQL (optional, for community features)

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/resources-site.git
cd resources-site

# Install website dependencies
cd website
npm install

# Install scraper dependencies
cd ../scraper
pip install -r requirements.txt

# Run development server
cd ../website
npm run dev
```

### Environment Variables

```env
# OpenAI API
OPENAI_API_KEY=your_key_here

# Database (optional)
DATABASE_URL=postgresql://user:pass@localhost:5432/resources

# GitHub (for automation)
GITHUB_TOKEN=your_token_here

# Monitoring
UPTIME_ROBOT_API_KEY=your_key_here
```

## 🤝 Contributing

### Submitting a Resource

1. Click "Submit Resource" button on the website
2. Fill out the GitHub PR template
3. Automated checks will validate your submission
4. Community reviews and approves
5. Once merged, resource appears on site within minutes

### Reporting Issues

- **Broken Link:** Click "Report Broken" on the resource
- **Scam/Spam:** Click "Report as Scam" (requires justification)
- **Incorrect Info:** Open GitHub issue with correction

### Code Contributions

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for development guidelines.

## 🔐 Security & Privacy

- No user tracking beyond aggregate analytics
- All community votes stored anonymously
- HTTPS everywhere
- No third-party ad networks
- Open-source for transparency
- Regular security audits

## 📈 Roadmap

**Phase 1: MVP (Months 1-2)**
- [ ] Basic website with static JSON
- [ ] Search and filter functionality
- [ ] GitHub submission workflow
- [ ] Initial resource seeding (500+ entries)

**Phase 2: Community Features (Months 3-4)**
- [ ] Voting system
- [ ] Scam reporting
- [ ] User accounts (optional)
- [ ] API access

**Phase 3: AI Integration (Months 5-6)**
- [ ] Daily scraping pipeline
- [ ] AI quality evaluation
- [ ] Custom LLM chatbot
- [ ] Automated categorization

**Phase 4: Advanced Features (Months 7+)**
- [ ] Browser extension
- [ ] Mobile apps
- [ ] Advanced analytics
- [ ] API marketplace integration
- [ ] Community-submitted scrapers

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
