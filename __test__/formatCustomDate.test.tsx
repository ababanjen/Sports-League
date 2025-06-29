import { formatCustomDate } from '@/lib/formatCustomDate'

describe('formatCustomDate', () => {
  it('formats string date "06.08.2016." as "Aug 6th 08:00"', () => {
    expect(formatCustomDate("06.08.2016.")).toBe("Aug 6th 08:00")
  })

  it('formats string date "01.01.2024." with "st" ordinal', () => {
    expect(formatCustomDate("01.01.2024.")).toBe("Jan 1st 08:00")
  })

  it('formats string date "02.02.2024." with "nd" ordinal', () => {
    expect(formatCustomDate("02.02.2024.")).toBe("Feb 2nd 08:00")
  })

  it('formats string date "03.03.2024." with "rd" ordinal', () => {
    expect(formatCustomDate("03.03.2024.")).toBe("Mar 3rd 08:00")
  })

  it('formats string date "11.04.2024." with "th" ordinal', () => {
    expect(formatCustomDate("11.04.2024.")).toBe("Apr 11th 08:00")
  })

  it('formats UNIX timestamp 1719829800 correctly', () => {
    // 1719829800 = Sun, 1 Jul 2024 06:30:00 
    expect(formatCustomDate(1719829800)).toBe("Jul 1st 18:30")
  })

  it('returns "Invalid date" for badly formatted date string', () => {
    expect(formatCustomDate("invalid date")).toBe("Invalid date")
  })

  it('returns "Invalid date" for wrong UNIX timestamp', () => {
    expect(formatCustomDate(0)).toBe("Jan 1st 08:00") // Adjust based on timezone!
  })
})
