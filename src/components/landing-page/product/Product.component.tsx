import ProductCard from "@/components/product-card/ProductCard.component";
import StarRating from "@/components/star-rating/StarRating.component";
import { colorMap, iconMap } from "@/containers/landing-page/product/Product.helper";
import type { ProductItem } from "@/redux/types/Product.type";
import type { Settings } from "@/redux/types/Settings.type";
import { Utils } from "@/utils/Utils";
import type { StockAvailabilityItem } from "@/utils/Utils.type";
import { Heart, Minus, Plus, Ruler, ShieldCheck, Truck } from "lucide-react";
import { Link } from "react-router";

function Product({
    product,
    zoom,
    settings,
    stockAvailibity,
    selectedQuantity,
    addedToWishList,
    relatedProducts,
    onZoomChange,
    onQuantityChange,
    onAddToWishlistClick,
    onAddToCartClick
}: {
    product: ProductItem,
    zoom: boolean,
    settings: Settings,
    stockAvailibity: StockAvailabilityItem,
    selectedQuantity: number,
    addedToWishList: boolean,
    relatedProducts: ProductItem[]
    onZoomChange: (value: boolean) => void,
    onQuantityChange: (quantity: number) => void,
    onAddToWishlistClick: () => void,
    onAddToCartClick: (product: ProductItem, selectedQuantity: number) => void
}) {
    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <nav className="mb-8 text-xs uppercase tracking-wider text-muted-foreground">
                <Link to="/" className="hover:text-primary">Home</Link>
                {" / "}
                <Link to="/shop" className="hover:text-primary">Shop</Link>
                {" / "}
                <span className="text-foreground">{product?.name}</span>
            </nav>

            <div className="grid gap-12 lg:grid-cols-2">
                <div
                    className="relative aspect-square overflow-hidden rounded-sm border border-border bg-card"
                    onMouseEnter={() => onZoomChange(true)}
                    onMouseLeave={() => onZoomChange(false)}
                >
                    <img
                        src={product?.images[0].url}
                        alt={product?.name}
                        className={`h-full w-full object-cover transition-transform duration-500 ${zoom ? "scale-150" : "scale-100"
                            }`}
                    />
                </div>

                <div>
                    <p className="text-xs uppercase tracking-luxe text-primary">{product?.category_name}</p>
                    <h1 className="mt-2 font-serif text-4xl sm:text-5xl">{product?.name}</h1>
                    <div className="mt-4">
                        <StarRating rating={product?.rating} reviews={product?.reviews} />
                    </div>
                    <p className="mt-6 font-serif text-3xl text-primary">
                        {Utils.formatPrice(product?.price ? product?.price : 0, settings?.currency)}
                    </p>
                    <p className="mt-6 leading-relaxed text-muted-foreground">{product?.description}</p>

                    <dl className="mt-8 space-y-2 border-y border-border py-6 text-sm">
                        <div className="flex gap-2">
                            <dt className="w-32 text-muted-foreground">Material</dt>
                            <dd>Coming Soon</dd>
                        </div>
                        <div className="flex gap-2">
                            <dt className="w-32 text-muted-foreground">Occasion</dt>
                            <dd>Coming Soon</dd>
                        </div>
                        <div className="flex gap-2">
                            <dt className="w-32 text-muted-foreground">Availability</dt>
                            <dd className={`flex items-center gap-1.5 ${colorMap[stockAvailibity?.variant]}`}>
                                {iconMap[stockAvailibity?.icon]}
                                {stockAvailibity?.label}
                            </dd>
                        </div>
                    </dl>

                    <div className="mt-8 flex items-center gap-4">
                        <div className="flex items-center border border-border">
                            <button
                                onClick={() => onQuantityChange(Math.max(1, selectedQuantity - 1))}
                                className="px-3.5 py-3 text-muted-foreground hover:text-primary"
                                aria-label="Decrease"
                            >
                                <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-10 text-center">{selectedQuantity}</span>
                            <button
                                onClick={() => onQuantityChange(selectedQuantity + 1)}
                                className="px-3.5 py-3 text-muted-foreground hover:text-primary"
                                aria-label="Increase"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>
                        <button
                            onClick={onAddToWishlistClick}
                            className="flex h-12 w-12 items-center justify-center border border-border hover:border-primary"
                            aria-label="Wishlist"
                        >
                            <Heart className={`h-5 w-5 ${addedToWishList ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                        </button>
                    </div>

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                        <button
                            onClick={() => onAddToCartClick(product, selectedQuantity)}
                            className="flex-1 bg-gradient-gold py-3.5 text-xs font-medium uppercase tracking-luxe text-primary-foreground transition-opacity hover:opacity-90"
                        >
                            Add to Cart
                        </button>
                    </div>

                    <div className="mt-8 grid grid-cols-3 gap-4 text-center text-xs text-muted-foreground">
                        <span className="flex flex-col items-center gap-2"><Truck className="h-5 w-5 text-primary" />Insured Delivery</span>
                        <span className="flex flex-col items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary" />Authenticity Certified</span>
                        <span className="flex flex-col items-center gap-2"><Ruler className="h-5 w-5 text-primary" />Size Guide Included</span>
                    </div>
                </div>
            </div>

            {relatedProducts.length > 0 && (
                <section className="mt-24">
                    <h2 className="mb-10 text-center font-serif text-3xl">You May Also Love</h2>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
                        {relatedProducts.map((relatedProduct) => (
                            <ProductCard
                                key={relatedProduct?.id}
                                currency={settings?.currency}
                                product={relatedProduct}
                            />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default Product