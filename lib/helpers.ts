/* eslint-disable @typescript-eslint/no-explicit-any */
import { sportTypes } from "types/sport";
import { filters } from "./constants";
import { filterType } from "types/filters";

const getByPath = <T = any>(obj: T, path: string): any =>
  path.split(".").reduce((acc: any, key: string) => acc?.[key], obj);

export const countAndGroupObj = (obj: any[], objKey: string) =>
  obj.reduce((acc, curr) => {
    const key = getByPath(curr, objKey);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

export const cntPerFilterType = (data: sportTypes[]) => {
  const countDatas = countAndGroupObj(data, "status.type");
  return filters.map((filter) => ({
    ...filter,
    selected: false,
    cnt: Boolean(filter.type) ? countDatas[filter.type] : data.length,
  }));
};

export const setSelectedObjFilter = (data: filterType[], current: string) =>
  data.map((filter) => ({
    ...filter,
    selected: filter.type === current,
  }));

export const getSelectedObj = (data: filterType[]) =>
  data.find((value) => value.selected);
