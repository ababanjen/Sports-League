export type sportTypes = {
  id: string;
  name: string;
  competitionId: string;
  competition: string;
  countryId: string;
  country: string;
  timestamp: number;
  date: string;
  time: string;
  status: {
    code: number;
    type: string;
  };
  round: {
    round: number;
  };
  homeTeam: {
    id: number;
    name: string;
    slug: string;
    gender: string;
    subTeams: [];
  };
  awayTeam: {
    id: number;
    name: string;
    slug: string;
    gender: string;
    subTeams: [];
  };
  homeScore: {
    current: number;
    period1: number;
    normaltime: number;
  };
  awayScore: {
    current: number;
    period1: number;
    normaltime: number;
  };
  liveStatus: string;
};
