"use client";
import React from "react";
import { filters } from "@/lib/constants";
import { filterType } from "@/types/filters";
import { sportTypes } from "@/types/sport";
import { useRef, useState } from "react";
import ArrowDown from "./icons/ArrowDown";
import clsx from "clsx";
import { useDropdownClose } from "../hooks/useDropdownClose";

const Filter: React.FC<{
  list: sportTypes[];
  setList: (list: sportTypes[]) => void;
  listCnt: number;
}> = ({ list, setList, listCnt }) => {
  const [selected, setSelected] = useState<filterType>(filters[0]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useDropdownClose(dropdownRef, () => setOpen(false));

  const handleSelectFilter = (value: filterType) => {
    setOpen(false);
    setSelected(value);
    const listCopy = [...list];
    const results = listCopy.filter((item) =>
      value.allias === "all" ? item : item.status.type === value.type
    );
    setList(results);
  };

  const onBtnClick = () => setOpen((prev) => !prev);

  return (
    <div className="rounded p-2 w-full" ref={dropdownRef}>
      <div className="relative inline-block text-left w-full">
        <button
          onClick={onBtnClick}
          className="capitalize rounded-md px-4 w-full py-2 text-sm md:text-xl shadow-sm hover:bg-amber-900"
        >
          {selected.allias} {`(${listCnt})`}
          <ArrowDown
            className={clsx({
              "rotate-180": open,
            })}
          />
        </button>

        {open && (
          <ul className="absolute w-full z-10 mt-2 bg-white border border-gray-200 shadow-lg text-black">
            {filters.map((filter, key) => (
              <li
                key={`${key}-${filter.allias}`}
                onClick={() => handleSelectFilter(filter)}
                className={clsx({
                  "x-4 py-2 text-sm cursor-pointer hover:bg-gray-100 flex justify-center capitalize":
                    true,
                  "bg-gray-100 font-semibold": selected.type === filter.type,
                })}
              >
                {filter.allias}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default React.memo(Filter);
