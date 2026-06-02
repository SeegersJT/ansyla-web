export interface ProductMaterialState {
    gold: boolean
    stainless_Steel: boolean
}

export interface ProductImagesItem {
    url: string | null
}

export interface ProductItem {
    product_no: string | null
    product_sequence: number | null
    name: string | null
    description: string | null
    category: string | null
    materials: ProductMaterialState | null
    images: ProductImagesItem[]
    price: number | null
    stock: number | null
    active: boolean
    created_by: string | null
    created_at: Date | null
    updated_by: string | null
    updated_at: Date | null
}

export interface ProductState {
    product_data: ProductItem[]
    loading: boolean
}
