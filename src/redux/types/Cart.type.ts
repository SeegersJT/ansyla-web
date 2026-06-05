import type { ProductItem } from "./Product.type"

export interface CartItem {
    product: ProductItem
    quantity: number
}

export interface CartState {
    cartData: CartItem[]
    cartDataLoading: boolean
}
