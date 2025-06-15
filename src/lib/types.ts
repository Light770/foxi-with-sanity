// Service types
export interface ServiceFeature {
  title: string
  description: string
}

export interface ServiceAdvantage {
  title: string
  text: string
}

export interface Service {
  _id?: string
  title: string
  slug: {
    current: string
  }
  description: string
  longDescription?: string
  category: string
  image?: any
  features?: ServiceFeature[]
  advantages?: ServiceAdvantage[]
  order?: number
}

// Fallback service type for static data
export interface FallbackService {
  title: string
  description: string
  longDescription?: string
  category: string
  image: any
  features: ServiceFeature[]
  advantages: ServiceAdvantage[]
}