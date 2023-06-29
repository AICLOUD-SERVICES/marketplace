"use client";
import Dropdown from "@/components/shared/Dropdown/Dropdown";
import { useEffect, useState } from "react";
import ProductCardGrid from "@/components/shared/ProductCardGrid/ProductCardGrid";
import SortDropdown from "@/components/shared/Dropdown/SortDropdown";
import ColumnSwitcher from "../shared/ColumnSwitcher/ColumnSwitcher";
import { useColumnChange } from "@/providers/ColumnSwitcher";

export default function Showroom({
  data,
  collections,
}: {
  data: any;
  collections: any;
}) {
  const [selected, setSelected] = useState<any>(collections[1]);
  const [products, setProducts] = useState<any>([]);
  const { column } = useColumnChange();

  useEffect(() => {
    const filteredProduct = data.filter(
      (e: any) => e.handle === selected.handle
    );
    if (filteredProduct.length) {
      setProducts(filteredProduct[0].products);
    }
  }, [selected]);

  return (
    <div>
      <div className="container mx-auto px-5 flex justify-between container mx-auto border border-gray-200 py-3 border-2 border-x-0 border-t-0">
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-xs">Showroom</h2>
          <div className="inline-block h-full w-0.5 self-stretch bg-gray-200 opacity-100 dark:opacity-50"></div>
          <Dropdown
            collections={collections}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
        <div className="flex gap-2 relative">
          <ColumnSwitcher />
          <div className="inline-block h-full w-0.5 self-stretch bg-gray-200 opacity-100 dark:opacity-50"></div>
          <SortDropdown products={products} setProducts={setProducts} />
        </div>
      </div>
      <div className="mt-5 container mx-auto px-5">
        <ProductCardGrid data={products} column={column} />
      </div>
    </div>
  );
}
