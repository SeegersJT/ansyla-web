import { Star, StarHalf } from "lucide-react";

function StarRating({
    rating,
    reviews,
    className = "",
}: {
    rating: number;
    reviews?: number;
    className?: string;
}) {
    const clampedRating = Math.min(5, Math.max(0, rating));

    const stars = Array.from({ length: 5 }).map((_, i) => {
        const full = i + 1 <= Math.floor(clampedRating);
        const half = !full && i < clampedRating && clampedRating - i >= 0.25;
        return { full, half };
    });

    return (
        <div className={`flex items-center gap-1.5 ${className}`}>
            <div className="flex items-center">
                {stars.map((star, i) => (
                    <span key={i} className="relative inline-flex h-3.5 w-3.5">
                        <Star className="absolute h-3.5 w-3.5 text-muted-foreground/40" />
                        {star.full && (
                            <Star className="absolute h-3.5 w-3.5 fill-primary text-primary" />
                        )}
                        {star.half && (
                            <StarHalf className="absolute h-3.5 w-3.5 fill-primary text-primary" />
                        )}
                    </span>
                ))}
            </div>
            <span className="text-xs text-muted-foreground">
                {clampedRating.toFixed(1)}
                {reviews !== undefined && ` (${reviews})`}
            </span>
        </div>
    );
}

export default StarRating;