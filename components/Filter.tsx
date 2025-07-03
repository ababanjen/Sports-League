/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { filterType } from "../types/filters";
import { sportTypes } from "../types/sport";
import { useRef, useState } from "react";
import ArrowDown from "./icons/ArrowDown";
import clsx from "clsx";
import { useDropdownClose } from "../hooks/useDropdownClose";
import {
  cntPerFilterType,
  getSelectedObj,
  setSelectedObjFilter,
} from "@/lib/helpers";

const Filter: React.FC<{
  list: sportTypes[];
  setList: (list: sportTypes[]) => void;
}> = ({ list, setList }) => {
  const [filterList, setFilterList] = useState<filterType[]>(
    setSelectedObjFilter(cntPerFilterType(list), "")
  );

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useDropdownClose(dropdownRef, () => setOpen(false));

  const handleSelectFilter = (value: filterType) => {
    setOpen(false);
    setFilterList(setSelectedObjFilter(filterList, value.type));
    const results = [...list].filter((item) =>
      value.allias === "all" ? item : item.status.type === value.type
    );
    setList(results);
  };

  const onBtnClick = () => setOpen((prev) => !prev);
  const selectedFilter = getSelectedObj(filterList);
  
  return (
    <div className=" p-2 w-full" ref={dropdownRef}>
      <div className="relative inline-block text-left w-full">
        <button
          onClick={onBtnClick}
          className="capitalize px-4 w-full py-2 text-sm md:text-xl shadow-sm hover:bg-amber-900"
        >
          {selectedFilter &&
            `${selectedFilter.allias} (${selectedFilter?.cnt})`}
          <ArrowDown
            className={clsx({
              "rotate-180": open,
            })}
          />
        </button>

        {open && (
          <ul
            data-testid="dropdown-container"
            className="rounded-b-md absolute w-full z-10 mt-2 bg-white border border-gray-200 shadow-lg text-black"
          >
            {filterList.map((filter: filterType, key: any) => (
              <li
                key={`${key}-${filter.allias}`}
                onClick={() => handleSelectFilter(filter)}
                className={clsx({
                  "x-4 py-2 text-sm cursor-pointer hover:bg-gray-100 flex justify-center capitalize":
                    true,
                  "bg-gray-100 font-semibold": filter.selected,
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
