import Wishlist from '@/components/landing-page/dashboard/account/wishlist/Wishlist.component'
import { useAppSelector } from '@/hooks/useAppSelector'

function WishlistContainer() {
	const { productIds } = useAppSelector(state => state.wishlist)
	const { productData } = useAppSelector(state => state.product)
	const { settingsData } = useAppSelector(state => state.settings)

	const wishlistProducts = productData.filter(product => productIds.includes(product.id))

	return <Wishlist products={wishlistProducts} currency={settingsData[0]?.currency} />
}

export default WishlistContainer
