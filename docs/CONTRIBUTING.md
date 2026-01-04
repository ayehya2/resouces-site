# Contributing to Resources Wiki Site

Thank you for your interest in contributing to the Resources Wiki Site! This document provides guidelines and instructions for contributing.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [How to Contribute](#how-to-contribute)
3. [Resource Submission Guidelines](#resource-submission-guidelines)
4. [Development Setup](#development-setup)
5. [Pull Request Process](#pull-request-process)
6. [Style Guide](#style-guide)

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help maintain a professional environment
- No spam, self-promotion without value, or malicious content

## How to Contribute

### Submitting New Resources

1. Check if the resource already exists in the directory
2. Use the [Resource Submission Template](.github/ISSUE_TEMPLATE/resource_submission.md)
3. Verify all links are working
4. Ensure the resource provides genuine value
5. Follow the JSON schema format

### Reporting Issues

- **Broken Links:** Use the "Report Broken" button on the resource page
- **Scam/Spam:** Click "Report as Scam" with justification
- **Bugs:** Create an issue using the Bug Report template
- **Feature Requests:** Open a discussion in GitHub Discussions

## Resource Submission Guidelines

### Quality Standards

Resources must meet these criteria:

- **Legitimate:** Not a scam, phishing site, or malware
- **Functional:** All links must be working and accessible
- **Valuable:** Provides genuine utility to the community
- **Well-Described:** Clear, accurate descriptions
- **Appropriate:** Fits within defined categories

### Required Information

```json
{
  "title": "Clear, concise name",
  "shortDescription": "One-liner (10-150 chars)",
  "longDescription": "Detailed explanation (50-2000 chars)",
  "links": [
    {
      "type": "website|github|documentation|etc",
      "url": "https://valid-url.com",
      "label": "Descriptive label"
    }
  ],
  "categories": ["at-least-one-category"],
  "tags": ["relevant", "tags"],
  "metadata": {
    "platform": ["web", "desktop", "mobile"],
    "license": "MIT",
    "pricing": "free",
    "requiresSignup": false
  }
}
```

### Categories Guidelines

- Choose the most relevant 1-3 categories
- Don't over-categorize (max 5 categories)
- Use existing categories when possible
- Suggest new categories if truly needed

### Tags Guidelines

- Use lowercase kebab-case
- Include relevant technology tags
- Add feature tags (e.g., "no-signup", "self-hosted")
- Include pricing tags ("free", "opensource", "freemium")

## Development Setup

### Prerequisites

- Node.js 20+
- Python 3.11+
- Git
- Code editor (VS Code recommended)

### Local Development

```bash
# Clone repository
git clone https://github.com/yourusername/resources-site.git
cd resources-site

# Install website dependencies
cd website
npm install

# Run development server
npm run dev

# Install scraper dependencies
cd ../scraper
pip install -r requirements.txt
```

### Environment Variables

Create a `.env.local` file:

```env
OPENAI_API_KEY=your_key_here
DATABASE_URL=postgresql://localhost:5432/resources
GITHUB_TOKEN=your_token_here
```

## Pull Request Process

### Before Submitting

1. **Fork** the repository
2. **Create a branch:** `git checkout -b feature/resource-name`
3. **Make changes** following style guide
4. **Test locally** to ensure everything works
5. **Validate JSON:** `npm run validate:data`
6. **Commit:** Use clear, descriptive commit messages

### PR Guidelines

- **Title:** Clear and descriptive
- **Description:** Explain what and why
- **Link Issues:** Reference related issues
- **Screenshots:** Include if UI changes
- **Tests:** Ensure all tests pass

### Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `chore`: Build process or auxiliary tool changes

**Example:**
```
feat: Add uBlock Origin to privacy category

- Added comprehensive description
- Included all relevant links
- Tagged appropriately
- Verified links are working

Closes #123
```

## Style Guide

### JSON Formatting

- Use 2-space indentation
- Follow the schema exactly
- Validate before submitting
- Keep arrays sorted alphabetically where sensible

### Code Style

**JavaScript/TypeScript:**
- Use Prettier for formatting
- Follow ESLint rules
- Use TypeScript for type safety
- Write meaningful variable names

**Python:**
- Follow PEP 8
- Use type hints
- Write docstrings for functions
- Keep functions focused and small

### Documentation

- Use clear, concise language
- Include code examples
- Keep README updated
- Document all API endpoints

## Review Process

1. **Automated Checks:** CI/CD validates JSON, runs tests
2. **Community Review:** Other contributors review for quality
3. **Maintainer Approval:** Final review by project maintainers
4. **Merge:** Changes are merged and deployed automatically

## Recognition

Contributors will be:
- Listed in the changelog
- Credited in resource submissions
- Acknowledged in project documentation
- Invited to join the core team (for significant contributions)

## Getting Help

- **Questions:** Open a GitHub Discussion
- **Issues:** Create an issue with details
- **Contact:** Email resources@example.com

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Resources Wiki Site! 🎉
