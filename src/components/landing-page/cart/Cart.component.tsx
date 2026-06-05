import { Trash2 } from "lucide-react";
import { Link } from "react-router";

function Cart({
    cartData,
}, {
    cartData: CartItem[]
}) {
    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <h1 className="mb-10 font-serif text-4xl sm:text-5xl">Shopping Cart</h1>

            <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
                <div className="divide-y divide-border border-y border-border">
                    {items.map(({ product, quantity }) => (
                        <div key={product.id} className="flex gap-5 py-6">
                            <img
                                src={product.image}
                                alt={product.name}
                                loading="lazy"
                                className="h-28 w-28 flex-shrink-0 rounded-sm border border-border object-cover"
                            />
                            <div className="flex flex-1 flex-col">
                                <div className="flex justify-between gap-3">
                                    <Link
                                        to="/product/$id"
                                        className="font-serif text-xl hover:text-primary"
                                    >
                                        {product.name}
                                    </Link>
                                    <button onClick={() => remove(product.id)} aria-label="Remove">
                                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                                    </button>
                                </div>
                                <p className="mt-1 text-sm text-muted-foreground">{product.material}</p>
                                <div className="mt-auto flex items-center justify-between">
                                    <div className="flex items-center border border-border">
                                        <button
                                            onClick={() => setQuantity(product.id, quantity - 1)}
                                            className="px-3 py-2 text-muted-foreground hover:text-primary"
                                            aria-label="Decrease"
                                        >
                                            <Minus className="h-3.5 w-3.5" />
                                        </button>
                                        <span className="w-9 text-center text-sm">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(product.id, quantity + 1)}
                                            className="px-3 py-2 text-muted-foreground hover:text-primary"
                                            aria-label="Increase"
                                        >
                                            <Plus className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                    <p className="font-serif text-lg text-primary">
                                        {formatZAR(product.price * quantity)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <aside className="h-fit border border-border bg-card p-6">
                    <h2 className="font-serif text-2xl">Order Summary</h2>

                    <div className="mt-6 flex gap-2">
                        <input
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                            placeholder="Coupon code"
                            className="flex-1 border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                        />
                        <button
                            onClick={applyCoupon}
                            className="flex items-center gap-1.5 border border-primary px-4 text-xs uppercase tracking-wider text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                            <Tag className="h-3.5 w-3.5" /> Apply
                        </button>
                    </div>
                    {applied > 0 && (
                        <p className="mt-2 text-xs text-primary">Coupon ANSYLA10 applied — 10% off!</p>
                    )}

                    <div className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
                        <Row label="Subtotal" value={formatZAR(subtotal)} />
                        {discount > 0 && <Row label="Discount" value={`- ${formatZAR(discount)}`} />}
                        <Row
                            label="Shipping"
                            value={shipping === 0 ? "Free" : formatZAR(shipping)}
                        />
                        <div className="flex justify-between border-t border-border pt-3 font-serif text-xl">
                            <span>Total</span>
                            <span className="text-primary">{formatZAR(total)}</span>
                        </div>
                    </div>

                    <Link
                        to="/checkout"
                        className="mt-6 block bg-gradient-gold py-3.5 text-center text-xs font-medium uppercase tracking-luxe text-primary-foreground transition-opacity hover:opacity-90"
                    >
                        Proceed to Checkout
                    </Link>
                    <p className="mt-3 text-center text-xs text-muted-foreground">
                        Try code <span className="text-primary">ANSYLA10</span> for 10% off
                    </p>
                </aside>
            </div>
        </div>
    );
}

export default Cart;