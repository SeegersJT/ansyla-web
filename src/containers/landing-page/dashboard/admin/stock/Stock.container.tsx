import Stock from '@/components/landing-page/dashboard/admin/stock/Stock.component'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import {
	requestAddProduct,
	requestProductItems,
	requestRemoveProduct,
	requestUpdateProduct,
} from '@/redux/actions/Product.action'
import type { ProductImagesItem, ProductItem } from '@/redux/types/Product.type'
import { Utils } from '@/utils/Utils'
import { useEffect, useState } from 'react'
import type React from 'react'

export const emptyStockForm = {
	name: '',
	description: '',
	category_id: '',
	price: '',
	stock: '',
	images: [] as ProductImagesItem[],
	materials: [] as string[],
	occasions: [] as string[],
	is_new: false,
	is_best_seller: false,
	active: true,
}

export type StockForm = typeof emptyStockForm

function AdminStockContainer() {
	const dispatch = useAppDispatch()

	const { productData, productDataloading, addProductLoading, updateProductLoading } =
		useAppSelector(state => state.product)
	const { categoryData } = useAppSelector(state => state.category)
	const { settingsData } = useAppSelector(state => state.settings)

	const materialOptions = settingsData[0]?.materials ?? []
	const occasionOptions = settingsData[0]?.occasions ?? []

	const [showForm, setShowForm] = useState(false)
	const [editId, setEditId] = useState<string | null>(null)
	const [form, setForm] = useState<StockForm>(emptyStockForm)
	const [convertingImages, setConvertingImages] = useState(false)

	useEffect(() => {
		dispatch(requestProductItems())
	}, [dispatch])

	const handleOnAddClick = () => {
		setEditId(null)
		setForm(emptyStockForm)
		setShowForm(true)
	}

	const handleOnEditClick = (product: ProductItem) => {
		setEditId(product.id)
		setForm({
			name: product.name ?? '',
			description: product.description ?? '',
			category_id: product.category_id ?? '',
			price: String(product.price ?? 0),
			stock: String(product.stock ?? 0),
			images: product.images ?? [],
			materials: Array.isArray(product.materials) ? product.materials : [],
			occasions: Array.isArray(product.occasions) ? product.occasions : [],
			is_new: product.is_new,
			is_best_seller: product.is_best_seller,
			active: product.active,
		})
		setShowForm(true)
	}

	const handleOnFormChange = (value: Partial<StockForm>) => {
		setForm(current => ({ ...current, ...value }))
	}

	const handleOnCloseFormClick = () => {
		setShowForm(false)
	}

	const handleOnRemoveClick = (productId: string) => {
		dispatch(requestRemoveProduct(productId))
	}

	const handleOnImageFilesSelected = async (files: FileList | null) => {
		if (!files || files.length === 0) return

		setConvertingImages(true)

		try {
			const base64Images = await Promise.all(
				Array.from(files).map(async file => ({ url: await Utils.fileToBase64(file) }))
			)

			setForm(current => ({ ...current, images: [...current.images, ...base64Images] }))
		} finally {
			setConvertingImages(false)
		}
	}

	const handleOnRemoveImageClick = (url: string) => {
		setForm(current => ({
			...current,
			images: current.images.filter(image => image.url !== url),
		}))
	}

	const handleOnMaterialToggle = (material: string) => {
		setForm(current => ({
			...current,
			materials: current.materials.includes(material)
				? current.materials.filter(item => item !== material)
				: [...current.materials, material],
		}))
	}

	const handleOnOccasionToggle = (occasion: string) => {
		setForm(current => ({
			...current,
			occasions: current.occasions.includes(occasion)
				? current.occasions.filter(item => item !== occasion)
				: [...current.occasions, occasion],
		}))
	}

	const handleOnSaveClick = (event: React.FormEvent) => {
		event.preventDefault()

		const category = categoryData.find(item => item.id === form.category_id)

		const payload = {
			name: form.name,
			description: form.description,
			category_id: form.category_id || null,
			category_name: category?.name ?? null,
			price: Number(form.price) || 0,
			stock: Number(form.stock) || 0,
			images: form.images,
			materials: form.materials,
			occasions: form.occasions,
			is_new: form.is_new,
			is_best_seller: form.is_best_seller,
			active: form.active,
		}

		if (editId) {
			dispatch(requestUpdateProduct(editId, payload))
		} else {
			dispatch(
				requestAddProduct({
					...payload,
					product_no: null,
					product_sequence: null,
					rating: 0,
					reviews: 0,
					createdBy: null,
					createdAt: null,
					updatedBy: null,
					updatedAt: null,
				})
			)
		}

		setShowForm(false)
	}

	return (
		<Stock
			products={productData}
			productDataloading={productDataloading}
			categoryData={categoryData}
			materialOptions={materialOptions}
			occasionOptions={occasionOptions}
			showForm={showForm}
			editId={editId}
			form={form}
			saving={addProductLoading || updateProductLoading}
			convertingImages={convertingImages}
			onAddClick={handleOnAddClick}
			onEditClick={handleOnEditClick}
			onRemoveClick={handleOnRemoveClick}
			onFormChange={handleOnFormChange}
			onImageFilesSelected={handleOnImageFilesSelected}
			onRemoveImageClick={handleOnRemoveImageClick}
			onMaterialToggle={handleOnMaterialToggle}
			onOccasionToggle={handleOnOccasionToggle}
			onCloseFormClick={handleOnCloseFormClick}
			onSaveClick={handleOnSaveClick}
		/>
	)
}

export default AdminStockContainer
