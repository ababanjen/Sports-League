/* eslint-disable @typescript-eslint/no-explicit-any */
import { cntPerFilterType } from '../lib/helpers';

jest.mock('@/lib/constants', () => ({
  filters: [
    { type: '', allias: 'all' },
    { type: 'inprogress', allias: 'live' },
    { type: 'notstarted', allias: 'upcoming' },
    { type: 'finished', allias: 'ended' },
    { type: 'cancelled', allias: 'cancelled' }
  ]
}));

describe('cntPerFilterType', () => {
  const mockData = [
    { status: { type: 'inprogress' } },
    { status: { type: 'inprogress' } },
    { status: { type: 'notstarted' } },
    { status: { type: 'notstarted' } },
    { status: { type: 'notstarted' } },
    { status: { type: 'finished' } },
    { status: { type: 'cancelled' } }
  ];

  it('returns correct counts per filter', () => {
    const result = cntPerFilterType(mockData as any);

    const mapByType = Object.fromEntries(result.map(r => [r.type || 'all', r.cnt]));

    expect(mapByType['inprogress']).toBe(2);
    expect(mapByType['notstarted']).toBe(3);
    expect(mapByType['finished']).toBe(1);
    expect(mapByType['cancelled']).toBe(1);
    expect(mapByType['all']).toBe(mockData.length);
  });
});
