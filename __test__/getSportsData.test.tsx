import { getSportsData } from '@/lib/getSportsData';
import mockData from '../public/data/sports.json';

describe('getSportsData', () => {
  it('returns the sports data from JSON after delay', async () => {
    const data = await getSportsData();

    // Should return an array
    expect(Array.isArray(data)).toBe(true);

    // Should have at least one item
    expect(data.length).toBeGreaterThan(0);

    // Should match imported mock data
    expect(data).toEqual(mockData);
  }, 1000); // optional timeout in case CI is slow
});
