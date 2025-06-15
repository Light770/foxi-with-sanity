# Service Slug Configuration

This document explains how the service slug configuration has been implemented in the project.

## Overview

The service slug configuration has been migrated from static hardcoded data to a dynamic Sanity CMS-based system. This allows for flexible content management while maintaining backward compatibility.

## Architecture

### 1. Enhanced Schema

The `featureCard` schema has been enhanced with the following fields:

- **slug**: URL-friendly identifier for services
- **longDescription**: Detailed description for service pages
- **features**: Array of service characteristics
- **advantages**: Array of service benefits
- **isService**: Boolean flag to identify cards that represent services

### 2. Sanity Functions

New functions have been added to `src/lib/sanity.ts`:

- `getAllServices()`: Fetches all feature cards marked as services
- `getServiceBySlug(slug)`: Fetches a specific service by its slug

### 3. Dynamic Route Generation

The `src/pages/services/[slug].astro` page now:

- Dynamically generates routes from Sanity data
- Falls back to static data if Sanity is unavailable
- Supports both Sanity services and fallback services

### 4. Type Safety

TypeScript types have been added in `src/lib/types.ts`:

- `Service`: Interface for Sanity-based services
- `FallbackService`: Interface for static fallback services
- `ServiceFeature` and `ServiceAdvantage`: Supporting interfaces

## Usage

### Adding New Services

1. **Via Sanity Studio**: Create a new Feature Card with `isService: true`
2. **Via Import Script**: Run the import script to add sample data

### Import Sample Data

```bash
cd sanity-for-foxi
node import-services-data.js
```

### Available Service Slugs

Current configured service slugs:
- `conseil-strategique-digital`
- `developpement-solutions`
- `transformation-digitale`
- `data-analytics` (fallback only)
- `cloud-infrastructure` (fallback only)
- `cybersecurite-conformite` (fallback only)

## File Structure

```
foxi-with-sanity/
├── src/
│   ├── lib/
│   │   ├── sanity.ts          # Enhanced with service functions
│   │   └── types.ts           # Service type definitions
│   └── pages/
│       └── services/
│           ├── [slug].astro   # Dynamic service pages
│           └── index.astro    # Services listing page
│
sanity-for-foxi/
├── schemaTypes/
│   └── featureCard.ts         # Enhanced schema with service fields
├── import-services-data.js    # Sample data import script
└── import-services.sh         # Import runner script
```

## Benefits

1. **Dynamic Content Management**: Services can be managed through Sanity Studio
2. **SEO-Friendly URLs**: Clean, descriptive slugs for better SEO
3. **Backward Compatibility**: Fallback to static data ensures reliability
4. **Type Safety**: Full TypeScript support for better development experience
5. **Flexible Structure**: Easy to extend with additional service fields

## Migration Notes

- The static service data has been moved to fallback functions
- All service pages now support both Sanity and fallback data
- The services index page prioritizes Sanity services over feature cards
- Image handling supports both Sanity assets and static imports

## Future Enhancements

- Add image upload support for service images
- Implement service categories and filtering
- Add related services functionality
- Support for service pricing and packages