"use client";
import Dropdown from "@/components/shared/Dropdown/Dropdown";
import { useEffect, useState } from "react";
import ProductCardGrid from "@/components/shared/ProductCardGrid/ProductCardGrid";
import SortDropdown from "@/components/shared/Dropdown/SortDropdown";
import ColumnSwitcher from "../shared/ColumnSwitcher/ColumnSwitcher";
import { useColumnChange } from "@/providers/ColumnSwitcher";
import Pagination from "../shared/Pagination/Pagination";
import { useSearchParams } from "next/navigation";

const calculateTotalPages = (totalItems: number, itemsPerPage: number) => {
  return Math.ceil(totalItems / itemsPerPage);
};

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
  const [totalPages, setTotalPages] = useState(0);

  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  // Paginate the collections based on the page number
  const perPage = 3; // Number of collections per page
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage;

  useEffect(() => {
    const products =
      selected.handle === "all"
        ? [].concat(...data.map((e: any) => e.products))
        : data.filter((e: any) => e.handle === selected.handle)[0].products;

    const totalPages =
      products.length && calculateTotalPages(products.length, perPage);
    setTotalPages(totalPages);

    const paginatedCollections =
      products.length && products.slice(startIndex, endIndex);

    if (paginatedCollections) {
      setProducts(paginatedCollections);
    }
  }, [selected, currentPage]);

  return (
    <div className="flex flex-col justify-between h-[100vh]">
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

      {products.length && totalPages > 1 ? (
        <div className="mt-auto">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      ) : null}
    </div>
  );
}
