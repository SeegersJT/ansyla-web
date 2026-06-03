export interface SettingsPrefix {
    category_prefix: string | null
    order_prefix: string | null
    product_prefix: string | null
    user_prefix: string | null
}

export interface SettingsSequence {
    category_no: number | null
    order_no: number | null
    product_no: number | null
    user_no: number | null
}

export interface OrderStatus {
    status: string | null
    status_no: number | null
}

export interface Settings {
    currency: string
    currency_symbol: string | null
    prefixes: SettingsPrefix
    sequences: SettingsSequence[]
    statuses: OrderStatus[]
    store_name: string | null
}

export interface SettingsState {
    settings_data: Settings[]
    loading: boolean
}