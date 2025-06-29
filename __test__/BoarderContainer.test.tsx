/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import BoardContainer from "@/components/BoardContainer";

const mockSports: any[] = [
  {
    id: 1,
    country: "USA",
    competition: "NBA",
    status: { type: "inprogress" },
    date: new Date().toISOString(),
    homeScore: { current: 102 },
    awayScore: { current: 98 },
    homeTeam: { name: "Lakers" },
    awayTeam: { name: "Heat" },
    liveStatus: "some-status",
  },
  {
    id: 2,
    country: "Spain",
    competition: "La Liga",
    status: { type: "finished" },
    date: new Date().toISOString(),
    homeScore: { current: 1 },
    awayScore: { current: 3 },
    homeTeam: { name: "Barcelona" },
    awayTeam: { name: "Real Madrid" },
    liveStatus: "some-status",
  },
  {
    id: 3,
    country: "Germany",
    competition: "Bundesliga",
    status: { type: "cancelled" },
    date: new Date().toISOString(),
    homeScore: { current: 0 },
    awayScore: { current: 0 },
    homeTeam: { name: "Bayern" },
    awayTeam: { name: "Dortmund" },
    liveStatus: "some-status",
  },
];
jest.mock("@/components/CircularProgress", () => ({
  __esModule: true,
  default: () => <div data-testid="circular-progress">Circular</div>,
}));

describe("BoardContainer Display Logic", () => {
  it("renders country and title with correct classes and content", () => {
    render(<BoardContainer sports={mockSports} />);

    const countries = screen.getAllByTestId("game-country");
    const titles = screen.getAllByTestId("game-title");

    countries.forEach((el) => {
      expect(el).toHaveClass("uppercase");
      expect(el.textContent).not.toBe("");
    });

    titles.forEach((el) => {
      expect(el).toHaveClass("capitalize");
      expect(el.textContent).not.toBe("");
    });
  });

  it("applies correct class based on game status and always includes uppercase", () => {
    const { getAllByTestId } = render(<BoardContainer sports={mockSports} />);
    const statuses = getAllByTestId("game-status");

    expect(statuses[0]).toHaveTextContent("live");
    expect(statuses[0]).toHaveClass("text-yellow-500");
    expect(statuses[0]).toHaveClass("uppercase");

    expect(statuses[1]).toHaveTextContent("ended");
    expect(statuses[1]).toHaveClass("text-green-500");
    expect(statuses[1]).toHaveClass("uppercase");

    expect(statuses[2]).toHaveTextContent("cancelled");
    expect(statuses[2]).toHaveClass("text-red-500");
    expect(statuses[2]).toHaveClass("uppercase");
  });

  it("renders non-empty home and away scores", () => {
    render(<BoardContainer sports={mockSports} />);

    const homeScores = screen.getAllByTestId("game-home-score");
    const awayScores = screen.getAllByTestId("game-away-score");

    homeScores.forEach((el) => {
      expect(el.textContent).not.toBe("");
    });

    awayScores.forEach((el) => {
      expect(el.textContent).not.toBe("");
    });
  });
});
