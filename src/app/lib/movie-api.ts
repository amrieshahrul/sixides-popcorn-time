'use server';
import fetching from '@/configs/fetching';
import { monthsFromToday, todayMinusOne } from '@/helpers/time';
import { ParamKeys } from '@/interfaces/movie';

interface SearchParamsProps {
	[key: string]: string,
}

export const fetchMovies = async (searchParams: SearchParamsProps) => {
	try {
		const params = new URLSearchParams();

		// if (searchParams.)

		// if (Object.keys(searchParams).length) {
		// 	const paramsKey = Object.keys(searchParams);

		// 	paramsKey.forEach((param) => {
		// 		params.set(param, searchParams[param]);
		// 	});
		// }

		if (searchParams['sort_by']) {
			params.set(ParamKeys.SORT_BY, searchParams[ParamKeys.SORT_BY]);
		}

		if (searchParams['page']) {
			params.set(ParamKeys.PAGE, searchParams[ParamKeys.PAGE]);
		}

		if (searchParams['with_genres']) {
			params.set(ParamKeys.WITH_GENRES, searchParams[ParamKeys.WITH_GENRES]);
		}

		if (searchParams['vote_average.gte'] && searchParams['vote_average.lte']) {
			params.set(ParamKeys.VOTE_GTE, searchParams[ParamKeys.VOTE_GTE]);
			params.set(ParamKeys.VOTE_LTE, searchParams[ParamKeys.VOTE_LTE]);
		}

		// Today minus one and 43 days past from today
		params.set('release_date.lte', todayMinusOne());
		params.set('release_date.gte', monthsFromToday());

		// Target for Malaysia region
		params.set('watch_region', 'MY');

		// Show everthing
		params.set('show_me', '0');

		console.log(`/discover/movie?${params.toString()}`);

		const resp = await fetching(`/discover/movie?${params.toString()}`);
		const jsonResponse = await resp?.json();

		return jsonResponse;
	} catch (err) {
		console.error('fetchMovies', err);
	}
};