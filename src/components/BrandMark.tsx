import { useState } from "react";
import type { CarBrand } from "@/data/cars";
import { brandLogoSrc } from "@/data/brandCatalog";

export function BrandMark({ brand, size = 64 }: { brand: CarBrand; size?: number }) {
  const [failed, setFailed] = useState(false);
  const src = brandLogoSrc(brand.logoFile);

  if (failed) {
    return (
      <div
        className="flex items-center justify-center rounded-md bg-neutral-100 font-display text-xs font-bold tracking-wider text-neutral-800"
        style={{ width: size, height: size }}
        aria-label={brand.name}
      >
        {brand.name.slice(0, 3)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={brand.name}
      width={size}
      height={size}
      loading="lazy"
      onError={() => setFailed(true)}
      className="object-contain"
      style={{ width: size, height: size, maxHeight: size }}
    />
  );
}
