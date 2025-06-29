"use client";

import { sportTypes } from "../types/sport";
import BoardContainer from "./BoardContainer";
import Filter from "./Filter";
import { useState } from "react";

const MainContainer: React.FC<{ sports: sportTypes[] }> = ({ sports }) => {
  const [list, setList] = useState(sports);

  return (
    <main className="flex flex-col items-center sm:items-start relative">
      <div
        data-testid="filter-wrapper"
        className="sticky top-0 bg-black border-b-amber-600 border-b w-full z-10 shadow"
      >
        <Filter list={sports} setList={setList} listCnt={list.length} />
      </div>
      <BoardContainer sports={list} />
    </main>
  );
};

export default MainContainer;
