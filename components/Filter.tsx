/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { filterType } from "../types/filters";
import { sportTypes } from "../types/sport";
import { useRef, useState } from "react";
import ArrowDown from "./icons/ArrowDown";
import clsx from "clsx";
import { useDropdownClose } from "../hooks/useDropdownClose";
import { cntPerFilterType } from "@/lib/helpers";

const Filter: React.FC<{
  list: sportTypes[];
  setList: (list: sportTypes[]) => void;
}> = ({ list, setList }) => {
  const [filterList] = useState<filterType[]>(cntPerFilterType(list));
  const [selected, setSelected] = useState<filterType>(
    cntPerFilterType(list)[0]
  );
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useDropdownClose(dropdownRef, () => setOpen(false));

  const handleSelectFilter = (value: filterType) => {
    setOpen(false);
    setSelected(value);
    const results = [...list].filter((item) =>
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
          {selected.allias} {`(${selected.cnt})`}
          <ArrowDown
            className={clsx({
              "rotate-180": open,
            })}
          />
        </button>

        {open && (
          <ul
            data-testid="dropdown-container"
            className="absolute w-full z-10 mt-2 bg-white border border-gray-200 shadow-lg text-black"
          >
            {filterList.map((filter: filterType, key: any) => (
              <li
                key={`${key}-${filter.allias}`}
                onClick={() => handleSelectFilter(filter)}
                className={clsx({
                  "x-4 py-2 text-sm cursor-pointer hover:bg-gray-100 flex justify-center capitalize":
                    true,
                  "bg-gray-100 font-semibold": selected.type === filter.type,
                })}
              >
                {filter.allias} {`(${filter.cnt})`}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default React.memo(Filter);
