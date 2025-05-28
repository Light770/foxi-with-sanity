// Sanity Types for Features Page
export interface FeaturesPageSEO {
  title: string
  description: string
}

export interface FeaturesPageHeader {
  title: any[] // PortableText array
  text: string
}

export interface FeatureSection {
  title: any[] // PortableText array
  text: string
  category: string
  backgroundColor?: string
  order?: number
}

export interface FeatureCardHeader {
  title: any[] // PortableText array
  text: string
}

// FAQ Page Types
export interface FAQPageSEO {
  title: string
  description: string
}

export interface FAQPageHeader {
  title: string
  text: string
}

export interface FAQSection {
  title: string
  text: string
  category: string
  backgroundColor?: string
  order?: number
}

export interface TextImageSection {
  title: string
  text: string
  image?: any
  mobileImage?: any
  imagePosition: 'left' | 'right'
  offsetImage?: boolean
  backgroundColor?: string
  order?: number
}

export interface FAQPage {
  _id: string
  seo: FAQPageSEO
  header: FAQPageHeader
  faqSections: FAQSection[]
  textImageSections: TextImageSection[]
  cta?: CTAData
}

export interface FAQ {
  _id: string
  question: any[] // PortableText array
  reply: string
  category: string
  open?: boolean
  order?: number
}

// Home Page Types
export interface HomePageSEO {
  title: string
  description: string
}

export interface HighlightBlock {
  heading: any[] // PortableText array
  text: string
  image?: any
  mobileImage?: any
  order?: number
}

export interface HomePage {
  _id: string
  seo: HomePageSEO
  hero?: any // Hero data from reference
  socialProof?: any // Social proof data from reference
  featuredTestimonial?: any // Testimonial data from reference
  testimonialBackground?: any
  testimonialBackgroundPosition: 'left' | 'right' | 'center'
  highlightBlocks: HighlightBlock[]
  featureCardHeader?: FeatureCardHeader
  featureCardData?: FeatureCard[]
  cta?: CTAData
}

export interface CTAData {
  _id: string
  title: any[] // PortableText array
  text: string
  buttonText: string
  buttonLink: string
  notificationText?: string
  badgeText?: string
  backgroundImage?: string
  theme?: string
  page?: string
}

export interface FeaturesPage {
  _id: string
  seo: FeaturesPageSEO
  header: FeaturesPageHeader
  featureSections: FeatureSection[]
  cta?: CTAData
}

export interface Feature {
  _id: string
  title: any[] // PortableText array
  icon: string
  description: string
  category: string
  order?: number
}

export interface FeatureCard {
  _id: string
  title: any[] // PortableText array
  image: any
  description: string
  category: string
  order?: number
}

// Pricing Plan Types
export interface PricingPlan {
  _id: string
  title: any[] // PortableText array
  subtitle: string
  currency: string
  price: string
  priceLabel: string
  priceMonthly: string
  priceLabelMonthly: string
  buttonName: string
  buttonLink: string
  listItems: Array<{ listItem: string }>
  isFeatured: boolean
  order?: number
}

// Pricing Page Types
export interface PricingPageSEO {
  title: string
  description: string
}

export interface PricingPageHeader {
  title: string
  text: string
}

export interface PricingPage {
  _id: string
  seo: PricingPageSEO
  header: PricingPageHeader
  socialProof?: any // Social proof data from reference
  showFeatures?: boolean
  featuredTestimonial?: any // Testimonial data from reference
  testimonialBackground?: any
  testimonialBackgroundPosition?: 'left' | 'right' | 'center'
  showFAQ?: boolean
  faqBackgroundClass?: string
  cta?: CTAData
}