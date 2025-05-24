import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Initialize Sanity client
export const sanityClient = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID || 'n6se1tqp',
  dataset: import.meta.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01', // Use current date
  useCdn: true, // set to false for fresh data
})

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

  return await sanityClient.fetch(query)
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

  return await sanityClient.fetch(query, { slug })
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