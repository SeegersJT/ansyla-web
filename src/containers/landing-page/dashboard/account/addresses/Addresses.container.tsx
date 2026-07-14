import Addresses from '@/components/landing-page/dashboard/account/addresses/Addressess.component'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import {
	requestAddAddress,
	requestRemoveAddress,
	requestUpdateAddress,
} from '@/redux/actions/Address.action'
import type { AddressItem } from '@/redux/types/Address.type'
import { useState } from 'react'
import type React from 'react'

export const emptyAddressForm = {
	label: '',
	full_name: '',
	phone_number: '',
	line1: '',
	city: '',
	province: '',
	postal_code: '',
	is_default: false,
}

export type AddressForm = typeof emptyAddressForm

function AddressesContainer() {
	const dispatch = useAppDispatch()

	const { addressData, addAddressLoading, updateAddressLoading } = useAppSelector(
		state => state.address
	)

	const [editId, setEditId] = useState<string | 'new' | null>(null)
	const [form, setForm] = useState<AddressForm>(emptyAddressForm)

	const handleOnAddClick = () => {
		setForm(emptyAddressForm)
		setEditId('new')
	}

	const handleOnEditClick = (address: AddressItem) => {
		setForm({
			label: address.label,
			full_name: address.full_name,
			phone_number: address.phone_number,
			line1: address.line1,
			city: address.city,
			province: address.province,
			postal_code: address.postal_code,
			is_default: address.is_default,
		})
		setEditId(address.id)
	}

	const handleOnFormChange = (value: Partial<AddressForm>) => {
		setForm(current => ({ ...current, ...value }))
	}

	const handleOnCancelClick = () => {
		setEditId(null)
	}

	const handleOnRemoveClick = (addressId: string) => {
		dispatch(requestRemoveAddress(addressId))
	}

	const handleOnSaveClick = (event: React.FormEvent) => {
		event.preventDefault()

		if (editId === 'new') {
			dispatch(
				requestAddAddress({
					...form,
					createdBy: null,
					createdAt: null,
					updatedBy: null,
					updatedAt: null,
				})
			)
		} else if (editId) {
			dispatch(requestUpdateAddress(editId, form))
		}

		setEditId(null)
	}

	return (
		<Addresses
			addresses={addressData}
			editId={editId}
			form={form}
			saving={addAddressLoading || updateAddressLoading}
			onAddClick={handleOnAddClick}
			onEditClick={handleOnEditClick}
			onCancelClick={handleOnCancelClick}
			onRemoveClick={handleOnRemoveClick}
			onFormChange={handleOnFormChange}
			onSaveClick={handleOnSaveClick}
		/>
	)
}

export default AddressesContainer
