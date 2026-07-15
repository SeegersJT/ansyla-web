import type { ComponentType, SVGProps } from 'react'
import InstagramIcon from '@/icons/Instagram.component'

export interface FooterColumns {
	title: string
	links: Array<string>
}

export const footerColumns: FooterColumns[] = [
	{
		title: 'Shop',
		links: ['Rings', 'Necklaces'],
	},
	{
		title: 'Company',
		links: ['About ANSYLA', 'Contact Us', 'FAQs', 'ANSYLA Rewards'],
	},
	{
		title: 'Policies',
		links: ['Shipping Policy', 'Returns Policy', 'Privacy Policy', 'Terms & Conditions'],
	},
]

export interface SocialLink {
	label: string
	href: string
	icon: ComponentType<SVGProps<SVGSVGElement>>
}

export const socialLinks: SocialLink[] = [
	{
		label: 'Instagram',
		href: 'https://www.instagram.com/ansylajewels/',
		icon: InstagramIcon,
	},
]
