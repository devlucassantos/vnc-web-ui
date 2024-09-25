import {format, parse} from 'date-fns';

export const formatCustomDateTime = (originalDate: string): string => {
    const dateObject = new Date(originalDate);
    return format(dateObject, 'dd/MM/yyyy HH\'h\'mm');
};

export const formatCustomDate = (originalDate: string): string => {
    const dateObject = new Date(originalDate);
    return format(dateObject, 'dd/MM/yyyy');
};

export const convertToISODate = (formattedDate: string): string => {
    const dateObject = parse(formattedDate, 'dd/MM/yyyy HH\'h\'mm', new Date());
    return dateObject.toISOString();
};