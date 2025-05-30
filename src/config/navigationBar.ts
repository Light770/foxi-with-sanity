// Navigation Bar
// ------------
// Description: The navigation bar data for the website.

import { getNavigationConfig } from '../lib/sanity'
import type { NavigationConfig, NavItem, NavAction, NavigationLogo } from '../lib/sanity/types'

// Legacy interfaces for backward compatibility
export interface Logo {
	src: string
	alt: string
	text: string
}

export interface NavSubItem {
	name: string
	link: string
}

export interface NavData {
	logo: Logo
	navItems: NavItem[]
	navActions: NavAction[]
}

// Fallback navigation data
const fallbackNavigationData: NavigationConfig = {
	_id: 'fallback',
	logo: {
		image: '/logo.svg',
		alt: 'The tailwind astro theme',
		text: 'Foxi.'
	},
	navItems: [
		{ name: 'Home', link: '/' },
		{ name: 'Pricing', link: '/pricing' },
		{ name: 'Features', link: '/features' },
		{
			name: 'Resources',
			link: '#',
			submenu: [
				{ name: 'Blog', link: '/blog' },
				{ name: 'Changelog', link: '/changelog' },
				{ name: 'FAQ', link: '/faq' },
				{ name: 'Terms', link: '/terms' }
			]
		},
		{ name: 'Contact', link: '/contact' }
	],
	navActions: [{ name: 'Try it now', link: '/', style: 'primary', size: 'base', variation: '' }],
	mobileMenuSettings: {
		showLogo: true,
		closeOnItemClick: true
	}
}

// Cache for navigation config
let navigationConfigCache: NavigationConfig | null = null

// Get navigation configuration from Sanity with fallback
export async function getNavigationConfiguration(): Promise<NavigationConfig> {
	if (navigationConfigCache) {
		return navigationConfigCache
	}

	try {
		const sanityConfig = await getNavigationConfig()
		if (sanityConfig) {
			navigationConfigCache = sanityConfig
		} else {
			navigationConfigCache = fallbackNavigationData
		}
		return navigationConfigCache as NavigationConfig
	} catch (error) {
		console.warn('Failed to fetch navigation config from Sanity, using fallback:', error)
		navigationConfigCache = fallbackNavigationData
		return navigationConfigCache as NavigationConfig
	}
}

// Convert NavigationConfig to legacy NavData format for backward compatibility
function convertToLegacyFormat(config: NavigationConfig): NavData {
	return {
		logo: {
			src: config.logo.image,
			alt: config.logo.alt,
			text: config.logo.text || ''
		},
		navItems: config.navItems,
		navActions: config.navActions
	}
}

// Export legacy format for backward compatibility
export const navigationBarData: NavData = convertToLegacyFormat(fallbackNavigationData)

// Export function to get dynamic navigation data
export async function getNavigationBarData(): Promise<NavData> {
	const config = await getNavigationConfiguration()
	return convertToLegacyFormat(config)
}

// Export individual functions for specific data
export async function getNavigationLogo(): Promise<NavigationLogo> {
	const config = await getNavigationConfiguration()
	return config.logo
}

export async function getNavigationItems(): Promise<NavItem[]> {
	const config = await getNavigationConfiguration()
	return config.navItems
}

export async function getNavigationActions(): Promise<NavAction[]> {
	const config = await getNavigationConfiguration()
	return config.navActions
}
