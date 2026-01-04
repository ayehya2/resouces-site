# Deployment Guide

Complete guide for deploying the Resources Wiki Site to production.

## Deployment Options

### Option 1: Vercel (Recommended)

**Pros:**
- Automatic deployments from GitHub
- Built-in Next.js optimization
- Global CDN
- Serverless functions
- Free hobby tier

**Steps:**

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login:**
```bash
vercel login
```

3. **Deploy:**
```bash
cd website
vercel
```

4. **Configure Environment Variables:**
```bash
vercel env add OPENAI_API_KEY
vercel env add DATABASE_URL
vercel env add GITHUB_TOKEN
```

5. **Deploy to Production:**
```bash
vercel --prod
```

### Option 2: Netlify

**Pros:**
- Simple deployment process
- Good free tier
- Form handling
- Split testing

**Steps:**

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Login:**
```bash
netlify login
```

3. **Initialize:**
```bash
cd website
netlify init
```

4. **Deploy:**
```bash
netlify deploy --prod
```

### Option 3: GitHub Pages (Static Only)

**Pros:**
- Free
- Simple for static sites
- Good for documentation

**Limitations:**
- No serverless functions
- No dynamic backend

**Steps:**

1. **Build static site:**
```bash
cd website
npm run build
npm run export
```

2. **Configure GitHub Pages:**
- Go to repository Settings → Pages
- Select branch and `/docs` folder
- Save

### Option 4: Self-Hosted (Docker)

**Dockerfile:**

```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app
COPY website/package*.json ./
RUN npm ci

COPY website/ ./
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
```

**Deploy:**

```bash
# Build image
docker build -t resources-site .

# Run container
docker run -p 3000:3000 \
  -e OPENAI_API_KEY=$OPENAI_API_KEY \
  -e DATABASE_URL=$DATABASE_URL \
  resources-site
```

## Environment Variables

Required environment variables for production:

```env
# AI/LLM
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# Database (if using)
DATABASE_URL=postgresql://user:pass@host:5432/db

# GitHub
GITHUB_TOKEN=ghp_...
GITHUB_REPOSITORY=username/resources-site

# Monitoring
UPTIME_ROBOT_API_KEY=...
SENTRY_DSN=...

# Site
NEXT_PUBLIC_SITE_URL=https://resources-wiki.com
NEXT_PUBLIC_API_URL=https://resources-wiki.com/api

# Analytics (optional)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=resources-wiki.com
```

## CI/CD Setup

### GitHub Actions

Already configured in `.github/workflows/`:

1. **deploy.yml** - Deploys on push to main
2. **scraper-daily.yml** - Runs daily scraper
3. **link-checker.yml** - Checks links daily

**Required Secrets:**

Go to GitHub → Settings → Secrets and add:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `OPENAI_API_KEY`
- `GITHUB_TOKEN` (automatic)

### Automated Deployments

Every push to `main` branch triggers:
1. Build validation
2. Test execution
3. JSON validation
4. Deployment to production
5. Cache invalidation

## Database Setup

### PostgreSQL (Optional)

For community features (votes, reports):

```sql
-- Create database
CREATE DATABASE resources_wiki;

-- Create tables
CREATE TABLE votes (
  id SERIAL PRIMARY KEY,
  resource_id VARCHAR(255) NOT NULL,
  vote_type VARCHAR(10) NOT NULL,
  session_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(resource_id, session_id)
);

CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  resource_id VARCHAR(255) NOT NULL,
  report_type VARCHAR(50) NOT NULL,
  reason TEXT,
  session_id VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_votes_resource ON votes(resource_id);
CREATE INDEX idx_reports_resource ON reports(resource_id);
CREATE INDEX idx_reports_status ON reports(status);
```

### Database Providers

**Recommended:**
- **Supabase:** Free tier, PostgreSQL, easy setup
- **Neon:** Serverless PostgreSQL
- **PlanetScale:** MySQL alternative
- **Railway:** Simple PostgreSQL hosting

## Monitoring Setup

### Uptime Monitoring

Use Uptime Robot or Better Uptime:

1. Monitor main site URL
2. Monitor API endpoints
3. Set up alerts (email, Slack, Discord)
4. Check every 5 minutes

### Error Tracking

**Sentry Setup:**

```bash
npm install @sentry/nextjs
```

```javascript
// sentry.config.js
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

### Analytics

**Plausible Analytics (Privacy-Friendly):**

```html
<script defer data-domain="resources-wiki.com" 
        src="https://plausible.io/js/script.js"></script>
```

## Performance Optimization

### Next.js Configuration

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['github.com', 'avatars.githubusercontent.com'],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  reactStrictMode: true,
};
```

### CDN Setup

Use Vercel's global CDN or configure CloudFlare:

1. Point DNS to CloudFlare
2. Enable caching rules
3. Configure cache-control headers
4. Enable Brotli compression

### Caching Strategy

```javascript
// API Route
export const config = {
  runtime: 'edge',
  regions: ['iad1'],
};

export default async function handler(req) {
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
```

## Security

### Security Headers

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ];
  }
};
```

### SSL/TLS

- Use HTTPS everywhere
- Enable HSTS
- Configure proper certificate chain
- Auto-renew with Let's Encrypt

## Backup Strategy

### Data Backup

```bash
# Backup JSON files daily
#!/bin/bash
DATE=$(date +%Y-%m-%d)
tar -czf backups/resources-$DATE.tar.gz data/
aws s3 cp backups/resources-$DATE.tar.gz s3://bucket/backups/
```

### Database Backup

```bash
# PostgreSQL backup
pg_dump -h localhost -U user -d resources_wiki > backup.sql
```

### Version Control

All data is version-controlled in Git:
- Every change is tracked
- Easy rollback
- Complete history

## Scaling Considerations

### Horizontal Scaling

- Use serverless functions (auto-scale)
- CDN for static assets
- Database connection pooling
- Redis for caching

### Vertical Scaling

- Upgrade hosting plan
- Increase database resources
- More powerful server

### Load Balancing

For high traffic:
- Use CloudFlare Load Balancing
- Multiple region deployments
- Database read replicas

## Troubleshooting

### Common Issues

**Build Failures:**
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

**API Errors:**
- Check environment variables
- Verify API keys
- Check rate limits
- Review logs

**Database Connection:**
- Verify DATABASE_URL
- Check connection limits
- Test connection manually

### Logs

**Vercel:**
```bash
vercel logs
```

**Docker:**
```bash
docker logs resources-site
```

## Rollback Procedure

If deployment fails:

1. **Immediate:** Revert to previous version
```bash
vercel rollback
```

2. **Git:** Revert commit
```bash
git revert HEAD
git push
```

3. **Manual:** Restore from backup

## Post-Deployment Checklist

- [ ] Site is accessible
- [ ] All pages load correctly
- [ ] Search functionality works
- [ ] API endpoints respond
- [ ] Database connections active
- [ ] Environment variables set
- [ ] Monitoring active
- [ ] Analytics tracking
- [ ] SSL certificate valid
- [ ] DNS configured correctly
- [ ] Backups scheduled
- [ ] Error tracking enabled

---

**Last Updated:** January 3, 2026  
**Version:** 1.0.0
