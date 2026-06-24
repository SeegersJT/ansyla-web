function DataRow({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex justify-between border-b border-border pb-3 last:border-0 last:pb-0">
			<span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
			<span className="text-sm">{value}</span>
		</div>
	)
}

export default DataRow
