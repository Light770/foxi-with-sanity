# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a dual-project repository containing:

1. **foxi-astro-theme/** - Main Astro website built with TailwindCSS
2. **studio-foxi-sanity/** - Sanity CMS studio for content management  
3. **archive/** - Archived blog components

The primary development happens in `foxi-astro-theme/` which is a production-ready Astro theme with modular, reusable components.

## Development Commands

### Astro Theme (foxi-astro-theme/)
```bash
cd foxi-astro-theme
npm install
npm run dev          # Start dev server at localhost:4321
npm run build        # Build production site (includes astro check)
npm run preview      # Preview production build
npm run test-sanity  # Test Sanity connection
```

### Sanity Studio (studio-foxi-sanity/)
```bash
cd studio-foxi-sanity  
npm install
npm run dev          # Start Sanity studio
npm run build        # Build studio
npm run deploy       # Deploy studio to Sanity
npm run convert-data # Convert JSON to NDJSON format
npm run import-data  # Import starter data to Sanity
```

## Environment Variables

Create a `.env` file in `foxi-astro-theme/` with:
```
SANITY_PROJECT_ID=hg0e82hx
SANITY_DATASET=private-config
SANITY_TOKEN=your-token-here  # Required for private datasets
```

## Architecture Overview

### Component Structure
- **src/components/blocks/** - Large page sections (CTA, Hero, Features, etc.)
- **src/components/ui/** - Reusable UI components (Button, Card, Form, etc.)
- **src/layouts/** - Page layout templates
- **src/pages/** - File-based routing

### Configuration System
All theme configuration is centralized in `src/config/`:
- `config.ts` - Core site settings (SEO, mode, animations)
- `navigationBar.ts` - Navigation menu structure
- `footerNavigation.ts` - Footer links
- `analytics.ts` - Analytics tracking codes
- `socialLinks.ts` - Social media links

### Content Management
- **Blog posts**: Managed in Sanity CMS with rich text content
- **Dynamic data**: All content managed through Sanity Studio:
  - Features organized by category (Analytics, Productivity, Security, etc.)
  - FAQ entries with category grouping
  - Pricing plans with flexible pricing models
  - Changelog entries with optional images
  - Testimonials with ratings and avatars
  - Site configuration and navigation
- **Legacy fallback**: JSON files in `src/data/json-files/` serve as fallbacks
- **Content types**: Defined in `studio-foxi-sanity/schemaTypes/`

### Styling System
- **TailwindCSS** with custom theme in `tailwind.config.mjs`
- **Color palette**: Primary (pink/magenta) and neutral (slate) with full shade ranges
- **Typography**: Inter Variable (body) and Outfit Variable (headings)
- **Dark/Light mode**: Controlled via `mode-auto|light|dark` classes

### Key Features
- Modular block-based design for easy page composition
- JSON-driven content for non-technical updates
- Integrated analytics (GA, GTM, Search Console)
- SEO optimization with configurable metadata
- Responsive design with mobile-first approach

## Working with Components

When creating new components:
1. Follow the existing pattern in `src/components/ui/` for reusable elements
2. Use `src/components/blocks/` for larger page sections
3. Maintain TypeScript interfaces for props
4. Follow the established TailwindCSS class patterns

When editing content:
1. **Primary content management**: Use Sanity Studio at `studio-foxi-sanity/`
2. **Blog posts**: Create/edit through Sanity CMS with rich text editor
3. **Site content**: Update features, FAQs, pricing, testimonials via Sanity
4. **Fallback content**: JSON files in `src/data/json-files/` for development
5. **Site configuration**: Eventually move from `src/config/` to Sanity

## Sanity Integration Status

### ✅ Implemented
- Blog posts with Portable Text content
- Features with category organization
- FAQ entries with category filtering
- Pricing plans with flexible structure
- Changelog entries with images
- Testimonials with ratings and avatars
- Site configuration schema
- Hero sections for different pages
- CTA sections with theme variants
- Social proof with partner logos

### 🔄 Pages Updated
- `/` (Homepage) - Full Sanity integration with hero, CTA, testimonials
- `/blog/*` - Full Sanity integration
- `/features` - Using Sanity features by category
- `/faq` - Using Sanity FAQ data
- `/pricing` - Using Sanity pricing plans
- `/changelog` - Using Sanity changelog entries

### 🎯 Components Integrated
- **Hero/HomeCTA** - Dynamic hero content with customer count, avatars
- **CTA/BasicDark** - Call-to-action with notifications and badges
- **CTA/BasicLight** - Light theme CTA with ratings
- **SocialProof/Basic** - Partner logos and business count
- **All existing** - Features, FAQs, Pricing, Changelog, Blog components