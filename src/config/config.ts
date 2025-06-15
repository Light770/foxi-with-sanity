// Config
// ------------
// Description: The configuration file for the website.

import { getSiteConfig } from '../lib/sanity'

export interface Logo {
	src: string
	alt: string
}

export type Mode = 'auto' | 'light' | 'dark'

export interface Config {
	siteTitle: string
	siteDescription: string
	ogImage: string
	logo: Logo
	canonical: boolean
	noindex: boolean
	mode: Mode
	scrollAnimations: boolean
}

// Fallback configuration
const fallbackConfig: Config = {
	siteTitle: 'Andy & Co. Des produits modernes, de qualité, dessinés à la main par des artistes français.',
	siteDescription:
		'ANDY & CO est une entreprise innovante spécialisée dans la vente de produits souvenirs avant-gardistes. Au-delà de nos gammes régulières, nous misons sur la personnalisation avec une équipe de designers dédiée capable de donner vie aux idées uniques de leurs clients.',
	ogImage: '/og.jpg',
	logo: {
		src: '/logo-favicon.png',
		alt: 'Andy & Co. logo'
	},
	canonical: true,
	noindex: false,
	mode: 'auto',
	scrollAnimations: true
}

// Cache for site config
let siteConfigCache: Config | null = null

// Get site configuration from Sanity with fallback
export async function getSiteConfiguration(): Promise<Config> {
	if (siteConfigCache) {
		return siteConfigCache
	}

	try {
		const sanityConfig = await getSiteConfig()
		if (sanityConfig) {
			siteConfigCache = {
				siteTitle: sanityConfig.siteTitle || fallbackConfig.siteTitle,
				siteDescription: sanityConfig.siteDescription || fallbackConfig.siteDescription,
				ogImage: sanityConfig.ogImage || fallbackConfig.ogImage,
				logo: {
					src: sanityConfig.logo || fallbackConfig.logo.src,
					alt: sanityConfig.logoAlt || fallbackConfig.logo.alt
				},
				canonical: sanityConfig.canonical ?? fallbackConfig.canonical,
				noindex: sanityConfig.noindex ?? fallbackConfig.noindex,
				mode: (sanityConfig.mode as Mode) || fallbackConfig.mode,
				scrollAnimations: sanityConfig.scrollAnimations ?? fallbackConfig.scrollAnimations
			}
		} else {
			siteConfigCache = fallbackConfig
		}
		return siteConfigCache as Config
	} catch (error) {
		console.warn('Failed to fetch site config from Sanity, using fallback:', error)
		siteConfigCache = fallbackConfig
		return siteConfigCache as Config
	}
}

// Export legacy format for backward compatibility
export const configData: Config = fallbackConfig

// Export function to get dynamic config data
export async function getConfigData(): Promise<Config> {
	return await getSiteConfiguration()
}

// Export individual functions for specific config values
export async function getSiteTitle(): Promise<string> {
	const config = await getSiteConfiguration()
	return config.siteTitle
}

export async function getSiteDescription(): Promise<string> {
	const config = await getSiteConfiguration()
	return config.siteDescription
}

export async function getOGImage(): Promise<string> {
	const config = await getSiteConfiguration()
	return config.ogImage
}

export async function getLogo(): Promise<Logo> {
	const config = await getSiteConfiguration()
	return config.logo
}

export async function getCanonical(): Promise<boolean> {
	const config = await getSiteConfiguration()
	return config.canonical
}

export async function getNoindex(): Promise<boolean> {
	const config = await getSiteConfiguration()
	return config.noindex
}

export async function getMode(): Promise<Mode> {
	const config = await getSiteConfiguration()
	return config.mode
}

export async function getScrollAnimations(): Promise<boolean> {
	const config = await getSiteConfiguration()
	return config.scrollAnimations
}
