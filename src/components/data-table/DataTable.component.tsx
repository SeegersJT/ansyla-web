import React from 'react'

export type ColumnAlign = 'left' | 'center' | 'right'

export interface Column<T> {
	key: string
	header: string
	align?: ColumnAlign
	render?: (row: T) => React.ReactNode
	accessor?: (row: T) => React.ReactNode
}

export interface DataTableProps<T extends { id: string | number }> {
	title?: string
	columns: Column<T>[]
	data: T[]
	onRowClick?: (row: T) => void
	emptyMessage?: string
	className?: string
}

const alignClass: Record<ColumnAlign, string> = {
	left: 'text-left',
	center: 'text-center',
	right: 'text-right',
}

function renderCell<T>(column: Column<T>, row: T): React.ReactNode {
	if (column.render) return column.render(row)
	if (column.accessor) return column.accessor(row)
	return (row as Record<string, unknown>)[column.key] as React.ReactNode
}

export function DataTable<T extends { id: string | number }>({
	title,
	columns,
	data,
	onRowClick,
	emptyMessage = 'No records found.',
	className = '',
}: DataTableProps<T>) {
	const actionsColumn = columns.find(col => col.key === 'actions')
	const displayColumns = columns.filter(col => col.key !== 'actions')

	return (
		<div className={`w-full min-w-0 space-y-4 ${className}`}>
			{title && <h2 className="font-serif text-2xl">{title}</h2>}

			{data.length === 0 ? (
				<div className="border border-border p-6 text-center text-muted-foreground">
					{emptyMessage}
				</div>
			) : (
				<>
					{/* Card layout — phones and small tablets */}
					<div className="flex flex-col gap-3 sm:hidden">
						{data.map(row => (
							<div
								key={row.id}
								onClick={() => onRowClick?.(row)}
								className={`space-y-2.5 border border-border bg-card p-4 text-sm ${
									onRowClick ? 'cursor-pointer hover:border-primary/50' : ''
								}`}
							>
								{displayColumns.map(col => (
									<div
										key={col.key}
										className="flex items-start justify-between gap-3"
									>
										<span className="shrink-0 text-xs uppercase tracking-wider text-muted-foreground">
											{col.header}
										</span>
										<span className="text-right">{renderCell(col, row)}</span>
									</div>
								))}
								{actionsColumn && (
									<div className="flex justify-end gap-2 border-t border-border pt-2.5">
										{renderCell(actionsColumn, row)}
									</div>
								)}
							</div>
						))}
					</div>

					{/* Table layout — sm and up */}
					<div className="hidden overflow-x-auto border border-border sm:block">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-b border-border bg-card text-xs uppercase tracking-wider text-muted-foreground">
									{columns.map(col => (
										<th
											key={col.key}
											className={`p-3 ${alignClass[col.align ?? 'left']}`}
										>
											{col.header}
										</th>
									))}
								</tr>
							</thead>

							<tbody>
								{data.map(row => (
									<tr
										key={row.id}
										className={[
											'border-b border-border last:border-0',
											onRowClick
												? 'cursor-pointer hover:bg-card/60 transition-colors'
												: '',
										].join(' ')}
										onClick={() => onRowClick?.(row)}
									>
										{columns.map(col => (
											<td
												key={col.key}
												className={`p-3 ${alignClass[col.align ?? 'left']}`}
											>
												{renderCell(col, row)}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</>
			)}
		</div>
	)
}

export default DataTable
