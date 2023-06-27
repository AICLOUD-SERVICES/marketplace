"use client";
import Dropdown from "@/components/Dropdown";
import { useEffect, useState } from "react";
import ProductCardGrid from "./ProductCardGrid";

export default function Showroom({
  data,
  collections,
}: {
  data: any;
  collections: any;
}) {
  const [selected, setSelected] = useState<any>(collections[1]);
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    const filteredProduct = data.filter(
      (e: any) => e.handle === selected.handle
    );
    if (filteredProduct.length) {
      setProducts(filteredProduct[0].products);
    }
  }, [selected]);

  return (
    <div className="container mx-auto">
      <div className="flex align-center justify-between container mx-auto border border-gray-200 py-3 border-2 border-x-0 border-t-0">
        <h2 className="font-bold">Showroom</h2>
        <Dropdown
          collections={collections}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
      <div className="mt-5">
        <ProductCardGrid data={products} />
      </div>
    </div>
  );
}
