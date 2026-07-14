import SettingsComponent from '@/components/landing-page/dashboard/admin/settings/Settings.component'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { requestSettings, requestUpdateSettings } from '@/redux/actions/Settings.action'
import type {
	OrderStatus,
	Settings,
	SettingsBankDetails,
	SettingsPrefix,
	SettingsSequence,
} from '@/redux/types/Settings.type'
import { useEffect, useState } from 'react'
import type React from 'react'

export interface SettingsForm {
	store_name: string
	currency: string
	currency_symbol: string
	shipping_cost: string
	free_shipping_threshold: string
	prefixes: SettingsPrefix
	sequences: SettingsSequence
	statuses: OrderStatus[]
	bank_details: SettingsBankDetails
}

const emptySettingsForm: SettingsForm = {
	store_name: '',
	currency: 'ZAR',
	currency_symbol: 'R',
	shipping_cost: '0',
	free_shipping_threshold: '0',
	prefixes: { category_prefix: '', order_prefix: '', product_prefix: '', user_prefix: '' },
	sequences: { category_no: 0, order_no: 0, product_no: 0, user_no: 0 },
	statuses: [],
	bank_details: {
		bank_name: '',
		account_holder: '',
		account_number: '',
		branch_code: '',
		account_type: '',
	},
}

function AdminSettingsContainer() {
	const dispatch = useAppDispatch()

	const { settingsData, updateSettingsLoading } = useAppSelector(state => state.settings)

	const [form, setForm] = useState<SettingsForm>(emptySettingsForm)

	useEffect(() => {
		dispatch(requestSettings())
	}, [dispatch])

	useEffect(() => {
		const settings = settingsData[0]
		if (!settings) return

		setForm({
			store_name: settings.store_name ?? '',
			currency: settings.currency ?? 'ZAR',
			currency_symbol: settings.currency_symbol ?? '',
			shipping_cost: String(settings.shipping_cost ?? 0),
			free_shipping_threshold: String(settings.free_shipping_threshold ?? 0),
			prefixes: settings.prefixes ?? emptySettingsForm.prefixes,
			sequences: settings.sequences?.[0] ?? emptySettingsForm.sequences,
			statuses: settings.statuses ?? [],
			bank_details: settings.bank_details ?? emptySettingsForm.bank_details,
		})
	}, [settingsData])

	const handleOnFormChange = (value: Partial<SettingsForm>) => {
		setForm(current => ({ ...current, ...value }))
	}

	const handleOnPrefixChange = (key: keyof SettingsPrefix, value: string) => {
		setForm(current => ({ ...current, prefixes: { ...current.prefixes, [key]: value } }))
	}

	const handleOnSequenceChange = (key: keyof SettingsSequence, value: string) => {
		setForm(current => ({
			...current,
			sequences: { ...current.sequences, [key]: Number(value) || 0 },
		}))
	}

	const handleOnBankDetailsChange = (key: keyof SettingsBankDetails, value: string) => {
		setForm(current => ({
			...current,
			bank_details: { ...current.bank_details, [key]: value },
		}))
	}

	const handleOnStatusChange = (index: number, value: Partial<OrderStatus>) => {
		setForm(current => ({
			...current,
			statuses: current.statuses.map((status, i) =>
				i === index ? { ...status, ...value } : status
			),
		}))
	}

	const handleOnAddStatusClick = () => {
		setForm(current => ({
			...current,
			statuses: [...current.statuses, { status: '', status_no: current.statuses.length + 1 }],
		}))
	}

	const handleOnRemoveStatusClick = (index: number) => {
		setForm(current => ({
			...current,
			statuses: current.statuses.filter((_, i) => i !== index),
		}))
	}

	const handleOnSaveClick = (event: React.FormEvent) => {
		event.preventDefault()

		const settingsId = settingsData[0]?.id
		if (!settingsId) return

		const payload: Partial<Settings> = {
			store_name: form.store_name,
			currency: form.currency,
			currency_symbol: form.currency_symbol,
			shipping_cost: Number(form.shipping_cost) || 0,
			free_shipping_threshold: Number(form.free_shipping_threshold) || 0,
			prefixes: form.prefixes,
			sequences: [form.sequences],
			statuses: form.statuses,
			bank_details: form.bank_details,
		}

		dispatch(requestUpdateSettings(settingsId, payload))
	}

	return (
		<SettingsComponent
			form={form}
			saving={updateSettingsLoading}
			onFormChange={handleOnFormChange}
			onPrefixChange={handleOnPrefixChange}
			onSequenceChange={handleOnSequenceChange}
			onBankDetailsChange={handleOnBankDetailsChange}
			onStatusChange={handleOnStatusChange}
			onAddStatusClick={handleOnAddStatusClick}
			onRemoveStatusClick={handleOnRemoveStatusClick}
			onSaveClick={handleOnSaveClick}
		/>
	)
}

export default AdminSettingsContainer
