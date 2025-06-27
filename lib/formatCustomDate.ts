/* eslint-disable @typescript-eslint/no-unused-vars */
import { format } from 'date-fns';

export const formatCustomDate = (input: string | number): string => {
  let date: Date;

  // Handle input types
  if (typeof input === 'number') {
    // If it's a UNIX timestamp (10 digits), convert from seconds to milliseconds
    date = new Date(input * 1000);
  } else {
    // Parse string like "06.08.2016."
    const parts = input.match(/(\d{2})\.(\d{2})\.(\d{4})/);
    if (!parts) return 'Invalid date';
    const [_, day, month, year] = parts;
    date = new Date(`${year}-${month}-${day}`);
  }

  if (isNaN(date.getTime())) return 'Invalid date';

  const day = date.getDate();
  const ordinal = getOrdinal(day);

  return `${format(date, 'MMM')} ${day}${ordinal} ${format(date, 'HH:mm')}`;
};

// Helper to get ordinal suffix (st, nd, rd, th)
const getOrdinal = (n: number): string => {
  if (n >= 11 && n <= 13) return 'th';
  switch (n % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};
