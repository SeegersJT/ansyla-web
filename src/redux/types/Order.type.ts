export type OrderStatusValue = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'

export interface OrderLineItem {
	product_id: string
	name: string
	price: number
	quantity: number
}

export interface OrderItem {
	id: string
	order_no: string | null
	order_sequence: number | null
	customer_id: string | null
	customer_name: string | null
	customer_email: string | null
	items: OrderLineItem[]
	total: number
	status: string
	created_by: string | null
	created_at: Date | null
	updated_by: string | null
	updated_at: Date | null
}

export const defaultOrderItem: OrderItem = {
	id: '',
	order_no: '',
	order_sequence: 0,
	customer_id: '',
	customer_name: '',
	customer_email: '',
	items: [],
	total: 0,
	status: 'Processing',
	created_by: '',
	created_at: new Date(),
	updated_by: '',
	updated_at: new Date(),
}

export interface OrderState {
	orderData: OrderItem[]
	orderDataLoading: boolean
	updateOrderStatusLoading: boolean
}
