export interface CategoryItem {
	id: string
	category_no: string | null
	category_sequence: number | null
	name: string | undefined
	description: string | null
	image: string | undefined
	createdBy: string | null
	created_on: Date | null
	updatedBy: string | null
	updated_on: Date | null
}

export interface CategoryState {
	categoryData: CategoryItem[]
	categoryDataLoading: boolean
	addCategoryLoading: boolean
	updateCategoryLoading: boolean
	removeCategoryLoading: boolean
}
