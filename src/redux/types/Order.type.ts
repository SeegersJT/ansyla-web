export type OrderStatusValue = string

export interface OrderLineItem {
	product_id: string
	name: string
	image: string | null
	price: number
	quantity: number
}

export interface OrderShippingAddress {
	full_name: string
	phone_number: string
	line1: string
	city: string
	province: string
	postal_code: string
}

export interface OrderItem {
	id: string
	order_no: string | null
	order_sequence: number | null
	customer_id: string | null
	customer_name: string | null
	customer_email: string | null
	items: OrderLineItem[]
	shipping_address: OrderShippingAddress
	delivery_method: 'standard' | 'express'
	payment_method: string
	payment_status: string
	payment_reference: string | null
	subtotal: number
	shipping_cost: number
	discount: number
	total: number
	status: string
	createdBy: string | null
	createdAt: Date | null
	updatedBy: string | null
	updatedAt: Date | null
}

export const defaultOrderItem: OrderItem = {
	id: '',
	order_no: '',
	order_sequence: 0,
	customer_id: '',
	customer_name: '',
	customer_email: '',
	items: [],
	shipping_address: {
		full_name: '',
		phone_number: '',
		line1: '',
		city: '',
		province: '',
		postal_code: '',
	},
	delivery_method: 'standard',
	payment_method: '',
	payment_status: 'Pending Payment',
	payment_reference: null,
	subtotal: 0,
	shipping_cost: 0,
	discount: 0,
	total: 0,
	status: 'Processing',
	createdBy: '',
	createdAt: new Date(),
	updatedBy: '',
	updatedAt: new Date(),
}

export interface OrderState {
	orderData: OrderItem[]
	orderDataLoading: boolean
	updateOrderStatusLoading: boolean
	createOrderLoading: boolean
	lastPlacedOrder: OrderItem | null
	markOrderAsPaidLoading: boolean
	myOrderData: OrderItem[]
	myOrderDataLoading: boolean
}
