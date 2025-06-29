/* eslint-disable @typescript-eslint/no-explicit-any */
import { sportTypes } from "types/sport";
import { filters } from "./constants";

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
    cnt: Boolean(filter.type) ? countDatas[filter.type] : data.length,
  }));
};
