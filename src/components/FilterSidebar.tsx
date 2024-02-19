'use client';
import { useState, useMemo, useEffect } from 'react';
import { genreList } from '@/mocks/genreList.js';
import styles from '@/styles/FilterSidebar.module.scss';
import classNames from 'classnames';
import { Slider,
	Button,
} from '@nextui-org/react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function FilterSidebar () {

	const [ genres, setGenres ] = useState<number[]>([]);
	const [ ratingValue, setRatingValue ] = useState<number | number[] | string[]>([0, 10]);

	const pathname = usePathname();
	const { replace } = useRouter();
	const searchParams = useSearchParams();

	const onGenreClickHandler = (id: number) => {
		if (!genres.includes(id)) {
			setGenres([...genres, id]);
		} else {
			const allGenres = genres;
			setGenres(allGenres.filter((genre) => genre !== id));
		}
	};

	const computedGenresStringArray = useMemo(() => {
		const stringArray = genres.map((genre) => genre.toString());
		const arrayToString = stringArray.join(',');

		return arrayToString;
	}, [genres]);

	const computedDefaultGenresValue = useMemo(() => {

		if (searchParams.has('with_genres')) {
			const defaultParams = searchParams.get('with_genres');
			const decode = decodeURIComponent(defaultParams ?? '');
			return decode.split(',').map((genreId) => parseInt(genreId));
		}

		return [];

	}, [searchParams]);

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

	const isGenreSelected = (genreId: number): boolean => {
		return genres?.includes(genreId);
	};

	const setRatingHandler = (value: number | number[]) => {
		setRatingValue(value);
	};

	useEffect(() => {
		setRatingValue(computedDefaultRatingValue);
		setGenres(computedDefaultGenresValue);
	}, [
		computedDefaultRatingValue,
		computedDefaultGenresValue,
	]);

	return (
		<div className="flex flex-col gap-y-8 sticky top-12">
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