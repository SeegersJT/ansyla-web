import SettingsComponent from '@/components/landing-page/dashboard/admin/settings/Settings.component'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { requestSettings, requestUpdateSettings } from '@/redux/actions/Settings.action'
import type {
	LoyaltyTier,
	MaterialOption,
	OccasionOption,
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
	points_per_100_spent: string
	prefixes: SettingsPrefix
	sequences: SettingsSequence
	statuses: OrderStatus[]
	materials: MaterialOption[]
	occasions: OccasionOption[]
	loyaltyTiers: LoyaltyTier[]
	bank_details: SettingsBankDetails
	rand_per_point: string
	min_points_redemption: string
}

const emptySettingsForm: SettingsForm = {
	store_name: '',
	currency: 'ZAR',
	currency_symbol: 'R',
	shipping_cost: '0',
	free_shipping_threshold: '0',
	points_per_100_spent: '0',
	prefixes: { category_prefix: '', order_prefix: '', product_prefix: '', user_prefix: '' },
	sequences: { category_no: 0, order_no: 0, product_no: 0, user_no: 0 },
	statuses: [],
	materials: [],
	occasions: [],
	loyaltyTiers: [],
	bank_details: {
		bank_name: '',
		account_holder: '',
		account_number: '',
		branch_code: '',
		account_type: '',
	},
	rand_per_point: '0.50',
	min_points_redemption: '0',
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
			points_per_100_spent: String(settings.points_per_100_spent ?? 0),
			prefixes: settings.prefixes ?? emptySettingsForm.prefixes,
			sequences: settings.sequences?.[0] ?? emptySettingsForm.sequences,
			statuses: settings.statuses ?? [],
			materials: settings.materials ?? [],
			occasions: settings.occasions ?? [],
			loyaltyTiers: settings.loyaltyTiers ?? [],
			bank_details: settings.bank_details ?? emptySettingsForm.bank_details,
			rand_per_point: String(settings.rand_per_point ?? 0),
			min_points_redemption: String(settings.min_points_redemption ?? 0),
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

	const handleOnMaterialChange = (index: number, value: Partial<MaterialOption>) => {
		setForm(current => ({
			...current,
			materials: current.materials.map((material, i) =>
				i === index ? { ...material, ...value } : material
			),
		}))
	}

	const handleOnAddMaterialClick = () => {
		setForm(current => ({
			...current,
			materials: [
				...current.materials,
				{ material: '', material_no: current.materials.length + 1 },
			],
		}))
	}

	const handleOnRemoveMaterialClick = (index: number) => {
		setForm(current => ({
			...current,
			materials: current.materials.filter((_, i) => i !== index),
		}))
	}

	const handleOnOccasionChange = (index: number, value: Partial<OccasionOption>) => {
		setForm(current => ({
			...current,
			occasions: current.occasions.map((occasion, i) =>
				i === index ? { ...occasion, ...value } : occasion
			),
		}))
	}

	const handleOnAddOccasionClick = () => {
		setForm(current => ({
			...current,
			occasions: [
				...current.occasions,
				{ occasion: '', occasion_no: current.occasions.length + 1 },
			],
		}))
	}

	const handleOnRemoveOccasionClick = (index: number) => {
		setForm(current => ({
			...current,
			occasions: current.occasions.filter((_, i) => i !== index),
		}))
	}

	const handleOnLoyaltyTierChange = (index: number, value: Partial<LoyaltyTier>) => {
		setForm(current => ({
			...current,
			loyaltyTiers: current.loyaltyTiers.map((tier, i) =>
				i === index ? { ...tier, ...value } : tier
			),
		}))
	}

	const handleOnAddLoyaltyTierClick = () => {
		setForm(current => ({
			...current,
			loyaltyTiers: [
				...current.loyaltyTiers,
				{ tier: '', tier_no: current.loyaltyTiers.length + 1, min_spend: 0 },
			],
		}))
	}

	const handleOnRemoveLoyaltyTierClick = (index: number) => {
		setForm(current => ({
			...current,
			loyaltyTiers: current.loyaltyTiers.filter((_, i) => i !== index),
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
			points_per_100_spent: Number(form.points_per_100_spent) || 0,
			prefixes: form.prefixes,
			sequences: [form.sequences],
			statuses: form.statuses,
			materials: form.materials,
			occasions: form.occasions,
			loyaltyTiers: form.loyaltyTiers,
			bank_details: form.bank_details,
			rand_per_point: Number(form.rand_per_point) || 0,
			min_points_redemption: Number(form.min_points_redemption) || 0,
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
			onMaterialChange={handleOnMaterialChange}
			onAddMaterialClick={handleOnAddMaterialClick}
			onRemoveMaterialClick={handleOnRemoveMaterialClick}
			onOccasionChange={handleOnOccasionChange}
			onAddOccasionClick={handleOnAddOccasionClick}
			onRemoveOccasionClick={handleOnRemoveOccasionClick}
			onLoyaltyTierChange={handleOnLoyaltyTierChange}
			onAddLoyaltyTierClick={handleOnAddLoyaltyTierClick}
			onRemoveLoyaltyTierClick={handleOnRemoveLoyaltyTierClick}
			onSaveClick={handleOnSaveClick}
		/>
	)
}

export default AdminSettingsContainer
