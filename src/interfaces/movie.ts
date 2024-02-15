import React from 'react';

export interface MovieContext {
	movieList?: Object,
	movieResults?: [],
	sortBy: string,
	filterByGenres?: [],
	filterByRatings?: string,
	filterByMinReleaseDate?: string,
	filterByMaxReleaseDate?: string,

	setSortBy?: Function,
	setFilterByGenres?: Function,
	setFilterByRatings?: Function,
	setCurrentPage?: Function,

	getMovies?: Function,

	isGenreSelected?: (genreId: Number) => boolean,

	currentPage: number,
}

export interface MovieType {
	id?: React.Key,
	title: string,
	release_date: string,
	poster_path: string,
}