export interface ProductMaterialState {
    gold: boolean
    stainless_Steel: boolean
}

export interface ProductImagesItem {
    url: string
}

export interface ProductItem {
    id: string,
    product_no: string | null,
    product_sequence: number | null,
    name: string | undefined,
    description: string | null,
    category_id: string | null,
    category_name: string | null,
    materials: ProductMaterialState | null,
    images: ProductImagesItem[],
    price: number,
    stock: number | null,
    rating: number,
    reviews: number,
    is_best_seller: boolean,
    is_new: boolean,
    active: boolean,
    created_by: string | null,
    created_at: Date | null,
    updated_by: string | null,
    updated_at: Date | null,
}

export interface ProductState {
    productData: ProductItem[],
    selectedProduct: ProductItem | null,
    productDataloading: boolean,
    selectedProductLoading: boolean
}
