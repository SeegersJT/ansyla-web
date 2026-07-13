import ProductCard from '@/components/product-card/ProductCard.component'
import type { ProductItem } from '@/redux/types/Product.type'
import { Heart } from 'lucide-react'
import { Link } from 'react-router'

function Wishlist({
	products,
	currency,
}: {
	products: ProductItem[]
	currency: string | undefined
}) {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="font-serif text-2xl">My Wishlist</h2>
				<span className="text-xs text-muted-foreground">
					{products.length} {products.length === 1 ? 'piece' : 'pieces'}
				</span>
			</div>

			{products.length === 0 ? (
				<div className="flex flex-col items-center gap-4 border border-border bg-card py-20 text-center">
					<Heart className="h-10 w-10 text-primary/40" />
					<p className="text-muted-foreground">Your wishlist is empty.</p>
					<Link
						to="/shop"
						className="bg-gradient-gold px-6 py-3 text-xs font-medium uppercase tracking-luxe text-primary-foreground"
					>
						Discover Pieces
					</Link>
				</div>
			) : (
				<div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
					{products.map(product => (
						<ProductCard
							key={product.id}
							currency={currency ?? 'ZAR'}
							product={product}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default Wishlist
