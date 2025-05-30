// Google tracking
// - Google Site Verification: for Google Search Console
// - Google Analytics Measurement ID: for Google Analytics
// - Google Tag Manager ID: for Google Tag Manager

import { getAnalyticsConfig } from '../lib/sanity'
import type { AnalyticsConfig } from '../lib/sanity/types'

// Fallback values
const fallbackConfig: AnalyticsConfig = {
  _id: 'fallback',
  googleSiteVerification: '',
  googleAnalyticsMeasurementID: 'G-6JT3PTTD25',
  googleTagManagerID: '',
  enableAnalytics: true,
  cookieConsent: true,
}

// Cache for analytics config
let analyticsConfigCache: AnalyticsConfig | null = null

// Get analytics configuration from Sanity with fallback
export async function getAnalyticsConfiguration(): Promise<AnalyticsConfig> {
  if (analyticsConfigCache) {
    return analyticsConfigCache
  }

  try {
    const sanityConfig = await getAnalyticsConfig()
    if (sanityConfig) {
      analyticsConfigCache = sanityConfig
    } else {
      analyticsConfigCache = fallbackConfig
    }
    return analyticsConfigCache as AnalyticsConfig
  } catch (error) {
    console.warn('Failed to fetch analytics config from Sanity, using fallback:', error)
    analyticsConfigCache = fallbackConfig
    return analyticsConfigCache as AnalyticsConfig
  }
}

// Export individual values for backward compatibility
export const googleSiteVerification = fallbackConfig.googleSiteVerification
export const googleAnalyticsMeasurementID = fallbackConfig.googleAnalyticsMeasurementID
export const googleTagManagerID = fallbackConfig.googleTagManagerID

// Export function to get dynamic values
export async function getGoogleSiteVerification(): Promise<string> {
  const config = await getAnalyticsConfiguration()
  return config.googleSiteVerification || fallbackConfig.googleSiteVerification
}

export async function getGoogleAnalyticsMeasurementID(): Promise<string> {
  const config = await getAnalyticsConfiguration()
  return config.googleAnalyticsMeasurementID || fallbackConfig.googleAnalyticsMeasurementID
}

export async function getGoogleTagManagerID(): Promise<string> {
  const config = await getAnalyticsConfiguration()
  return config.googleTagManagerID || fallbackConfig.googleTagManagerID
}

export async function isAnalyticsEnabled(): Promise<boolean> {
  const config = await getAnalyticsConfiguration()
  return config.enableAnalytics ?? fallbackConfig.enableAnalytics
}

export async function isCookieConsentRequired(): Promise<boolean> {
  const config = await getAnalyticsConfiguration()
  return config.cookieConsent ?? fallbackConfig.cookieConsent
}
