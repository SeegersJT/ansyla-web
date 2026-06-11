import { Link } from "react-router";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { addToCart, removeAllOfProduct, removeFromCart, setCartDrawerOpen } from "@/redux/actions/Cart.action";
import { Utils } from "@/utils/Utils";
import type { ProductItem } from "@/redux/types/Product.type";

function CartDrawer() {
    const dispatch = useAppDispatch();

    const { cartData, cartDataCount, cartDataSubtotal, isCartDrawerOpen } = useAppSelector(state => state.cart);
    const { settingsData } = useAppSelector(state => state.settings);

    const handleOnOpenCartDrawerClick = (isOpen: boolean) => {
        dispatch(setCartDrawerOpen(isOpen));
    }

    const handleOnRemoveCartItemClick = (productId: string) => {
        dispatch(removeFromCart(productId));
    }

    const handleOnAddCartItemClick = (product: ProductItem, quantity: number) => {
        dispatch(addToCart(product, quantity));
    }

    const handleOnRemoveAllOfProductClick = (productId: string) => {
        dispatch(removeAllOfProduct(productId));
    }

    return (
    <>
      <div
        onClick={() => handleOnOpenCartDrawerClick(false)}
        className={`fixed inset-0 z-50 bg-background/70 backdrop-blur-sm transition-opacity duration-300 ${
          isCartDrawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-card transition-transform duration-300 ease-out ${
          isCartDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="font-serif text-2xl">
            Your Cart{" "}
            <span className="text-sm text-muted-foreground">({ cartDataCount })</span>
          </h2>
          <button onClick={() => handleOnOpenCartDrawerClick(false)} aria-label="Close cart">
            <X className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
          </button>
        </div>

        {cartData.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="h-12 w-12 text-primary/40" />
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Link
              to="/shop"
              onClick={() => handleOnOpenCartDrawerClick(false)}
              className="bg-gradient-gold px-6 py-3 text-xs font-medium uppercase tracking-wider text-primary-foreground"
            >
              Shop Collection
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
              {cartData.map(({ product, quantity }) => (
                <div key={product?.id} className="flex gap-4">
                  <img
                    src={product?.images[0]?.url}
                    alt={product?.name}
                    loading="lazy"
                    className="h-24 w-24 flex-shrink-0 rounded-sm border border-border object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <Link
                        to={`/product/${product?.id}`}
                        onClick={() => handleOnOpenCartDrawerClick(false)}
                        className="font-serif text-base leading-tight hover:text-primary"
                      >
                        {product?.name}
                      </Link>
                      <button onClick={() => handleOnRemoveAllOfProductClick(product?.id)} aria-label="Remove all">
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-primary">{Utils.formatPrice(product?.price, settingsData[0].currency)}</p>
                    <div className="mt-auto flex items-center gap-3">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => handleOnRemoveCartItemClick(product?.id)}
                          className="px-2.5 py-1.5 text-muted-foreground hover:text-primary"
                          aria-label="Decrease"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm">{quantity}</span>
                        <button
                          onClick={() => handleOnAddCartItemClick(product, 1)}
                          className="px-2.5 py-1.5 text-muted-foreground hover:text-primary"
                          aria-label="Increase"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-border px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-wider text-muted-foreground">
                  Subtotal
                </span>
                <span className="font-serif text-2xl text-primary">
                  {Utils.formatPrice(cartDataSubtotal, settingsData[0].currency)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping &amp; taxes calculated at checkout.
              </p>
              <Link
                to="/checkout"
                onClick={() => handleOnOpenCartDrawerClick(false)}
                className="block bg-gradient-gold py-3.5 text-center text-xs font-medium uppercase tracking-luxe text-primary-foreground transition-opacity hover:opacity-90"
              >
                Secure Checkout
              </Link>
              <Link
                to="/cart"
                onClick={() => handleOnOpenCartDrawerClick(false)}
                className="block text-center text-xs uppercase tracking-wider text-muted-foreground hover:text-primary"
              >
                View Cart
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default CartDrawer;