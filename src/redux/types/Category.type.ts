
export interface CategoryItem {
    category_no: string | null
    category_sequence: number | null
    name: string | null
    description: string | null
    created_by: string | null
    created_on: Date | null
    updated_by: string | null
    updated_on: Date | null
}

export interface CategoryState {
    category_data: CategoryItem[]
    loading: boolean
}
