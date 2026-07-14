import Checkout from '@/components/landing-page/checkout/Checkout.component'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { clearLastPlacedOrder, requestCreateOrder } from '@/redux/actions/Order.action'
import type { OrderShippingAddress } from '@/redux/types/Order.type'
import { useEffect, useState } from 'react'
import type React from 'react'

export const emptyCheckoutForm = {
	fullName: '',
	email: '',
	phone: '',
	line1: '',
	city: '',
	province: 'Gauteng',
	postalCode: '',
}

export type CheckoutForm = typeof emptyCheckoutForm

function CheckoutContainer() {
	const dispatch = useAppDispatch()

	const { cartData, cartDataSubtotal } = useAppSelector(state => state.cart)
	const { productData } = useAppSelector(state => state.product)
	const { settingsData } = useAppSelector(state => state.settings)
	const { couponItem, isCouponApplied } = useAppSelector(state => state.coupon)
	const { user } = useAppSelector(state => state.auth)
	const { addressData } = useAppSelector(state => state.address)
	const { createOrderLoading, lastPlacedOrder } = useAppSelector(state => state.order)

	const settings = settingsData[0]

	const [form, setForm] = useState<CheckoutForm>(emptyCheckoutForm)
	const [selectedAddressId, setSelectedAddressId] = useState<string>('new')
	const [saveAddress, setSaveAddress] = useState<boolean>(true)
	const [setAsDefaultAddress, setSetAsDefaultAddress] = useState<boolean>(false)
	const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard')
	const [paymentMethod, setPaymentMethod] = useState<string>('Manual EFT')

	useEffect(() => {
		if (!user) return

		setForm(current => ({
			...current,
			fullName: user.displayName ?? current.fullName,
			email: user.email ?? current.email,
		}))
	}, [user])

	useEffect(() => {
		const defaultAddress = addressData.find(address => address.is_default)
		if (!defaultAddress) return

		setSelectedAddressId(defaultAddress.id)
		setForm(current => ({
			...current,
			fullName: defaultAddress.full_name,
			phone: defaultAddress.phone_number,
			line1: defaultAddress.line1,
			city: defaultAddress.city,
			province: defaultAddress.province,
			postalCode: defaultAddress.postal_code,
		}))
	}, [addressData])

	useEffect(() => {
		return () => {
			dispatch(clearLastPlacedOrder())
		}
	}, [dispatch])

	const handleOnFormChange = (value: Partial<CheckoutForm>) => {
		setForm(current => ({ ...current, ...value }))
	}

	const handleOnSelectedAddressChange = (addressId: string) => {
		setSelectedAddressId(addressId)

		if (addressId === 'new') {
			setForm(current => ({
				...current,
				line1: '',
				city: '',
				province: 'Gauteng',
				postalCode: '',
			}))
			return
		}

		const address = addressData.find(a => a.id === addressId)
		if (!address) return

		setForm(current => ({
			...current,
			fullName: address.full_name,
			phone: address.phone_number,
			line1: address.line1,
			city: address.city,
			province: address.province,
			postalCode: address.postal_code,
		}))
	}

	const handleOnSaveAddressChange = (value: boolean) => {
		setSaveAddress(value)
	}

	const handleOnSetAsDefaultAddressChange = (value: boolean) => {
		setSetAsDefaultAddress(value)
	}

	const handleOnDeliveryMethodChange = (value: 'standard' | 'express') => {
		setDeliveryMethod(value)
	}

	const handleOnPaymentMethodChange = (value: string) => {
		setPaymentMethod(value)
	}

	const freeShipping = cartDataSubtotal >= (settings?.free_shipping_threshold ?? Infinity)
	const baseShippingCost = settings?.shipping_cost ?? 0
	const shippingCost = freeShipping
		? 0
		: deliveryMethod === 'express'
			? baseShippingCost + 100
			: baseShippingCost
	const discount = isCouponApplied ? (cartDataSubtotal * couponItem.discount_percentage) / 100 : 0
	const total = cartDataSubtotal - discount + shippingCost

	const outOfStockItems = cartData.filter(cartItem => {
		const product = productData.find(p => p.id === cartItem.product.id)
		return !product || (product.stock ?? 0) < cartItem.quantity
	})

	const handleOnPlaceOrderClick = (event: React.FormEvent) => {
		event.preventDefault()

		if (outOfStockItems.length > 0) return

		const shippingAddress: OrderShippingAddress = {
			full_name: form.fullName,
			phone_number: form.phone,
			line1: form.line1,
			city: form.city,
			province: form.province,
			postal_code: form.postalCode,
		}

		dispatch(
			requestCreateOrder({
				customerName: form.fullName,
				customerEmail: form.email,
				shippingAddress,
				deliveryMethod,
				paymentMethod,
				saveAddress: !!user && saveAddress && selectedAddressId === 'new',
				setAsDefaultAddress,
			})
		)
	}

	return (
		<Checkout
			cartData={cartData}
			isLoggedIn={!!user}
			savedAddresses={addressData}
			selectedAddressId={selectedAddressId}
			form={form}
			saveAddress={saveAddress}
			setAsDefaultAddress={setAsDefaultAddress}
			deliveryMethod={deliveryMethod}
			paymentMethod={paymentMethod}
			bankDetails={settings?.bank_details}
			subtotal={cartDataSubtotal}
			shippingCost={shippingCost}
			freeShipping={freeShipping}
			discount={discount}
			isCouponApplied={isCouponApplied}
			total={total}
			currency={settings?.currency}
			outOfStockItems={outOfStockItems}
			placingOrder={createOrderLoading}
			placedOrder={lastPlacedOrder}
			onFormChange={handleOnFormChange}
			onSelectedAddressChange={handleOnSelectedAddressChange}
			onSaveAddressChange={handleOnSaveAddressChange}
			onSetAsDefaultAddressChange={handleOnSetAsDefaultAddressChange}
			onDeliveryMethodChange={handleOnDeliveryMethodChange}
			onPaymentMethodChange={handleOnPaymentMethodChange}
			onPlaceOrderClick={handleOnPlaceOrderClick}
		/>
	)
}

export default CheckoutContainer
