import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Initialize Sanity client
const sanityClient = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID || 'hg0e82hx',
  dataset: import.meta.env.SANITY_DATASET || 'private-config',
  token: import.meta.env.SANITY_TOKEN, // Required for private datasets
  apiVersion: '2024-01-01', // Use current date
  useCdn: false, // Set to false for private datasets with tokens
})

export { sanityClient as getClient }

// Helper to generate image URLs
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

// Fetch all blog posts
export async function getAllBlogPosts() {
  const query = `*[_type == "blog"] | order(pubDate desc) {
    _id,
    title,
    slug,
    description,
    pubDate,
    author,
    "image": image.asset->url,
    tags
  }`

  const posts = await sanityClient.fetch(query)
  
  // Handle posts without images by providing a fallback
  return posts.map((post: any) => ({
    ...post,
    image: post.image || '/blog/post-01-cover.png' // Fallback to existing asset
  }))
}

// Fetch single blog post by slug
export async function getBlogPostBySlug(slug: string) {
  const query = `*[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    pubDate,
    author,
    image,
    tags,
    content
  }`

  const post = await sanityClient.fetch(query, { slug })
  
  if (!post) return null
  
  // Handle missing image
  return {
    ...post,
    image: post.image || { asset: { url: '/blog/post-01-cover.png' } }
  }
}

// Get all unique tags
export async function getAllTags() {
  const query = `*[_type == "blog"] { tags }[].tags[]`
  const tags = await sanityClient.fetch(query)
  return [...new Set(tags)]
}

// Get posts by tag
export async function getPostsByTag(tag: string) {
  console.log('Fetching posts for tag in Sanity:', tag)
  
  // Back to direct string interpolation for simplicity
  const query = `*[_type == "blog" && "${tag}" in tags] | order(pubDate desc) {
    _id,
    title,
    slug,
    description,
    pubDate,
    author,
    "image": image.asset->url,
    tags
  }`

  // Log the query for debugging
  console.log('Query:', query)
  
  return await sanityClient.fetch(query)
}

// Fetch all features
export async function getAllFeatures() {
  const query = `*[_type == "feature"] | order(category asc, order asc) {
    _id,
    title,
    icon,
    description,
    category,
    order
  }`
  
  return await sanityClient.fetch(query)
}

// Fetch features by category
export async function getFeaturesByCategory(category: string) {
  const query = `*[_type == "feature" && category == $category] | order(order asc) {
    _id,
    title,
    icon,
    description,
    category,
    order
  }`
  
  return await sanityClient.fetch(query, { category })
}

// Fetch all feature cards
export async function getAllFeatureCards() {
  const query = `*[_type == "featureCard"] | order(category asc, order asc) {
    _id,
    title,
    image,
    description,
    category,
    order
  }`
  
  return await sanityClient.fetch(query)
}

// Fetch feature cards by category
export async function getFeatureCardsByCategory(category: string) {
  const query = `*[_type == "featureCard" && category == $category] | order(order asc) {
    _id,
    title,
    image,
    description,
    category,
    order
  }`
  
  return await sanityClient.fetch(query, { category })
}

// Fetch all FAQs
export async function getAllFAQs() {
  const query = `*[_type == "faq"] | order(category asc, order asc) {
    _id,
    question,
    reply,
    category,
    open,
    order
  }`
  
  return await sanityClient.fetch(query)
}

// Fetch changelog entries
export async function getChangelogEntries() {
  const query = `*[_type == "changelog"] | order(date desc) {
    _id,
    title,
    date,
    text,
    "image": image.asset->url
  }`
  
  return await sanityClient.fetch(query)
}

// Fetch pricing plans
export async function getPricingPlans() {
  const query = `*[_type == "pricingPlan"] | order(order asc) {
    _id,
    title,
    subtitle,
    currency,
    price,
    priceLabel,
    priceMonthly,
    priceLabelMonthly,
    buttonName,
    buttonLink,
    listItems,
    isFeatured,
    order
  }`
  
  return await sanityClient.fetch(query)
}

