import { format } from 'date-fns';

export const formatCustomDate = (originalDate: string): string => {
    const dateObject = new Date(originalDate);
    return format(dateObject, 'dd/MM/yyyy HH\'h\'mm', );
};