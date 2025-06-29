import { render, fireEvent, screen } from "@testing-library/react";
import Filter from "@/components/Filter";
import { sportTypes } from "types/sport";

const mockList: sportTypes[] = [
  {
    id: "hbaffaf",
    name: "FK Tyumen - Luch-Energiya Vladivostok",
    competitionId: "bbbg",
    competition: "Football National League",
    countryId: "cb",
    country: "Russia",
    timestamp: 1470484800,
    date: "06.08.2016.",
    time: "12:00",
    status: {
      code: 100,
      type: "finished",
    },
    round: {
      round: 6,
    },
    homeTeam: {
      id: 75207,
      name: "FK Tyumen",
      slug: "fk-tyumen",
      gender: "M",
      subTeams: [],
    },
    awayTeam: {
      id: 5852,
      name: "Luch-Energiya Vladivostok",
      slug: "luch-energiya-vladivostok",
      gender: "M",
      subTeams: [],
    },
    homeScore: {
      current: 0,
      period1: 0,
      normaltime: 0,
    },
    awayScore: {
      current: 0,
      period1: 0,
      normaltime: 0,
    },
    liveStatus: "FT",
  },
];

describe("Filter component", () => {
  it("shows dropdown when open is true", () => {
    const mockSetList = jest.fn();

    render(
      <Filter list={mockList} setList={mockSetList} listCnt={mockList.length} />
    );

    // Click to open the dropdown
    const button = screen.getByRole("button");
    fireEvent.click(button);

    // Assert dropdown container is in the document
    const dropdown = screen.getByTestId("dropdown-container");
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toBeVisible();
  });
});
