import useOutsideAlerter from "@/hooks/useOutsideClick";
import { sortProducts } from "@/utils/sort";
import React, { useRef, useState } from "react";

const APLHABETICALLY_ASC = "alphabetically, a-z";
const APLHABETICALLY_DESC = "alphabetically, z-a";
const PRICE_ASC = "price, low-high";
const PRICE_DESC = "price, high-low";
const DATE_ASC = "date, old-new";
const DATE_DESC = "date, new-old";

const SortDropdown = ({
  products,
  setProducts,
}: {
  products: any;
  setProducts: any;
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const [order, setOrder] = useState(APLHABETICALLY_ASC);

  const handleClosePopup = () => {
    setOpen(false);
  };
  useOutsideAlerter(wrapperRef, handleClosePopup);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1 rounded-md bg-white text-xs font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setOpen(!open)}
        >
          <span className="leading-[18px]">sort</span>
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {open && (
        <div
          ref={wrapperRef}
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <button
              className={`text-gray-700 block px-4 py-2 text-sm cursor-pointer w-full text-left hover:bg-gray-100 ${
                order === APLHABETICALLY_ASC && "bg-gray-200"
              }`}
              role="menuitem"
              id="menu-item-0"
              onClick={() => {
                setProducts(sortProducts(products, "title", "asc"));
                setOrder(APLHABETICALLY_ASC);
                setOpen(false);
              }}
            >
              {APLHABETICALLY_ASC}
            </button>
            <button
              className={`text-gray-700 block px-4 py-2 text-sm cursor-pointer w-full text-left hover:bg-gray-100 ${
                order === APLHABETICALLY_DESC && "bg-gray-200"
              }`}
              role="menuitem"
              id="menu-item-0"
              onClick={() => {
                setProducts(sortProducts(products, "title", "desc"));
                setOrder(APLHABETICALLY_DESC);
                setOpen(false);
              }}
            >
              {APLHABETICALLY_DESC}
            </button>
            <button
              className={`text-gray-700 block px-4 py-2 text-sm cursor-pointer w-full text-left hover:bg-gray-100 ${
                order === PRICE_ASC && "bg-gray-200"
              }`}
              role="menuitem"
              id="menu-item-0"
              onClick={() => {
                setProducts(sortProducts(products, "price", "asc"));
                setOrder(PRICE_ASC);
                setOpen(false);
              }}
            >
              {PRICE_ASC}
            </button>
            <button
              className={`text-gray-700 block px-4 py-2 text-sm cursor-pointer w-full text-left hover:bg-gray-100 ${
                order === PRICE_DESC && "bg-gray-200"
              }`}
              role="menuitem"
              id="menu-item-0"
              onClick={() => {
                setProducts(sortProducts(products, "price", "desc"));
                setOrder(PRICE_DESC);
                setOpen(false);
              }}
            >
              {PRICE_DESC}
            </button>
            <button
              className={`text-gray-700 block px-4 py-2 text-sm cursor-pointer w-full text-left hover:bg-gray-100 ${
                order === DATE_ASC && "bg-gray-200"
              }`}
              role="menuitem"
              id="menu-item-0"
              onClick={() => {
                setProducts(sortProducts(products, "createdAt", "asc"));
                setOrder(DATE_ASC);
                setOpen(false);
              }}
            >
              {DATE_ASC}
            </button>
            <button
              className={`text-gray-700 block px-4 py-2 text-sm cursor-pointer w-full text-left hover:bg-gray-100 ${
                order === DATE_DESC && "bg-gray-200"
              }`}
              role="menuitem"
              id="menu-item-0"
              onClick={() => {
                setProducts(sortProducts(products, "createdAt", "desc"));
                setOrder(DATE_DESC);
                setOpen(false);
              }}
            >
              {DATE_DESC}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
