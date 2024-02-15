import { MovieContext } from '@/interfaces/movie';


export const GET_MOVIES = 'GET_MOVIES';
export const SORT_BY = 'SORT_BY';
export const FILTER_BY_GENRES = 'FILTER_BY_GENRES';
export const FILTER_BY_RATINGS = 'FILTER_BY_RATINGS';
export const FILTER_BY_MIN_RELEASE_DATE = 'FILTER_BY_MIN_RELEASE_DATE';
export const FILTER_BY_MAX_RELEASE_DATE = 'FILTER_BY_MAX_RELEASE_DATE';

export const SET_SORT_BY = 'SET_SORT_BY';
export const SET_FILTER_BY_GENRES = 'SET_FILTER_BY_GENRES';
export const SET_FILTER_BY_RATINGS = 'SET_FILTER_BY_RATINGS';
export const SET_FILTER_BY_MIN_RELEASE_DATE = 'SET_FILTER_BY_MIN_RELEASE_DATE';
export const SET_FILTER_BY_MAX_RELEASE_DATE = 'SET_FILTER_BY_MAX_RELEASE_DATE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

export const initial: MovieContext = {
	sortBy: 'popularity.desc',
	filterByGenres: [],
	currentPage: 1,
};


export const movieReducer = (state: any, action: any) => {
	const { type, payload } = action;

	switch (type) {
		case GET_MOVIES:
			return {
				...state,
				movieList: payload.movieList,
			};

		// Setter
		case SET_SORT_BY:
			return {
				...state,
				sortBy: payload.sortBy,
			};
		case SET_FILTER_BY_GENRES:
			return {
				...state,
				filterByGenres: payload.genres,
			};
		case SET_FILTER_BY_RATINGS:
			return {
				...state,
				filterByRatings: payload.ratings,
			};
		case SET_CURRENT_PAGE:
			return {
				...state,
				currentPage: payload.currentPage,
			};
	}
};