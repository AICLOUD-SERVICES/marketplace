import { ThreeColumns, TwoColumns } from "@/icons";
import { useColumnChange } from "@/providers/ColumnSwitcher";
import classNames from "classnames";
import React, { useState } from "react";

const columns = [
  {
    columnNumber: 2,
    icon: TwoColumns,
  },
  {
    columnNumber: 3,
    icon: ThreeColumns,
  },
];
const ColumnSwitcher = ({}) => {
  const [openGrid, setOpenGrid] = useState(false);
  const { column, toggleColumn } = useColumnChange();
  return (
    <>
      <button
        className="text-xs flex items-center gap-2 sm:hidden"
        onClick={() => setOpenGrid(!openGrid)}
      >
        view
        {!openGrid && (
          <div>{column === 2 ? <TwoColumns /> : <ThreeColumns />}</div>
        )}
      </button>

      <div
        style={{
          width: openGrid ? "80px" : "0",
          left: "calc(100% - 60px)",
        }}
        className="absolute overflow-hidden top-0 flex z-10 bg-white items-center h-full transition-all"
      >
        {columns.map(({ columnNumber, icon: Icon }, i) => (
          <button
            key={i}
            onClick={() => {
              toggleColumn(columnNumber);
              setOpenGrid(false);
            }}
            className="hover:bg-[#222222] active-grid-icon  h-[40px] w-[50%] flex items-center justify-center py-[15px] px-[9px]"
          >
            <span
              className={classNames(
                column === columnNumber && "border border-message p-[3px]"
              )}
            >
              <Icon />
            </span>
          </button>
        ))}
      </div>
    </>
  );
};

export default ColumnSwitcher;
