# Contributing to Resources Hub

We're glad you're interested in contributing! This project is community-driven and depends on high-quality submissions and codebase improvements.

## 🆕 Submitting a Resource

1. **Check for Duplicates**: Ensure the resource isn't already listed.
2. **Follow the Schema**: New resources should be added to the latest JSON file in `public/data/resources/collection/`.
3. **Verify Links**: Ensure all URLs are functional and point to the official source.
4. **Sync Metadata**: Run the sync script to update global counts:
   ```bash
   node scripts/sync-metadata.js
   ```

## 🛠️ Code Contributions

1. **Clone the Repo**:
   ```bash
   git clone https://github.com/ayehya2/resouces-site.git
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run Dev Server**:
   ```bash
   npm run dev
   ```
4. **Build Check**: Before submitting a PR, ensure the project builds without errors:
   ```bash
   npm run build
   ```

## ✅ Quality Standards

- **Minimalist Aesthetics**: Keep UI changes clean and high-density.
- **Data Integrity**: Never submit placeholder or unverified data.
- **Performance**: Ensure animations are subtle and don't impact Core Web Vitals.

Thank you for helping us build the ultimate technical directory!
