import { Link } from "react-router";
import HeroImage from "@/assets/hero.jpg";
import type { CategoryItem } from "@/redux/types/Category.type";
import type { ReasonItem, TestimonialItem } from "@/containers/landing-page/home/Home.helper";
import type { ProductItem } from "@/redux/types/Product.type";
import type { Settings } from "@/redux/types/Settings.type";
import ProductCard from "@/components/product-card/ProductCard.component";
import { Loader2, Quote, Sparkles } from "lucide-react";
import type { NewsletterState } from "@/redux/types/Newsletter.type";

function Home({
	category_data,
	reasons,
	bestSellers,
	newArrivals,
	settings,
	testimonials,
	newsletterEmailAddress,
	newsletter,
	onSubscribeToNewsletter,
	onNewsletterEmailChange,
}: {
	category_data: CategoryItem[]
	reasons: ReasonItem[]
	bestSellers: ProductItem[]
	newArrivals: ProductItem[]
	settings: Settings
	testimonials: TestimonialItem[]
	newsletterEmailAddress: string
	newsletter: NewsletterState
	onSubscribeToNewsletter: (event: React.SubmitEvent) => void
	onNewsletterEmailChange: (value: string) => void
}) {
	return (
		<div>
			{/* Hero */}
			<section className="relative">
				<div className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
					<img
						src={HeroImage}
						alt="ANSYLA luxury gold diamond jewelry"
						width={1920}
						height={1080}
						className="h-full w-full object-cover"
					/>

					<div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
					<div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />

					<div className="absolute inset-0 flex items-center">
						<div className="mx-auto w-full max-w-7xl px-6">
							<div className="max-w-xl">
								<p className="mb-4 text-xs uppercase tracking-luxe text-primary">
									ANSYLA Jewels · South Africa
								</p>

								<h1 className="font-serif text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
									Timeless Beauty,{" "}
									<span className="text-gradient-gold">Precious You</span>
								</h1>

								<p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
									Discover exquisite jewelry crafted to celebrate your elegance,
									confidence, and individuality.
								</p>

								<div className="mt-9 flex flex-wrap gap-4">
									<Link
										to="/shop"
										className="bg-gradient-gold px-8 py-3.5 text-xs font-medium uppercase tracking-luxe text-primary-foreground transition-opacity hover:opacity-90"
									>
										Shop Collection
									</Link>

									<Link
										to="/shop"
										className="border border-primary/60 px-8 py-3.5 text-xs font-medium uppercase tracking-luxe text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
									>
										New Arrivals
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Categories */}
			<section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
				<div className="mb-12 text-center">
					<p className="text-xs uppercase tracking-luxe text-primary">
						Explore
					</p>
					<h2 className="mt-3 font-serif text-4xl">Featured Collections</h2>
				</div>
				<div className="grid grid-cols-2 gap-4 md:grid-cols-3">
					{category_data.map((category) => (
						<Link
							key={category.name}
							to="/shop"
							className="group relative aspect-[4/5] overflow-hidden rounded-sm border border-border"
						>
							<img
								// src={category.image}
								// alt={category.name}
								loading="lazy"
								className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
							<div className="absolute inset-x-0 bottom-0 p-5 text-center">
								<h3 className="font-serif text-2xl">{category.name}</h3>
								<p className="mt-1 text-xs uppercase tracking-wider text-primary/90">
									{category.description}
								</p>
							</div>
						</Link>
					))}
				</div>
			</section>

			{/* Best Sellers */}
			<section className="border-y border-border bg-card/40 py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6">
					<div className="mb-12 flex items-end justify-between">
						<div>
							<p className="text-xs uppercase tracking-luxe text-primary">
								Adored
							</p>
							<h2 className="mt-3 font-serif text-4xl">Best Sellers</h2>
						</div>
						<Link
							to="/shop"
							className="hidden text-xs uppercase tracking-wider text-muted-foreground hover:text-primary sm:block"
						>
							View all →
						</Link>
					</div>
					<div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
						{bestSellers.map((product) => (
							<ProductCard
								key={product.id}
								currency={settings?.currency}
								product={product}
							/>
						))}
					</div>
				</div>
			</section>

			{/* New Arrivals */}
			<section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
				<div className="mb-12 text-center">
					<p className="text-xs uppercase tracking-luxe text-primary">
						Just In
					</p>
					<h2 className="mt-3 font-serif text-4xl">New Arrivals</h2>
				</div>
				<div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
					{newArrivals.map((product) => (
						<ProductCard
							key={product.id}
							currency={settings?.currency}
							product={product}
						/>
					))}
				</div>
			</section>

			{/* Why ANSYLA */}
			<section className="border-y border-border bg-card/40 py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6">
					<div className="mb-12 text-center">
						<p className="text-xs uppercase tracking-luxe text-primary">
							The ANSYLA Promise
						</p>
						<h2 className="mt-3 font-serif text-4xl">
							Why Choose ANSYLA Jewels
						</h2>
					</div>
					<div className="grid grid-cols-2 gap-8 md:grid-cols-5">
						{reasons.map((reason) => (
							<div
								key={reason.title}
								className="flex flex-col items-center text-center"
							>
								<div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/40">
									<reason.icon className="h-7 w-7 text-primary" />
								</div>
								<h3 className="mt-4 font-serif text-lg">{reason.title}</h3>
								<p className="mt-1 text-xs text-muted-foreground">{reason.text}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
				<div className="mb-12 text-center">
					<p className="text-xs uppercase tracking-luxe text-primary">
						Loved By
					</p>
					<h2 className="mt-3 font-serif text-4xl">Words From Our Circle</h2>
				</div>
				<div className="grid gap-6 md:grid-cols-3">
					{testimonials.map((testimonial) => (
						<div
							key={testimonial.name}
							className="rounded-sm border border-primary/30 bg-card p-8 shadow-gold"
						>
							<Quote className="h-7 w-7 text-primary" />
							<p className="mt-5 text-sm leading-relaxed text-foreground/90">
								"{testimonial.text}"
							</p>
							<p className="mt-6 font-serif text-lg text-primary">{testimonial.name}</p>
							<p className="text-xs uppercase tracking-wider text-muted-foreground">
								{testimonial.city}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* Newsletter */}
			<section className="border-t border-border bg-gradient-to-b from-card to-background py-24">
				<div className="mx-auto max-w-2xl px-6 text-center">
					<Sparkles className="mx-auto h-8 w-8 text-primary" />
					<h2 className="mt-5 font-serif text-4xl">
						Become Part of the ANSYLA Circle
					</h2>
					<p className="mt-4 text-muted-foreground">
						Exclusive offers, private previews, and first access to new
						collections.
					</p>

					{newsletter.isSubscribed ? (
						<p className="mt-8 text-sm text-primary tracking-wider uppercase">
							Welcome to the circle ✦
						</p>
					) : (
						<form onSubmit={onSubscribeToNewsletter} className="mx-auto mt-8 flex max-w-md gap-2">
							<input
								type="email"
								required
								value={newsletterEmailAddress}
								onChange={(e) => onNewsletterEmailChange(e.target.value)}
								placeholder="Your email address"
								disabled={newsletter.loading}
								className="flex-1 border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary disabled:opacity-50"
							/>
							<button
								type="submit"
								disabled={newsletter.loading}
								className="bg-gradient-gold px-6 text-xs font-medium uppercase tracking-luxe text-primary-foreground disabled:opacity-70 flex items-center justify-center min-w-[72px]"
							>
								{newsletter.loading ? (
									<Loader2 className="h-6 w-6 animate-spin" />
								) : (
									"Join"
								)}
							</button>
						</form>
					)}

				</div>
			</section>
		</div>
	);
}

export default Home;
