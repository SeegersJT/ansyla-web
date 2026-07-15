import type { FooterColumns, SocialLink } from '@/containers/landing-page/footer/Footer.helper'
import { Link } from 'react-router'

function Footer({
	footerColumns,
	socialLinks,
}: {
	footerColumns: FooterColumns[]
	socialLinks: SocialLink[]
}) {
	return (
		<footer className="border-t border-border bg-card">
			<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
				<div className="grid gap-12 lg:grid-cols-5">
					<div className="lg:col-span-2">
						<span className="font-serif text-2xl font-semibold tracking-[0.25em] text-gradient-gold">
							ANSYLA
						</span>
						<p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
							Timeless Beauty, Precious You. Exquisite fine jewelry crafted to
							celebrate your elegance, confidence, and individuality - proudly South
							African.
						</p>
					</div>

					{footerColumns.map(column => (
						<div key={column.title}>
							<h4 className="text-xs uppercase tracking-luxe text-primary">
								{column.title}
							</h4>
							<ul className="mt-4 space-y-3">
								{column.links.map(link => (
									<li key={link}>
										<Link
											to="/shop"
											className="text-sm text-muted-foreground transition-colors hover:text-primary"
										>
											{link}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
					<p className="text-xs text-muted-foreground">
						© {new Date().getFullYear()} ANSYLA Jewels · All rights reserved.
						<br />
						Created by{' '}
						<a target="_blank" href="https://seegers.net.za/" rel="noopener noreferrer">
							Hanno Seegers
						</a>
					</p>
					<div className="flex gap-4 text-muted-foreground">
						{socialLinks.map(social => (
							<a
								key={social.label}
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={social.label}
								className="hover:text-primary"
							>
								<social.icon className="h-5 w-5" />
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
