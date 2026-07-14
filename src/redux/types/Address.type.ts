export interface AddressItem {
	id: string
	user_id: string
	label: string
	full_name: string
	phone_number: string
	line1: string
	city: string
	province: string
	postal_code: string
	is_default: boolean
	createdBy: string | null
	createdAt: Date | null
	updatedBy: string | null
	updatedAt: Date | null
}

export interface AddressState {
	addressData: AddressItem[]
	addressDataLoading: boolean
	addAddressLoading: boolean
	updateAddressLoading: boolean
	removeAddressLoading: boolean
}
