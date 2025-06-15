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

// Cache for navigation config
let navigationConfigCache: NavigationConfig | null = null

// Get navigation configuration from Sanity
export async function getNavigationConfiguration(): Promise<NavigationConfig> {
	if (navigationConfigCache) {
		return navigationConfigCache
	}

	const sanityConfig = await getNavigationConfig()
	if (!sanityConfig) {
		throw new Error('Navigation configuration not found in Sanity')
	}
	
	navigationConfigCache = sanityConfig
	return navigationConfigCache
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