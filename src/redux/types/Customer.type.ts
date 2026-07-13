export interface CustomerItem {
	id: string
	name: string
	email: string
	orders: number
	spent: number
	tier: string
}

export interface CustomerState {
	customerData: CustomerItem[]
	customerDataLoading: boolean
}
