/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSportsData } from '@/lib/getSportsData'

describe('getSportsData', () => {
  const mockSports: any[] = [
    {
      id: 1,
      country: 'USA',
      competition: 'NBA',
      date: '2024-06-30T10:30:00Z',
      homeScore: { current: 102 },
      awayScore: { current: 98 },
      homeTeam: { name: 'Lakers' },
      awayTeam: { name: 'Heat' },
      status: { type: 'finished' },
      liveStatus: '-',
    },
  ]

  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('fetches sports data successfully', async () => {
    const mockJson = jest.fn().mockResolvedValue(mockSports)
    const mockFetch = jest.fn().mockResolvedValue({ ok: true, json: mockJson })

    global.fetch = mockFetch as unknown as typeof fetch

    const data = await getSportsData()

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:3000/data/sports.json'
    )
    expect(data).toEqual(mockSports)
  })

  it('throws an error if fetch fails', async () => {
    const mockFetch = jest.fn().mockResolvedValue({ ok: false })
    global.fetch = mockFetch as unknown as typeof fetch

    await expect(getSportsData()).rejects.toThrow('Failed to fetch sport data')
  })

  it('uses NEXT_PUBLIC_BASE_URL if defined', async () => {
    const originalEnv = process.env.NEXT_PUBLIC_BASE_URL
    process.env.NEXT_PUBLIC_BASE_URL = 'https://example.com'

    const mockJson = jest.fn().mockResolvedValue(mockSports)
    const mockFetch = jest.fn().mockResolvedValue({ ok: true, json: mockJson })

    global.fetch = mockFetch as unknown as typeof fetch

    await getSportsData()

    expect(mockFetch).toHaveBeenCalledWith(
      'https://example.com/data/sports.json'
    )

    process.env.NEXT_PUBLIC_BASE_URL = originalEnv // Restore
  })
})
