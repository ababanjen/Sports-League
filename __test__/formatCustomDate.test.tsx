import { formatCustomDate } from "@/lib/formatCustomDate";

describe("formatCustomDate", () => {
  it('formats a UNIX timestamp into "MMM do HH:mm"', () => {
    const timestamp = 1470501000; // Aug 6, 2016 05:30:00 UTC
    const result = formatCustomDate(timestamp);

    // Depending on your timezone, adjust the expected output
    expect(result).toMatch(/Aug 7th \d{2}:\d{2}/);
  });

  it("returns correct format for a known date", () => {
    const knownTimestamp = Math.floor(
      new Date("2024-12-25T15:45:00Z").getTime() / 1000
    );
    const result = formatCustomDate(knownTimestamp);

    // Adjust based on your timezone; or use regex if unsure
    expect(result).toMatch(/Dec 25th \d{2}:\d{2}/);
  });
});
