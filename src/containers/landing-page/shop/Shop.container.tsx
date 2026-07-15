import Shop from '@/components/landing-page/shop/Shop.component'
import { useAppSelector } from '@/hooks/useAppSelector'
import type { CategoryItem } from '@/redux/types/Category.type'
import { useMemo, useState } from 'react'
import type { OrderByItem } from './Shop.helper'

function ShopContainer() {
	const { settingsData } = useAppSelector(state => state.settings)
	const { categoryData } = useAppSelector(state => state.category)
	const { productData } = useAppSelector(state => state.product)

	const materialOptions = settingsData[0]?.materials ?? []
	const occasionOptions = settingsData[0]?.occasions ?? []

	const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null)
	const [selectedMaxPrice, setSelectedMaxPrice] = useState(1000)
	const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null)
	const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null)
	const [selectedOrderBy, setSelectedOrderBy] = useState<OrderByItem>('featured')

	const handleOnSelectedCategoryChange = (category: CategoryItem | null) => {
		setSelectedCategory(category)
	}

	const handlOnSelectedMaxPriceChange = (value: number) => {
		setSelectedMaxPrice(value)
	}

	const handleOnSelectedMaterialChange = (material: string | null) => {
		setSelectedMaterial(material)
	}

	const handleOnSelectedOccasionChange = (occasion: string | null) => {
		setSelectedOccasion(occasion)
	}

	const handleOnSelectedOrderByChange = (orderBy: OrderByItem) => {
		setSelectedOrderBy(orderBy)
	}

	const filteredProducts = useMemo(() => {
		let result = [...productData]

		if (selectedCategory) {
			result = result.filter(p => p.category_id === selectedCategory.id)
		}

		if (selectedMaxPrice) {
			result = result.filter(p => p.price <= selectedMaxPrice)
		}

		if (selectedMaterial) {
			result = result.filter(
				p => Array.isArray(p.materials) && p.materials.includes(selectedMaterial)
			)
		}

		if (selectedOccasion) {
			result = result.filter(
				p => Array.isArray(p.occasions) && p.occasions.includes(selectedOccasion)
			)
		}

		switch (selectedOrderBy) {
			case 'newest':
				result.sort((a, b) => Number(!!b?.is_new) - Number(!!a?.is_new))
				break
			case 'price-asc':
				result.sort((a, b) => a?.price - b?.price)
				break
			case 'price-desc':
				result.sort((a, b) => b?.price - a?.price)
				break
			case 'popular':
				result.sort((a, b) => Number(!!b?.is_best_seller) - Number(!!a?.is_best_seller))
				break
		}

		return result
	}, [
		productData,
		selectedCategory,
		selectedMaxPrice,
		selectedMaterial,
		selectedOccasion,
		selectedOrderBy,
	])

	return (
		<Shop
			categoryData={categoryData}
			materialOptions={materialOptions}
			occasionOptions={occasionOptions}
			filteredProducts={filteredProducts}
			selectedCategory={selectedCategory}
			selectedMaxPrice={selectedMaxPrice}
			selectedMaterial={selectedMaterial}
			selectedOccasion={selectedOccasion}
			selectedOrderBy={selectedOrderBy}
			settings={settingsData[0]}
			onSelectedCategoryChange={handleOnSelectedCategoryChange}
			onSelectedMaxPriceChange={handlOnSelectedMaxPriceChange}
			onSelectedMaterialChange={handleOnSelectedMaterialChange}
			onSelectedOccasionChange={handleOnSelectedOccasionChange}
			onSelectedOrderByChange={handleOnSelectedOrderByChange}
		/>
	)
}

export default ShopContainer
