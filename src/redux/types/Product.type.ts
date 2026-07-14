export interface ProductMaterialState {
	gold: boolean
	stainless_Steel: boolean
}

export const defaultMaterialItem: ProductMaterialState = {
	gold: false,
	stainless_Steel: false,
}

export interface ProductImagesItem {
	url: string
}

export interface ProductItem {
	id: string
	product_no: string | null
	product_sequence: number | null
	name: string | undefined
	description: string | null
	category_id: string | null
	category_name: string | null
	materials: ProductMaterialState | null
	images: ProductImagesItem[]
	price: number
	stock: number | null
	rating: number
	reviews: number
	is_best_seller: boolean
	is_new: boolean
	active: boolean
	createdBy: string | null
	createdAt: Date | null
	updatedBy: string | null
	updatedAt: Date | null
}

export const defaultProductItem: ProductItem = {
	id: '',
	product_no: '',
	product_sequence: 0,
	name: '',
	description: '',
	category_id: '',
	category_name: '',
	materials: defaultMaterialItem,
	images: [],
	price: 0,
	stock: 0,
	rating: 0,
	reviews: 0,
	is_best_seller: false,
	is_new: false,
	active: false,
	createdBy: '',
	createdAt: new Date(),
	updatedBy: '',
	updatedAt: new Date(),
}

export interface ProductState {
	productData: ProductItem[]
	selectedProduct: ProductItem
	productDataloading: boolean
	selectedProductLoading: boolean
	addProductLoading: boolean
	updateProductLoading: boolean
	removeProductLoading: boolean
}
