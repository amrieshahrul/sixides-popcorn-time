'use client';
import { useState, useMemo, useCallback, useEffect, SetStateAction, Dispatch } from 'react';
import { genreList } from '@/mocks/genreList.js';
import styles from '@/styles/FilterSidebar.module.scss';
import classNames from 'classnames';
import { Slider,
	Input,
	Button,
} from '@nextui-org/react';
import { MovieContext } from '@/interfaces/movie';
import { useMovie } from '@/store/context/MovieContext';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

// interface RatingType {
// 	key: string[string] | number
// }

export default function FilterSidebar () {

	const [ genres, setGenres ] = useState<Number[]>([]);
	const [ ratingValue, setRatingValue ] = useState<number | number[] | string[]>([0, 10]);

	const pathname = usePathname();
	const { replace } = useRouter();
	const searchParams = useSearchParams();

	const {
		// setFilterByGenres,
		// setFilterByRatings,
		// getMovies,
		// isGenreSelected,
		filterByRatings,
	}: MovieContext = useMovie();

	const onGenreClickHandler = (id: Number) => {
		if (!genres.includes(id)) {
			setGenres([...genres, id]);
		} else {
			const allGenres = genres;
			setGenres(allGenres.filter((genre) => genre !== id));
		}
		// if (setFilterByGenres) {
		// 	setFilterByGenres(id);
		// }
	};

	const onRatingsChangeHandler = (ratingValue: Number | Number[]) => {
		// if (setFilterByRatings) {
		// 	setFilterByRatings(ratingValue);
		// }
	};



	const computedGenresStringArray = useMemo(() => {
		const stringArray = genres.map((genre) => genre.toString());
		const arrayToString = stringArray.join(',');

		return encodeURIComponent(arrayToString);
	}, [genres]);

	const computedSliderValue = useMemo(() => {
		const currentValue: number[] | any = ratingValue;

		return {
			'voteAverageGte': currentValue[0].toString(),
			'voteAverageLte': currentValue[1].toString(),
		};
	}, [ratingValue]);

	const computedDefaultRatingValue = useMemo(() => {
		if (!(searchParams.get('vote_average.gte') || searchParams.get('vote_average.lte'))) {
			return [0, 10];
		}

		const voteGte = searchParams.get('vote_average.gte');
		const voteLte = searchParams.get('vote_average.lte');

		return [
			parseInt(voteGte || '0'),
			parseInt(voteLte || '10'),
		];
	}, [searchParams]);

	const onFilterClickHandler = () => {
		const params = new URLSearchParams(searchParams);

		if (computedGenresStringArray) {
			params.set('with_genres', computedGenresStringArray);
		} else {
			params.delete('with_genres');
		}

		if (computedSliderValue) {
			params.set('vote_average.gte', computedSliderValue.voteAverageGte);
			params.set('vote_average.lte', computedSliderValue.voteAverageLte);
		}

		replace(`${pathname}?${params.toString()}`);
	};

	const isGenreSelected = (genreId: Number): boolean => {
		return genres.includes(genreId);
	};

	const setRatingHandler = (value: number | number[]) => {
		setRatingValue(value);
	};

	useEffect(() => {
		setRatingValue(computedDefaultRatingValue);
	}, [computedDefaultRatingValue]);

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
					className="max-w-md"
					defaultValue={computedDefaultRatingValue}
					onChange={setRatingHandler}
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