// Fetch feature list configuration and features
export async function getFeatureListData(featureListId?: string) {
  if (!featureListId) {
    // Return default configuration if no specific featureList is provided
    const features = await getAllFeatures()
    return {
      title: 'Whats included on all foxi plans',
      description: 'Explore the suite of tools designed to streamline your workflow, enhance productivity, and drive growth. Each product is crafted with precision to meet your needs and exceed your expectations.',
      features: features.slice(0, 8),
      layout: '3',
      alignment: 'left'
    }
  }

  // Fetch specific featureList configuration
  const query = `*[_type == "featureList" && _id == $featureListId][0] {
    _id,
    title,
    description,
    featuresSelection,
    category,
    "selectedFeatures": selectedFeatures[]->{
      _id,
      title,
      icon,
      description,
      category,
      order
    },
    maxFeatures,
    layout,
    alignment
  }`

  const featureListConfig = await sanityClient.fetch(query, { featureListId })
  
  if (!featureListConfig) {
    // Fallback to default if featureList not found
    const features = await getAllFeatures()
    return {
      title: 'Whats included on all foxi plans',
      description: 'Explore the suite of tools designed to streamline your workflow, enhance productivity, and drive growth. Each product is crafted with precision to meet your needs and exceed your expectations.',
      features: features.slice(0, 8),
      layout: '3',
      alignment: 'left'
    }
  }

  let features = []

  switch (featureListConfig.featuresSelection) {
    case 'manual':
      features = featureListConfig.selectedFeatures || []
      break
    case 'category':
      if (featureListConfig.category) {
        features = await getFeaturesByCategory(featureListConfig.category)
      } else {
        features = await getAllFeatures()
      }
      break
    case 'all':
    default:
      features = await getAllFeatures()
      break
  }

  // Apply maxFeatures limit
  const maxFeatures = featureListConfig.maxFeatures || 8
  features = features.slice(0, maxFeatures)

  return {
    title: featureListConfig.title,
    description: featureListConfig.description,
    features,
    layout: featureListConfig.layout || '3',
    alignment: featureListConfig.alignment || 'left'
  }
}

// Fetch testimonials
export async function getTestimonials() {
  const query = `*[_type == "testimonial"] | order(order asc) {
    _id,
    quote,
    author,
    role,
    company,
    "avatar": avatar.asset->url,
    rating,
    featured,
    order
  }`
  
  return await sanityClient.fetch(query)
}

// Fetch site configuration
export async function getSiteConfig() {
  const query = `*[_type == "siteConfig"][0] {
    _id,
    siteTitle,
    siteDescription,
    "ogImage": ogImage.asset->url,
    "logo": logo.asset->url,
    logoAlt,
    canonical,
    noindex,
    mode,
    scrollAnimations
  }`

  return await sanityClient.fetch(query)
}

// Fetch hero sections
export async function getHeroSection(page: string) {
  const query = `*[_type == "hero" && page == $page][0] {
    _id,
    title,
    subtitle,
    ctaText,
    ctaLink,
    "image": image.asset->url,
    badge,
    socialProof,
    page
  }`

  return await sanityClient.fetch(query, { page })
}

// Fetch CTA sections
export async function getCTASection(page: string) {
  const query = `*[_type == "cta" && page == $page][0] {
    _id,
    title,
    text,
    buttonText,
    buttonLink,
    notificationText,
    badgeText,
    "backgroundImage": backgroundImage.asset->url,
    theme,
    page
  }`

  return await sanityClient.fetch(query, { page })
}

// Fetch page content
export async function getPageContent(page: string) {
  const query = `*[_type == "pageContent" && page == $page][0] {
    _id,
    page,
    seoTitle,
    seoDescription,
    pageHeader,
    socialProofText,
    sections
  }`

  return await sanityClient.fetch(query, { page })
}

// Fetch social proof data
export async function getSocialProof() {
  const query = `*[_type == "socialProof"][0] {
    _id,
    trustText,
    businessCount,
    logos[] {
      platform,
      "imageUrl": logo.asset->url,
      alt
    }
  }`

  return await sanityClient.fetch(query)
}

