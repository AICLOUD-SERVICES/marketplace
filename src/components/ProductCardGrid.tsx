import React from "react";

const ProductCardGrid = ({ data }: { data: any }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.length
        ? data.map((e: any) => (
            <div
              key={e.id}
              className="cursor-pointer border border-gray-200 rounded-lg overflow-hidden flex flex-col align-center justify-between"
            >
              <div className="h-[300px] overflow-hidden">
                <img
                  className="block h-full w-full object-contain"
                  src={e.images[0]?.src}
                  alt={e.handle}
                />
              </div>
              <div className="p-3">
                <p className="text-xs">{e.title}</p>
                <div className="flex align-center justify-between mt-5">
                  <p className="text-xs">${e.variants[0].price.amount}</p>
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
