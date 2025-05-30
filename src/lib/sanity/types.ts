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

// Configuration Types
export interface AnalyticsConfig {
  _id: string
  googleSiteVerification: string
  googleAnalyticsMeasurementID: string
  googleTagManagerID: string
  enableAnalytics: boolean
  cookieConsent: boolean
}

export interface NavigationLogo {
  image: string
  alt: string
  text?: string
}

export interface NavSubItem {
  name: string
  link: string
}

export interface NavItem {
  name: string
  link: string
  submenu?: NavSubItem[]
}

export interface NavAction {
  name: string
  link: string
  style: 'primary' | 'secondary' | 'neutral'
  variation?: 'outline' | 'link' | ''
  size: 'sm' | 'base' | 'lg'
}

export interface MobileMenuSettings {
  showLogo: boolean
  closeOnItemClick: boolean
}

export interface NavigationConfig {
  _id: string
  logo: NavigationLogo
  navItems: NavItem[]
  navActions: NavAction[]
  mobileMenuSettings: MobileMenuSettings
}

export interface FooterLogo {
  image?: string
  alt: string
  text?: string
}

export interface FooterAbout {
  title: string
  aboutText: string
  logo: FooterLogo
}

export interface FooterSubCategory {
  subCategory: string
  subCategoryLink: string
  openInNewTab?: boolean
}

export interface FooterColumn {
  category: string
  subCategories: FooterSubCategory[]
  order?: number
}

export interface FooterAdditionalLink {
  text: string
  url: string
}

export interface SubFooter {
  copywriteText: string
  additionalLinks?: FooterAdditionalLink[]
}

export interface FooterSettings {
  showSocialLinks: boolean
  backgroundColor: 'default' | 'dark' | 'light' | 'primary'
}

export interface FooterConfig {
  _id: string
  footerAbout: FooterAbout
  footerColumns: FooterColumn[]
  subFooter: SubFooter
  footerSettings: FooterSettings
}

export interface SocialLink {
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'discord' | 'tiktok' | 'github' | 'other'
  customPlatformName?: string
  url: string
  icon?: string
  displayName?: string
  openInNewTab: boolean
  isActive: boolean
  order?: number
}

export interface SocialDisplaySettings {
  showInHeader: boolean
  showInFooter: boolean
  showLabels: boolean
  iconSize: 'sm' | 'md' | 'lg'
  style: 'simple' | 'filled' | 'outlined'
}

export interface SocialSEOSettings {
  addNofollow: boolean
  addNoopener: boolean
}

export interface SocialLinksConfig {
  _id: string
  socialLinks: SocialLink[]
  displaySettings: SocialDisplaySettings
  seoSettings: SocialSEOSettings
}