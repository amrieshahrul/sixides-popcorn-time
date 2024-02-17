import React from 'react';

export interface MovieContext {
	movieList?: MovieResult,
	movieResults?: [],
	sortBy: string,
	filterByGenres?: [],
	filterByRatings?: string,
	filterByMinReleaseDate?: string,
	filterByMaxReleaseDate?: string,

	setSortBy?: Function,
	setFilterByGenres?: (filterWhatGenre: Number) => void,
	setFilterByRatings?: Function,
	setCurrentPage?: (page: number) => void,

	getMovies?: Function,

	isGenreSelected?: (genreId: Number) => boolean,

	currentPage: number,
}

export interface MovieResult {
	page: number,
	total_pages: number,
	total_results: number,
	results: []
}

export interface MovieType {
	id?: React.Key,
	movieId?: number,
	title: string,
	release_date: string,
	poster_path: string,
}

export interface MovieParams {
	sortByWhat?: string,
	currentPage?: number,
	filterByGenres?: [],
	filterByRatings?: string,
}

export interface CastType {
	id: React.Key|string,
	name: string,
	character?: string,
	profile_path?: string | undefined,
}

export enum ParamKeys {
	SORT_BY = 'sort_by',
	PAGE = 'page',
	WITH_GENRES = 'with_genres',
	VOTE_GTE = 'vote_average.gte',
	VOTE_LTE = 'vote_average.lte',
}