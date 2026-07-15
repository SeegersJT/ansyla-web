export interface CustomerItem {
	id: string
	name: string
	email: string
	phone: string
	orders: number
	spent: number
	tier: string
	points: number
}

export interface CustomerState {
	customerData: CustomerItem[]
	customerDataLoading: boolean
}