// Fetch social proof data
export async function getFeaturesData() {
  const query = `*[_type == "deaturesData"][0] {
    _id,
    trustText,
    businessCount,
    logos[] {
      platform,
      "imageUrl": logo.asset->url,
      alt
    }
  }`

  return await sanityClient.fetch(query)
}

// Fetch FAQ page content
export async function getFAQPage() {
  const query = `*[_type == "faqPage"][0] {
    _id,
    seo,
    header,
    faqSections[] {
      title,
      text,
      category,
      backgroundColor,
      order
    },
    textImageSections[] {
      title,
      text,
      "image": image.asset->url,
      "mobileImage": mobileImage.asset->url,
      imagePosition,
      offsetImage,
      backgroundColor,
      order
    },
    cta->{
      _id,
      title,
      text,
      buttonText,
      buttonLink,
      notificationText,
      badgeText,
      "backgroundImage": backgroundImage.asset->url,
      theme,
      page
    }
  }`

  return await sanityClient.fetch(query)
}

// Fetch FAQs by category
export async function getFAQsByCategory(category: string) {
  const query = `*[_type == "faq" && category == $category] | order(order asc) {
    _id,
    question,
    reply,
    category,
    open,
    order
  }`
  
  return await sanityClient.fetch(query, { category })
}

// Fetch home page content
export async function getHomePage() {
  const query = `*[_type == "home"][0] {
    _id,
    seo,
    hero->{
      _id,
      title,
      subtitle,
      ctaText,
      ctaLink,
      "image": image.asset->url,
      badge,
      socialProof,
      page
    },
    socialProof->{
      _id,
      trustText,
      businessCount,
      logos[] {
        platform,
        "imageUrl": logo.asset->url,
        alt
      }
    },
    featuredTestimonial->{
      _id,
      quote,
      author,
      role,
      company,
      "avatar": avatar.asset->url,
      rating,
      featured,
      order
    },
    "testimonialBackground": testimonialBackground.asset->url,
    testimonialBackgroundPosition,
    highlightBlocks[] {
      heading,
      text,
      "image": image.asset->url,
      "mobileImage": mobileImage.asset->url,
      order
    },
    featureCardHeader {
      title,
      text
    },
    featureCardData[]->{
      _id,
      title,
      image,
      description,
      category,
      order
    },
    cta->{
      _id,
      title,
      text,
      buttonText,
      buttonLink,
      notificationText,
      badgeText,
      "backgroundImage": backgroundImage.asset->url,
      theme,
      page
    }
  }`

  return await sanityClient.fetch(query)
}

// Fetch features page content
export async function getFeaturesPage() {
  const query = `*[_type == "featuresPage"][0] {
    _id,
    seo,
    header,
    featureSections[] {
      title,
      text,
      category,
      backgroundColor,
      order
    },
    cta->{
      _id,
      title,
      text,
      buttonText,
      buttonLink,
      notificationText,
      badgeText,
      "backgroundImage": backgroundImage.asset->url,
      theme,
      page
    }
  }`

  return await sanityClient.fetch(query)
}

// Fetch pricing page content
export async function getPricingPage() {
  const query = `*[_type == "pricingPage"][0] {
    _id,
    seo,
    header,
    socialProof->{
      _id,
      trustText,
      businessCount,
      logos[] {
        platform,
        "imageUrl": logo.asset->url,
        alt
      }
    },
    showFeatures,
    featureList->{
      _id,
      title,
      description,
      featuresSelection,
      category,
      "selectedFeatures": selectedFeatures[]->{
        _id,
        title,
        icon,
        description,
        category,
        order
      },
      maxFeatures,
      layout,
      alignment
    },
    featuredTestimonial->{
      _id,
      quote,
      author,
      role,
      company,
      "avatar": avatar.asset->url,
      rating,
      featured,
      order
    },
    "testimonialBackground": testimonialBackground.asset->url,
    testimonialBackgroundPosition,
    showFAQ,
    faqBackgroundClass,
    cta->{
      _id,
      title,
      text,
      buttonText,
      buttonLink,
      notificationText,
      badgeText,
      "backgroundImage": backgroundImage.asset->url,
      theme,
      page
    }
  }`

  return await sanityClient.fetch(query)
}