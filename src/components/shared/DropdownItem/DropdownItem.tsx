import React from "react";

export interface DropdownItemProps {
  handleClick: () => void;
  order: string;
  title: string;
}

const DropdownItem = (props: DropdownItemProps) => {
  const { order, title, handleClick } = props;
  return (
    <button
      className={`text-gray-700 block px-4 py-2 text-sm cursor-pointer w-full text-left hover:bg-gray-100 ${
        order === title && "bg-gray-200"
      }`}
      role="menuitem"
      id="menu-item-0"
      onClick={() => {
        handleClick();
      }}
    >
      {title}
    </button>
  );
};

export default DropdownItem;
