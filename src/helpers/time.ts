import dayjs from 'dayjs';

export const todayMinusOne = (): string => {
	return dayjs().subtract(1, 'day').format('YYYY-MM-DD');
};

export const monthsFromToday = (): string => {
	return dayjs().subtract(43, 'days').format('YYYY-MM-DD');
};

export const getYearFormat = (date: string) => {
	return dayjs(date).format('YYYY');
};

