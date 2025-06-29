import { sportTypes } from '../types/sport';

export async function getSportsData(): Promise<sportTypes[]> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; // Fallback for local dev

  const res = await fetch(`${baseUrl}/data/sports.json`);

  if (!res.ok) {
    throw new Error('Failed to fetch sport data');
  }

  const data: sportTypes[] = await res.json();
  return data;
}
