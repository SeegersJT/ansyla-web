import { useState } from "react";
import { Link } from "react-router";

const columns = [
  {
    title: "Shop",
    links: ["Rings", "Necklaces", "Earrings", "Bracelets", "Watches", "Gifts"],
  },
  {
    title: "Company",
    links: ["About ANSYLA", "Contact Us", "FAQs", "ANSYLA Rewards"],
  },
  {
    title: "Policies",
    links: ["Shipping Policy", "Returns Policy", "Privacy Policy", "Terms & Conditions"],
  },
];


function FooterContainer() {
    return (
        <footer className="border-t border-border bg-card">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
                <div className="grid gap-12 lg:grid-cols-5">
                <div className="lg:col-span-2">
                    <span className="font-serif text-2xl font-semibold tracking-[0.25em] text-gradient-gold">
                        ANSYLA
                    </span>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                        Timeless Beauty, Precious You. Exquisite fine jewelry crafted to celebrate
                        your elegance, confidence, and individuality — proudly South African.
                    </p>
                </div>

                {columns.map((col) => (
                    <div key={col.title}>
                        <h4 className="text-xs uppercase tracking-luxe text-primary">{col.title}</h4>
                        <ul className="mt-4 space-y-3">
                            {col.links.map((link) => (
                                <li key={link}>
                                    <Link
                                        to="/shop"
                                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
                <p className="text-xs text-muted-foreground">
                    © {new Date().getFullYear()} ANSYLA Jewels · ANSYLA.co.za · All rights reserved.
                </p>
                {/* <div className="flex gap-4 text-muted-foreground">
                    <a href="#" aria-label="Instagram" className="hover:text-primary">
                    <Icon. className="h-5 w-5" />
                    </a>
                    <a href="#" aria-label="Facebook" className="hover:text-primary">
                    <Facebook className="h-5 w-5" />
                    </a>
                    <a href="#" aria-label="Twitter" className="hover:text-primary">
                    <Twitter className="h-5 w-5" />
                    </a>
                </div> */}
                </div>
            </div>
        </footer>
  );
}

export default FooterContainer;