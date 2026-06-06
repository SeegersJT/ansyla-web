import type { HeaderNavLink } from "@/containers/landing-page/header/Header.helper";
import * as Icon from "lucide-react";
import { Link } from "react-router";

function Header({
    headerNavLinks,
    mobileOpen,
    cartDataCount,
    onMobileOpen,
    onOpenCartDrawerClick,
}: {
    headerNavLinks: HeaderNavLink[];
    mobileOpen: boolean;
    cartDataCount: number
    onMobileOpen: (value: boolean) => void
    onOpenCartDrawerClick: (value: boolean) => void
}) {
     return (
        <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
            <div className="border-b border-border/40 bg-gradient-gold py-2 text-center text-[11px] font-medium uppercase tracking-luxe text-primary-foreground">
                Complimentary nationwide delivery on orders over R500
            </div>
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
                <button
                    className="md:hidden"
                    onClick={() => onMobileOpen(!mobileOpen)}
                    aria-label="Menu"
                >
                    {mobileOpen ? <Icon.X className="h-5 w-5" /> : <Icon.Menu className="h-5 w-5" />}
                </button>

                <nav className="hidden items-center gap-7 md:flex">
                    {headerNavLinks.map((link, index) => (
                        <Link
                            key={index}
                            to={link.to}
                            className="text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <Link to="/" className="flex flex-col items-center md:absolute md:left-1/2 md:-translate-x-1/2">

                <span className="font-serif text-2xl font-semibold tracking-[0.25em] text-gradient-gold">
                    ANSYLA
                </span>

                <span className="text-[9px] uppercase tracking-luxe text-muted-foreground">
                    Jewels
                </span>

                </Link>

                <div className="flex items-center gap-4 text-foreground">
                    <Link to="/shop" aria-label="Search" className="hover:text-primary">
                        <Icon.Search className="h-5 w-5" />
                    </Link>

                    <Link to="/account" aria-label="Account" className="hidden hover:text-primary sm:block">
                        <Icon.User className="h-5 w-5" />
                    </Link>

                    <button
                        onClick={() => onOpenCartDrawerClick(true)}
                        className="relative hover:text-primary"
                        aria-label="Cart"
                    >
                        <Icon.ShoppingBag className="h-5 w-5" />
                        {cartDataCount > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gradient-gold px-1 text-[10px] font-semibold text-primary-foreground">
                                {cartDataCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {mobileOpen && (
                <nav className="flex flex-col gap-1 border-t border-border bg-card px-6 py-4 md:hidden">
                    {headerNavLinks.map((link, index) => (
                        <Link
                            key={index}
                            to={link.to}
                            onClick={() => onMobileOpen(false)}
                            className="py-2 text-sm uppercase tracking-wider text-muted-foreground hover:text-primary"
                        >
                            {link.label}
                        </Link>
                    ))}

                    <Link
                        to="/account"
                        onClick={() => onMobileOpen(false)}
                        className="py-2 text-sm uppercase tracking-wider text-muted-foreground hover:text-primary"
                    >
                        Account
                    </Link>
                </nav>
            )}
        </header>
    );
}

export default Header;