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

export function DataTable<T extends { id: string | number }>({
    title,
    columns,
    data,
    onRowClick,
    emptyMessage = 'No records found.',
    className = '',
}: DataTableProps<T>) {
    return (
        <div className={`space-y-4 ${className}`}>
            {title && (
                <h2 className="font-serif text-2xl">{title}</h2>
            )}

            <div className="overflow-x-auto border border-border">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border bg-card text-xs uppercase tracking-wider text-muted-foreground">
                            {columns.map((col) => (
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
                        {data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="p-6 text-center text-muted-foreground"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((row) => (
                                <tr
                                    key={row.id}
                                    className={[
                                        'border-b border-border last:border-0',
                                        onRowClick ? 'cursor-pointer hover:bg-card/60 transition-colors' : '',
                                    ].join(' ')}
                                    onClick={() => onRowClick?.(row)}
                                >
                                    {columns.map((col) => (
                                        <td
                                            key={col.key}
                                            className={`p-3 ${alignClass[col.align ?? 'left']}`}
                                        >
                                            {col.render
                                                ? col.render(row)
                                                : col.accessor
                                                    ? col.accessor(row)
                                                    : (row as Record<string, unknown>)[col.key] as React.ReactNode}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DataTable