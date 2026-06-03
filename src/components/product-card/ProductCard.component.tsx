import type { ProductItem } from "@/redux/types/Product.type";
import { Utils } from "@/utils/Utils";
import { Eye, ShoppingBag } from "lucide-react";
import { Link } from "react-router";

function ProductCard({
    currency,
    product
}: {
    currency: string
    product: ProductItem
}) {
    return (
        <div className="group relative flex flex-col">
            <div className="relative aspect-square overflow-hidden rounded-sm border border-border bg-card">
                {/* <Link to="/product/$id" params={{ id: product?.id }}>
                    <img
                        src={product?.images[0].url}
                        alt={product?.name}
                        loading="lazy"
                        width={800}
                        height={800}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                </Link> */}

                <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                    {product?.is_new && (
                        <span className="bg-gradient-gold px-2.5 py-1 text-[10px] font-medium uppercase tracking-luxe text-primary-foreground">
                            New
                        </span>
                    )}
                    {product?.is_best_seller && (
                        <span className="border border-primary/60 bg-background/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-luxe text-primary backdrop-blur">
                            Best Seller
                        </span>
                    )}
                </div>

                <div className="absolute inset-x-3 bottom-3 flex translate-y-3 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <button
                        // onClick={() => add(product)}
                        className="flex flex-1 items-center justify-center gap-2 bg-gradient-gold py-2.5 text-xs font-medium uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90"
                    >
                        <ShoppingBag className="h-3.5 w-3.5" /> Add
                    </button>
                    <Link
                        to="/product/$id"
                        // params={{ id: product?.id }}
                        className="flex items-center justify-center border border-primary/50 bg-background/70 px-3 text-primary backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground"
                        aria-label="Quick view"
                    >
                        <Eye className="h-4 w-4" />
                    </Link>
                </div>
            </div>

            <div className="mt-4 space-y-1.5">
                <p className="text-[11px] uppercase tracking-luxe text-primary/80">
                    {product?.category}
                </p>
                <Link
                    to="/product/$id"
                    // params={{ id: product?.id }}
                    className="block font-serif text-lg leading-tight transition-colors hover:text-primary"
                >
                    {product?.name}
                </Link>
                {/* <StarRating rating={product?.rating} reviews={product?.reviews} /> */}
                <p className="pt-0.5 text-base text-foreground">{Utils.formatPrice(product?.price, currency)}</p>
            </div>
        </div>
    );
}

export default ProductCard;