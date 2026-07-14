import { Star } from 'lucide-react'
import { useState } from 'react'

function RatingInput({ value, onChange }: { value: number; onChange: (rating: number) => void }) {
	const [hovered, setHovered] = useState<number | null>(null)

	return (
		<div className="flex items-center gap-1" onMouseLeave={() => setHovered(null)}>
			{Array.from({ length: 5 }).map((_, i) => {
				const starValue = i + 1
				const filled = (hovered ?? value) >= starValue

				return (
					<button
						key={starValue}
						type="button"
						onClick={() => onChange(starValue)}
						onMouseEnter={() => setHovered(starValue)}
						aria-label={`Rate ${starValue} star${starValue > 1 ? 's' : ''}`}
					>
						<Star
							className={`h-6 w-6 transition-colors  ${
								filled ? 'fill-primary text-primary' : 'text-muted-foreground/40'
							}`}
						/>
					</button>
				)
			})}
		</div>
	)
}

export default RatingInput
