import { format } from 'date-fns';

export const formatCustomDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000); 
  return format(date, 'MMM do HH:mm');    
};
