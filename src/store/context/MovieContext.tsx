import React, { useContext, createContext, useReducer } from 'react';
import {
	initial,
	movieReducer,
	SET_SORT_BY,
	SET_FILTER_BY_GENRES,
	SET_FILTER_BY_RATINGS,
	GET_MOVIES,
	SET_CURRENT_PAGE,
} from '../reducer/movieReducer';
import { MovieContext } from '@/interfaces/movie';
import { todayMinusOne, monthsFromToday } from '@/helpers/time';

const MovieContext = createContext<MovieContext>(initial);

export const MovieProvider = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
	const [ state, dispatch ] = useReducer(movieReducer, initial);

	const setSortBy: Function = async (sortByWhat: string) => {
		dispatch({
			type: SET_SORT_BY,
			payload: {
				sortBy: sortByWhat,
			},
		});
	};

	const setFilterByGenres = (filterWhatGenre: Number) => {
		if (!state.filterByGenres.includes(filterWhatGenre)) {
			const selectedGenres = [ ...state.filterByGenres, filterWhatGenre];

			dispatch({
				type: SET_FILTER_BY_GENRES,
				payload: {
					genres: selectedGenres,
				},
			});
		} else {
			dispatch({
				type: SET_FILTER_BY_GENRES,
				payload: {
					genres: state.filterByGenres.filter((genre: Number) => genre !== filterWhatGenre),
				},
			});
		}
	};

	const isGenreSelected = (genreId: Number): boolean => {
		return state.filterByGenres.includes(genreId);
	};

	const setFilterByRatings = (ratingsValue: Number): void => {
		dispatch({
			type: SET_FILTER_BY_RATINGS,
			payload: {
				ratings: ratingsValue.toString(),
			},
		});
	};


	const getMovies = async () => {
		const urlParams = new URLSearchParams();

		if (state.sortBy) {
			urlParams.set('sort_by', state.sortBy);
		}

		if (state.currentPage) {
			urlParams.set('page', state.currentPage);
		}

		if (state.filterByRatings) {
			urlParams.set('vote_count.gte', state.filterByRatings);
		}

		if (state.filterByGenres.length) {
			const selectedGenres = state.filterByGenres.join(',');
			urlParams.set('with_genres', selectedGenres);
		}

		urlParams.set('release_date.lte', todayMinusOne());
		urlParams.set('release_date.gte', monthsFromToday());

		// release_date.gte=2024-01-03

		const data = await fetch(`/api/discover?${urlParams.toString()}`);
		const jsonResponse = await data.json();

		dispatch({
			type: GET_MOVIES,
			payload: {
				movieList: jsonResponse,
			},
		});
	};

	const setCurrentPage = (page: number) => {
		dispatch({
			type: SET_CURRENT_PAGE,
			payload: {
				currentPage: page,
			},
		});
	};


	const value: MovieContext = {
		sortBy: state.sortBy,
		filterByGenres: state.filterByGenres,
		isGenreSelected,

		setSortBy,
		setFilterByGenres,
		setFilterByRatings,
		setCurrentPage,

		getMovies,

		movieList: state.movieList,
		currentPage: state.currentPage,
	};

	return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};

export const useMovie = () => {
	const context = useContext(MovieContext);

	if (context === undefined) {
		throw new Error('useMovie must be used within MovieContext');
	}

	return context;
};


// const data = await fetch(`/api/discover?sort_by=popularity.asc&vote_count.gte=500&primary_release_date.gte=2024-01-03&primary_release_date.lte=2024-02-14&with_genres=28,18`);