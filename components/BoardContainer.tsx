"use client";
import clsx from "clsx";
import { boardTypes } from "../types/board";
import { sportTypes } from "../types/sport";
import CircularProgress from "./CircularProgress";
import { formatCustomDate } from "../lib/formatCustomDate";

const BoardContainer: React.FC<boardTypes> = ({ sports }) => {
  const getStatusType = (team: sportTypes) => {
    switch (team.status.type) {
      case "notstarted":
        return { text: formatCustomDate(team.timestamp), style: "" };
      case "inprogress":
        return { text: "live", style: "text-yellow-500" };
      case "finished":
        return { text: "ended", style: "text-green-500" };
      default:
        return { text: "cancelled", style: "text-red-500" };
    }
  };

  return (
    <div className="flex overflow-hidden flex-wrap gap-2 justify-center mt-2">
      {sports.map((team: sportTypes) => (
        <div
          key={team.id}
          className="bg-stone-600 w-[90%] md:w-[30rem] p-[3rem]  gap-6 rounded justify-center md:p-12 flex flex-col hover:bg-gray-900"
        >
          <div className="flex flex-col">
            <span
              data-testid="game-country"
              className="w-full flex justify-center text-sm uppercase"
            >
              {team.country ?? "Uknown country"}
            </span>
            <span
              data-testid="game-title"
              className="w-full flex justify-center text-xl capitalize"
            >
              {team.competition ?? "Unknown competition"}
            </span>
            <span
              data-testid="game-status"
              className={clsx({
                "w-full flex justify-center text-sm uppercase": true,
                ...{ [getStatusType(team).style]: true },
              })}
            >
              {getStatusType(team).text}
            </span>
          </div>
          <div className="w-full flex gap-2 justify-center items-center">
            <span className="text-5xl" data-testid="game-home-score">
              {team.homeScore.current ?? 0}
            </span>
            -
            <span className="text-5xl" data-testid="game-away-score">
              {team.awayScore.current ?? 0}
            </span>
          </div>
          <div className="w-full flex gap-2 justify-between items-center">
            <span className="text-base max-w-[3rem] text-center md:max-w-[unset] md:text-2xl md:w-[30rem] flex justify-center">
              {team.homeTeam.name}
            </span>
            <div className="w-full flex justify-center">
              <CircularProgress status={team.liveStatus} />
            </div>
            <span className="text-base  max-w-[3rem] md:max-w-[unset] md:text-2xl md:w-[30rem] flex justify-center text-center">
              {team.awayTeam.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoardContainer;
