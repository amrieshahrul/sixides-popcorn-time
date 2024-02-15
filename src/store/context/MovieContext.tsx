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
import { MovieContext, MovieParams } from '@/interfaces/movie';
import { todayMinusOne, monthsFromToday } from '@/helpers/time';

const MovieContext = createContext<MovieContext>(initial);

export const MovieProvider = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
	const [ state, dispatch ] = useReducer(movieReducer, initial);

	const getAllMovieParams = ({
		sortByWhat,
		currentPage,
		filterByRatings,
		filterByGenres,

	}: MovieParams) => {
		const urlParams = new URLSearchParams();

		urlParams.set('sort_by', sortByWhat ?? state.sortBy);
		urlParams.set('page', currentPage ?? state.currentPage);

		if (filterByRatings || state.filterByRatings) {
			const ratings = filterByRatings?.split(',') ?? state.filterByRatings?.split(',');
			urlParams.set('vote_average.gte', ratings[0]);
			urlParams.set('vote_average.lte', ratings[1]);
		}

		if (filterByGenres || state.filterByGenres) {
			const selectedGenres = filterByGenres?.join(',') ?? state.filterByGenres.join(',');
			urlParams.set('with_genres', selectedGenres);
		}

		// Today minus one and 43 days past from today
		urlParams.set('release_date.lte', todayMinusOne());
		urlParams.set('release_date.gte', monthsFromToday());

		// Target for Malaysia region
		urlParams.set('watch_region', 'MY');

		// Show everthing
		urlParams.set('show_me', '0');


		return urlParams.toString();
	};

	const setSortBy: Function = async (sortByWhat: string) => {
		dispatch({
			type: SET_SORT_BY,
			payload: {
				sortBy: sortByWhat,
			},
		});

		// const urlParams = new URLSearchParams();
		// urlParams.set('sort_by', sortByWhat);

		const data = await fetch(`/api/discover?${getAllMovieParams({
			sortByWhat,
		})}`);
		const jsonResponse = await data.json();

		dispatch({
			type: GET_MOVIES,
			payload: {
				movieList: jsonResponse,
			},
		});
	};

	const setFilterByGenres = (filterWhatGenre: Number): void => {
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

		const data = await fetch(`/api/discover?${getAllMovieParams({
			sortByWhat: state.sortBy,
			currentPage: state.currentPage,
			filterByRatings: state.filterByRatings,
			filterByGenres: state.filterByGenres,

		})}`);
		const jsonResponse = await data.json();

		dispatch({
			type: GET_MOVIES,
			payload: {
				movieList: jsonResponse,
			},
		});
	};

	const setCurrentPage = async (page: number) => {
		dispatch({
			type: SET_CURRENT_PAGE,
			payload: {
				currentPage: page,
			},
		});

		const data = await fetch(`/api/discover?${getAllMovieParams({
			currentPage: page,
		})}`);
		const jsonResponse = await data.json();

		dispatch({
			type: GET_MOVIES,
			payload: {
				movieList: jsonResponse,
			},
		});
	};


	const value: MovieContext = {
		sortBy: state.sortBy,
		filterByGenres: state.filterByGenres,
		filterByRatings: state.filterByRatings,
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