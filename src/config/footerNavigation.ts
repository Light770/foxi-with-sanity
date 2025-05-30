// Footer Navigation
// ------------
// Description: The footer navigation data for the website.

import { getFooterConfig } from '../lib/sanity'
import type { FooterConfig, FooterColumn, FooterAbout, SubFooter } from '../lib/sanity/types'

// Legacy interfaces for backward compatibility
export interface Logo {
	src: string
	alt: string
	text: string
}

export interface SubCategory {
	subCategory: string
	subCategoryLink: string
}

export interface FooterData {
	footerAbout: FooterAbout & { logo: Logo }
	footerColumns: Array<{ category: string; subCategories: SubCategory[] }>
	subFooter: { copywriteText: string }
}

// Fallback footer data
const fallbackFooterData: FooterConfig = {
	_id: 'fallback',
	footerAbout: {
		title: 'Foxi.',
		aboutText:
			'Expertly made, responsive, accessible components in React and HTML ready to be used on your website or app. Just copy and paste them on your Tailwind CSS project.',
		logo: {
			image: '/logo.svg',
			alt: 'The tailwind astro theme',
			text: 'Foxi.'
		}
	},
	footerColumns: [
		{
			category: 'Product',
			subCategories: [
				{
					subCategory: 'Features',
					subCategoryLink: '/features'
				},
				{
					subCategory: 'FAQ',
					subCategoryLink: '/faq'
				},
				{
					subCategory: 'Pricing',
					subCategoryLink: '/pricing'
				},
				{
					subCategory: 'Changelog',
					subCategoryLink: '/changelog'
				},
				{
					subCategory: 'Terms',
					subCategoryLink: '/terms'
				}
			],
			order: 1
		},
		{
			category: 'About us',
			subCategories: [
				{
					subCategory: 'About us',
					subCategoryLink: '/'
				},
				{
					subCategory: 'News',
					subCategoryLink: '/blog'
				},
				{
					subCategory: 'Careers',
					subCategoryLink: '/blog'
				}
			],
			order: 2
		},
		{
			category: 'Get in touch',
			subCategories: [
				{
					subCategory: 'Contact',
					subCategoryLink: '/contact'
				},
				{
					subCategory: 'Support',
					subCategoryLink: '/contact'
				},
				{
					subCategory: 'Join us',
					subCategoryLink: '/contact'
				}
			],
			order: 3
		}
	],
	subFooter: {
		copywriteText: '© Foxi 2024.'
	},
	footerSettings: {
		showSocialLinks: true,
		backgroundColor: 'default'
	}
}

// Cache for footer config
let footerConfigCache: FooterConfig | null = null

// Get footer configuration from Sanity with fallback
export async function getFooterConfiguration(): Promise<FooterConfig> {
	if (footerConfigCache) {
		return footerConfigCache
	}

	try {
		const sanityConfig = await getFooterConfig()
		if (sanityConfig) {
			footerConfigCache = sanityConfig
		} else {
			footerConfigCache = fallbackFooterData
		}
		return footerConfigCache as FooterConfig
	} catch (error) {
		console.warn('Failed to fetch footer config from Sanity, using fallback:', error)
		footerConfigCache = fallbackFooterData
		return footerConfigCache as FooterConfig
	}
}

// Convert FooterConfig to legacy FooterData format for backward compatibility
function convertToLegacyFormat(config: FooterConfig): FooterData {
	return {
		footerAbout: {
			...config.footerAbout,
			logo: {
				src: config.footerAbout.logo.image || '/logo.svg',
				alt: config.footerAbout.logo.alt,
				text: config.footerAbout.logo.text || ''
			}
		},
		footerColumns: config.footerColumns.map(column => ({
			category: column.category,
			subCategories: column.subCategories.map(sub => ({
				subCategory: sub.subCategory,
				subCategoryLink: sub.subCategoryLink
			}))
		})),
		subFooter: {
			copywriteText: config.subFooter.copywriteText
		}
	}
}

// Export legacy format for backward compatibility
export const footerNavigationData: FooterData = convertToLegacyFormat(fallbackFooterData)

// Export function to get dynamic footer data
export async function getFooterNavigationData(): Promise<FooterData> {
	const config = await getFooterConfiguration()
	return convertToLegacyFormat(config)
}

// Export individual functions for specific data
export async function getFooterAbout(): Promise<FooterAbout> {
	const config = await getFooterConfiguration()
	return config.footerAbout
}

export async function getFooterColumns(): Promise<FooterColumn[]> {
	const config = await getFooterConfiguration()
	return config.footerColumns
}

export async function getSubFooter(): Promise<SubFooter> {
	const config = await getFooterConfiguration()
	return config.subFooter
}
