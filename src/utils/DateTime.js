import moment from "moment";

export const dateToLocale = (date, format = 'lll') => moment(date).format(format);
