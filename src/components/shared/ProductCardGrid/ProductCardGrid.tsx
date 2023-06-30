import classNames from "classnames";
import React from "react";

const ProductCardGrid = ({
  data,
  column = 1,
}: {
  data: any;
  column?: number;
}) => {
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
    <div
      className={classNames(
        `container mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-3`,
        column === 2 && "grid-cols-2",
        column === 3 && "grid-cols-3"
      )}
    >
      {data.length
        ? data.map((e: any) => (
            <div
              key={e.id}
              className={classNames(
                "cursor-pointer overflow-hidden flex flex-col justify-between",
                column !== 3 && "rounded-lg border border-gray-200"
              )}
            >
              <div
                className={classNames(
                  "sm:h-[350px] overflow-hidden relative",
                  column !== 1 ? "h-[150px]" : "h-[350px]"
                )}
              >
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
              <div
                className={classNames("p-3", column === 3 && "hidden sm:block")}
              >
                <p className="text-xs font-bold uppercase truncate">
                  {e.title}
                </p>
                <p className="text-xs truncate mt-2">{e.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-[10px] sm:text-xs font-bold">
                    {getRange(e.variants)}
                  </p>
                  {column === 1 && (
                    <p className="uppercase underline font-bold text-xs">
                      view item
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default ProductCardGrid;
