import Product from '@/components/landing-page/product/Product.component'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { addToCart, setCartDrawerOpen } from '@/redux/actions/Cart.action'
import { requestProductByProductNo } from '@/redux/actions/Product.action'
import { requestToggleWishlistItem } from '@/redux/actions/Wishlist.action'
import type { ProductItem } from '@/redux/types/Product.type'
import { Utils } from '@/utils/Utils'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

function ProductContainer() {
	const dispatch = useAppDispatch()

	const { selectedProduct } = useAppSelector(state => state.product)
	const { settingsData } = useAppSelector(state => state.settings)
	const { productIds } = useAppSelector(state => state.wishlist)

	const { context } = useParams<{ context: string }>()

	const [zoom, setZoom] = useState<boolean>(false)
	const [selectedQuantity, setSelectedQuantity] = useState<number>(1)

	const stockAvailibility = Utils.calculateStockAvailability(selectedProduct?.stock)
	const addedToWishList = productIds.includes(selectedProduct?.id)

	const handleOnZoomChange = (value: boolean) => {
		setZoom(value)
	}

	const handleOnQuantityChange = (value: number) => {
		setSelectedQuantity(value)
	}

	const handleOnAddToWishListClick = () => {
		dispatch(requestToggleWishlistItem(selectedProduct.id))
	}

	const handleOnAddToCartClick = (product: ProductItem, selectedQuantity: number) => {
		dispatch(setCartDrawerOpen(true))
		dispatch(addToCart(product, selectedQuantity))
	}

	useEffect(() => {
		dispatch(requestProductByProductNo(context))
	}, [dispatch, context])

	return (
		<Product
			product={selectedProduct}
			zoom={zoom}
			settings={settingsData[0]}
			stockAvailibity={stockAvailibility}
			selectedQuantity={selectedQuantity}
			addedToWishList={addedToWishList}
			relatedProducts={[]}
			onZoomChange={handleOnZoomChange}
			onQuantityChange={handleOnQuantityChange}
			onAddToWishlistClick={handleOnAddToWishListClick}
			onAddToCartClick={handleOnAddToCartClick}
		/>
	)
}

export default ProductContainer
