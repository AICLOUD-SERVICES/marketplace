import useOutsideAlerter from "@/hooks/useOutsideClick";
import React, { useEffect, useRef, useState } from "react";

const Dropdown = ({
  collections,
  setSelected,
  selected,
}: {
  collections: any;
  selected: any;
  setSelected: (arg: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const handleClosePopup = () => {
    setOpen(false);
  };

  useOutsideAlerter(wrapperRef, handleClosePopup);

  return (
    <div className="relative inline-block text-left" ref={wrapperRef}>
      <div>
        <button
          type="button"
          className="inline-flex align-center w-full justify-center gap-x-1 rounded-md bg-white text-xs font-semibold text-gray-900 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <span className="leading-[18px]">collection</span>
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
          className="fixed sm:absolute left-0 z-10 mt-2 w-full sm:w-56 origin-top-right sm:rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1 w-full" role="none">
            {collections.length
              ? collections.map((e: any, i: number) => (
                  <button
                    key={i}
                    className={`text-gray-700 block px-4 py-2 text-sm cursor-pointer w-full text-left hover:bg-gray-100 ${
                      e.handle === selected.handle && "bg-gray-100"
                    }`}
                    role="menuitem"
                    id="menu-item-0"
                    onClick={() => {
                      setSelected(e);
                      setOpen(false);
                    }}
                    disabled={e.handle === selected.handle}
                  >
                    {e.title}
                  </button>
                ))
              : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
