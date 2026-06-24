function DataStat({ label, value }: { label: string; value: string }) {
	return (
		<div className="border border-border bg-card p-5 text-center">
			<p className="font-serif text-2xl text-primary">{value}</p>
			<p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
		</div>
	)
}

export default DataStat
