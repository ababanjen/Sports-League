import { render, screen } from "@testing-library/react";
import MainContainer from "../components/MainContainer";
import { sportTypes } from "types/sport";

const mockSports: sportTypes[] = [
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

// Mock Filter to avoid its internal logic
jest.mock("@/components/Filter", () => ({
  __esModule: true,
  default: () => <div data-testid="filter-mock">Filter Mock</div>,
}));

// Mock BoardContainer to expose the sports prop (same as list state)
jest.mock("@/components/BoardContainer", () => ({
  __esModule: true,
  default: ({ sports }: { sports: sportTypes[] }) => (
    <div data-testid="board-mock">{JSON.stringify(sports)}</div>
  ),
}));

describe("MainContainer", () => {
  it("expects list state to be an array with at least one object", () => {
    render(<MainContainer sports={mockSports} />);

    const board = screen.getByTestId("board-mock");
    const renderedList = JSON.parse(board.textContent || "[]");

    expect(Array.isArray(renderedList)).toBe(true);
    expect(renderedList.length).toBeGreaterThan(0); //expect at least 1 object
  });
});

describe('MainContainer sticky behavior', () => {
  it('applies sticky class to the Filter wrapper', () => {
    render(<MainContainer sports={mockSports} />)

    const stickyWrapper = screen.getByTestId('filter-wrapper')

    expect(stickyWrapper).toHaveClass('sticky')
    expect(stickyWrapper).toHaveClass('top-0')
    expect(stickyWrapper).toHaveClass('bg-black')
    expect(stickyWrapper).toHaveClass('border-b')
    expect(stickyWrapper).toHaveClass('z-10')
  })
})