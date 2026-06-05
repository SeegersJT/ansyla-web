import type { StockAvailabilityItem } from "@/utils/Utils.type";
import { AlertTriangle, Check, X } from "lucide-react";

export interface StockBadgeProps {
  quantity: number;
}

export const iconMap: Record<StockAvailabilityItem["icon"], React.ReactNode> = {
  check:   <Check className="h-4 w-4" />,
  warning: <AlertTriangle className="h-4 w-4" />,
  none:    <X className="h-4 w-4" />,
};

export const colorMap: Record<StockAvailabilityItem["variant"], string> = {
  success:     "text-primary",
  warning:     "text-yellow-500",
  destructive: "text-destructive",
};