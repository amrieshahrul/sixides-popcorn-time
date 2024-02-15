'use client';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { genreList } from '@/mocks/genreList.js';
import styles from '@/styles/FilterSidebar.module.scss';
import classNames from 'classnames';
import { Slider,
	Input,
	Button,
} from '@nextui-org/react';
import { MovieContext } from '@/interfaces/movie';
import { useMovie } from '@/store/context/MovieContext';

export default function FilterSidebar () {

	const [ genres, setGenres ] = useState<Number[]>([]);

	const {
		setFilterByGenres,
		setFilterByRatings,
		getMovies,
		isGenreSelected,
		filterByRatings,
	}: MovieContext = useMovie();

	const onGenreClickHandler = (id: Number) => {
		// if (!genres.includes(id)) {
		// 	setGenres([...genres, id]);
		// } else {
		// 	const allGenres = genres;
		// 	setGenres(allGenres.filter((genre) => genre !== id));
		// }
		if (setFilterByGenres) {
			setFilterByGenres(id);
		}
	};

	const onRatingsChangeHandler = (ratingValue: Number | Number[]) => {
		if (setFilterByRatings) {
			setFilterByRatings(ratingValue);
		}
	};

	// useEffect(() => {
	// 	if (getMovies) {
	// 		getMovies();
	// 	}
	// }, []);

	const onFilterClickHandler = () => {

		if (getMovies) {
			getMovies();
		}
	};


	const computedSliderValue = useMemo(() => {
		const stringToArray = filterByRatings?.split(',').map((rating) => parseInt(rating));

		return stringToArray;
	}, [filterByRatings]);

	return (
		<div className="flex flex-col gap-y-8">
			{/* <div className="released-date">
				<div className="font-medium mb-2">Release Dates:</div>
				<div className="flex flex-col gap-y-3">
					<Input type="date" label="From" defaultValue="‎" />
					<Input type="date" label="To" defaultValue="‎" />
				</div>
			</div> */}
			<div className="ratings">
				<Slider
					label="Ratings:"
					step={1}
					maxValue={10}
					minValue={0}
					value={computedSliderValue}
					className="max-w-md"
					onChange={onRatingsChangeHandler}
					renderLabel={() => (
						<div className="font-medium">Ratings:</div>
					)}
				/>
			</div>
			<div className="genres-list">
				<div className="font-medium mb-2">Genres:</div>
				<div className="flex flex-wrap gap-y-2 gap-x-3">
					{genreList.map((genre) => {
						return (
							<button
								key={genre.id}
								type="button"
								className={classNames([
									styles.GenreButtonBase,
									isGenreSelected && isGenreSelected(genre.id) ? styles.GenreButtonActive : styles.GenreButton,
								])}
								onClick={() => onGenreClickHandler(genre.id)}
							>{genre.name}</button>
						);
					})}
				</div>
			</div>
			<div className="filter-button">
				<Button color="primary" fullWidth onClick={onFilterClickHandler}>
					Search
				</Button>
			</div>
		</div>
	);
}