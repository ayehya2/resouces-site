# Deployment to Vercel

## Quick Deploy

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial Resources Wiki Site"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository: `ayehya2/resouces-site`
   - Vercel will auto-detect Next.js

3. **Configure Build Settings:**
   - Framework Preset: **Next.js**
   - Root Directory: **website**
   - Build Command: `npm run build`
   - Output Directory: `.next` (auto-detected)
   - Install Command: `npm install`

4. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site will be live!

## Vercel Configuration

The `vercel.json` file in the root is already configured for the monorepo structure.

## Environment Variables (if needed later)

Go to Project Settings → Environment Variables:
- None required for basic static site
- Add API keys later when implementing voting/reporting

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. SSL certificate is automatic

## Continuous Deployment

Every push to `main` branch will auto-deploy:
- Push code → GitHub
- Vercel detects changes
- Builds and deploys automatically
- Preview deployments for pull requests

## Your Site Will Be At:

`https://your-project-name.vercel.app`

---

## ✅ Ready for Deployment!

All core features are working:
- Clean, square, professional design
- Dark mode by default
- Search and filtering
- Category browsing
- Resource display with all metadata
- Responsive mobile design

Just push to GitHub and connect to Vercel!
