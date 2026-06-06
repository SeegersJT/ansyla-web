import type { ProductItem } from "./Product.type"

export interface CartItem {
    product: ProductItem
    quantity: number
}

export interface CartState {
    cartData: CartItem[]
    cartDataCount: number
    cartDataSubtotal: number
    isCartDrawerOpen: boolean
    cartDataLoading: boolean
}
