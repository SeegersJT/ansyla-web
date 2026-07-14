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

export interface SettingsBankDetails {
	bank_name: string | null
	account_holder: string | null
	account_number: string | null
	branch_code: string | null
	account_type: string | null
}

export interface Settings {
	id: string
	currency: string
	currency_symbol: string | null
	prefixes: SettingsPrefix
	sequences: SettingsSequence[]
	statuses: OrderStatus[]
	bank_details: SettingsBankDetails
	store_name: string | null
	shipping_cost: number
	free_shipping_threshold: number
}

export interface SettingsState {
	settingsData: Settings[]
	settingsDataLoading: boolean
	updateSettingsLoading: boolean
}
