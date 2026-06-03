import { Gem, Gift, ShieldCheck, Sparkles, Truck } from "lucide-react";

export interface Reasons {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any
    title: string
    text: string
}


export const reasons = [
  { icon: Gem, title: "Premium Craftsmanship", text: "Hand-finished by master artisans." },
  { icon: Sparkles, title: "Quality Materials", text: "Gold-plated stainless steel, built to last." },
  { icon: ShieldCheck, title: "Secure Payments", text: "Trusted SA payment methods." },
  { icon: Truck, title: "Nationwide Delivery", text: "Swift, insured shipping countrywide." },
  { icon: Gift, title: "Elegant Gift Packaging", text: "Signature black-and-gold boxes." },
];

