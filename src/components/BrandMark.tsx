import type { CarBrand } from "@/data/cars";

export function BrandMark({ brand, size = 64 }: { brand: CarBrand; size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-xl font-display font-bold tracking-wider text-white"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(120% 120% at 20% 10%, ${brand.color} 0%, #0a0a0a 100%)`,
        boxShadow: `inset 0 0 0 1px rgba(255,255,255,.08), 0 8px 24px -8px ${brand.color}66`,
        fontSize: size < 60 ? 12 : 14,
      }}
      aria-label={brand.name}
    >
      {brand.logo}
    </div>
  );
}
