import {format, parse} from 'date-fns';

export const formatCustomDateTime = (originalDate: string): string => {
    const localDateString = originalDate.replace(/Z$/, '')
    const dateObject = new Date(localDateString)
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

export function formatEventDate(startStr: string, endStr: string) {
    if (!endStr) {
        return `${startStr}`
    }

    const start = new Date(convertToISODate(startStr))
    const end = new Date(convertToISODate(endStr))

    const sameDay =
      start.getFullYear() === end.getFullYear() &&
      start.getMonth() === end.getMonth() &&
      start.getDay() === end.getDay()

    if (sameDay) {
        const formattedEndTime = format(end, "HH\'h\'mm")
        return `${startStr} - ${formattedEndTime}`
    } else {
        return `${startStr} - ${endStr}`
    }
}
