import Categories from '@/components/landing-page/dashboard/admin/categories/Categories.component'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import {
	requestAddCategory,
	requestCategoryItems,
	requestRemoveCategory,
	requestUpdateCategory,
} from '@/redux/actions/Category.action'
import type { CategoryItem } from '@/redux/types/Category.type'
import { Utils } from '@/utils/Utils'
import { useEffect, useState } from 'react'
import type React from 'react'

export const emptyCategoryForm = {
	name: '',
	description: '',
	image: '',
	category_sequence: '',
}

export type CategoryForm = typeof emptyCategoryForm

function AdminCategoriesContainer() {
	const dispatch = useAppDispatch()

	const { categoryData, addCategoryLoading, updateCategoryLoading } = useAppSelector(
		state => state.category
	)

	const [showForm, setShowForm] = useState(false)
	const [editId, setEditId] = useState<string | null>(null)
	const [form, setForm] = useState<CategoryForm>(emptyCategoryForm)
	const [convertingImage, setConvertingImage] = useState(false)

	useEffect(() => {
		dispatch(requestCategoryItems())
	}, [dispatch])

	const handleOnAddClick = () => {
		setEditId(null)
		setForm(emptyCategoryForm)
		setShowForm(true)
	}

	const handleOnEditClick = (category: CategoryItem) => {
		setEditId(category.id)
		setForm({
			name: category.name ?? '',
			description: category.description ?? '',
			image: category.image ?? '',
			category_sequence: String(category.category_sequence ?? 0),
		})
		setShowForm(true)
	}

	const handleOnFormChange = (value: Partial<CategoryForm>) => {
		setForm(current => ({ ...current, ...value }))
	}

	const handleOnCloseFormClick = () => {
		setShowForm(false)
	}

	const handleOnRemoveClick = (categoryId: string) => {
		dispatch(requestRemoveCategory(categoryId))
	}

	const handleOnImageFileSelected = async (files: FileList | null) => {
		const file = files?.[0]
		if (!file) return

		setConvertingImage(true)

		try {
			const base64 = await Utils.fileToBase64(file)
			setForm(current => ({ ...current, image: base64 }))
		} finally {
			setConvertingImage(false)
		}
	}

	const handleOnSaveClick = (event: React.FormEvent) => {
		event.preventDefault()

		const payload = {
			name: form.name,
			description: form.description,
			image: form.image,
			category_sequence: Number(form.category_sequence) || 0,
		}

		if (editId) {
			dispatch(requestUpdateCategory(editId, payload))
		} else {
			dispatch(
				requestAddCategory({
					...payload,
					createdBy: null,
					created_on: null,
					updatedBy: null,
					updated_on: null,
				})
			)
		}

		setShowForm(false)
	}

	return (
		<Categories
			categories={categoryData}
			showForm={showForm}
			editId={editId}
			form={form}
			saving={addCategoryLoading || updateCategoryLoading}
			convertingImage={convertingImage}
			onAddClick={handleOnAddClick}
			onEditClick={handleOnEditClick}
			onRemoveClick={handleOnRemoveClick}
			onFormChange={handleOnFormChange}
			onImageFileSelected={handleOnImageFileSelected}
			onCloseFormClick={handleOnCloseFormClick}
			onSaveClick={handleOnSaveClick}
		/>
	)
}

export default AdminCategoriesContainer
