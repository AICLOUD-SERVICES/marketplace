import React from "react";

const ProductCardGrid = ({ data }: { data: any }) => {
  const getRange = (variants: any) => {
    const range = variants.length && variants.map((e: any) => e.price.amount);
    const uniqueRange = [...new Set<number>(range)];
    const minPrice = Math.min(...uniqueRange);
    const maxPrice = Math.max(...uniqueRange);

    if (uniqueRange.length > 1) {
      return `$${minPrice} - $${maxPrice}`;
    }

    return `$${minPrice}`;
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.length
        ? data.map((e: any) => (
            <div
              key={e.id}
              className="cursor-pointer border border-gray-200 rounded-lg overflow-hidden flex flex-col align-center justify-between"
            >
              <div className="h-[300px] overflow-hidden relative">
                <img
                  className="block h-full w-full object-cover"
                  src={e.images[0]?.src}
                  alt={e.handle}
                />
                {!e.availableForSale && (
                  <div className="absolute bottom-0 right-0 bg-gray-300 text-xs p-2">
                    sold out
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs">{e.title}</p>
                <div className="flex align-center justify-between mt-5">
                  <p className="text-xs">{getRange(e.variants)}</p>
                  <p className="uppercase underline font-bold text-xs">
                    view item
                  </p>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default ProductCardGrid;
