import {
  Code2,
  Megaphone,
  MousePointerClick,
  PenTool,
  Search,
  Share2,
  ShoppingCart,
  Smartphone,
  TrendingUp,
} from "lucide-react";
import type { Service } from "@/lib/data";

const icons = {
  code: Code2,
  smartphone: Smartphone,
  search: Search,
  trending: TrendingUp,
  pen: PenTool,
  cart: ShoppingCart,
  google: MousePointerClick,
  meta: Megaphone,
  social: Share2,
};

export default function ServiceIcon({ name, size = 22 }: { name: Service["icon"]; size?: number }) {
  const Icon = icons[name];
  return <Icon size={size} strokeWidth={1.6} />;
}
