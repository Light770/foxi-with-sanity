// Social Links
// ------------
// Description: The social links data for the website.

import { getSocialLinksConfig } from '../lib/sanity'
import type { SocialLinksConfig, SocialLink as SanitySocialLink } from '../lib/sanity/types'

// Legacy interface for backward compatibility
export interface SocialLink {
	name: string
	link: string
	icon: string
}

// Fallback social links data
const fallbackSocialLinksData: SocialLinksConfig = {
	_id: 'fallback',
	socialLinks: [
		{
			platform: 'facebook',
			url: '/',
			icon: 'fb-icon',
			displayName: 'Facebook',
			openInNewTab: true,
			isActive: true,
			order: 1
		},
		{
			platform: 'twitter',
			url: '/',
			icon: 'twitter-icon',
			displayName: 'Twitter',
			openInNewTab: true,
			isActive: true,
			order: 2
		},
		{
			platform: 'discord',
			url: '/',
			icon: 'discord-icon',
			displayName: 'Discord',
			openInNewTab: true,
			isActive: true,
			order: 3
		}
	],
	displaySettings: {
		showInHeader: false,
		showInFooter: true,
		showLabels: false,
		iconSize: 'md',
		style: 'simple'
	},
	seoSettings: {
		addNofollow: false,
		addNoopener: true
	}
}

// Cache for social links config
let socialLinksConfigCache: SocialLinksConfig | null = null

// Get social links configuration from Sanity with fallback
export async function getSocialLinksConfiguration(): Promise<SocialLinksConfig> {
	if (socialLinksConfigCache) {
		return socialLinksConfigCache
	}

	try {
		const sanityConfig = await getSocialLinksConfig()
		if (sanityConfig) {
			socialLinksConfigCache = sanityConfig
		} else {
			socialLinksConfigCache = fallbackSocialLinksData
		}
		return socialLinksConfigCache as SocialLinksConfig
	} catch (error) {
		console.warn('Failed to fetch social links config from Sanity, using fallback:', error)
		socialLinksConfigCache = fallbackSocialLinksData
		return socialLinksConfigCache as SocialLinksConfig
	}
}

// Convert SocialLinksConfig to legacy SocialLink format for backward compatibility
function convertToLegacyFormat(config: SocialLinksConfig): SocialLink[] {
	return config.socialLinks.map(link => ({
		name: link.platform === 'other' ? (link.customPlatformName || 'custom') : link.platform,
		link: link.url,
		icon: link.icon || `${link.platform}-icon`
	}))
}

// Export legacy format for backward compatibility
export const socialLinks: SocialLink[] = convertToLegacyFormat(fallbackSocialLinksData)

// Export function to get dynamic social links data
export async function getSocialLinks(): Promise<SocialLink[]> {
	const config = await getSocialLinksConfiguration()
	return convertToLegacyFormat(config)
}

// Export function to get full social links configuration
export async function getFullSocialLinksConfig(): Promise<SocialLinksConfig> {
	return await getSocialLinksConfiguration()
}

// Export individual functions for specific data
export async function getSocialLinksForHeader(): Promise<SanitySocialLink[]> {
	const config = await getSocialLinksConfiguration()
	return config.displaySettings.showInHeader ? config.socialLinks : []
}

export async function getSocialLinksForFooter(): Promise<SanitySocialLink[]> {
	const config = await getSocialLinksConfiguration()
	return config.displaySettings.showInFooter ? config.socialLinks : []
}

// Helper function to get social link attributes for SEO
export async function getSocialLinkAttributes(): Promise<{ rel: string; target: string }> {
	const config = await getSocialLinksConfiguration()
	const relParts = []
	
	if (config.seoSettings.addNofollow) relParts.push('nofollow')
	if (config.seoSettings.addNoopener) relParts.push('noopener')
	
	return {
		rel: relParts.join(' '),
		target: '_blank'
	}
}
