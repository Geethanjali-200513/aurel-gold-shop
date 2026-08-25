import { Star } from "lucide-react";

export function Stars({
  rating,
  reviews,
  className = "",
}: {
  rating: number;
  reviews?: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={
              i <= Math.round(rating)
                ? "size-3.5 fill-primary text-primary"
                : "size-3.5 text-border"
            }
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">
        {rating.toFixed(1)}
        {reviews !== undefined ? ` (${reviews})` : ""}
      </span>
    </div>
  );
}
