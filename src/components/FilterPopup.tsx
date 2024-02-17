'use client';
import {
	Button,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
	Slider,
} from '@nextui-org/react';
import { genreList } from '@/mocks/genreList.js';
import styles from '@/styles/FilterSidebar.module.scss';
import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import customMotionProps from '@/configs/customMotionProps.js';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function FilterPopup () {
	const pathname = usePathname();
	const { replace } = useRouter();
	const searchParams = useSearchParams();

	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const [ genres, setGenres ] = useState<Number[]>([]);
	const [ ratingValue, setRatingValue ] = useState<number | number[] | string[]>([0, 10]);

	const onGenreClickHandler = (id: Number) => {
		if (!genres.includes(id)) {
			setGenres([...genres, id]);
		} else {
			const allGenres = genres;
			setGenres(allGenres.filter((genre) => genre !== id));
		}
	};

	const isGenreSelected = (genreId: Number): boolean => {
		return genres.includes(genreId);
	};

	const onFilterActionHandler = () => {
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

		onClose();
	};

	const setRatingHandler = (value: number | number[]) => {
		setRatingValue(value);
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

	useEffect(() => {
		setRatingValue(computedDefaultRatingValue);
	}, [computedDefaultRatingValue]);

	return (
		<>
			<Button radius="full" size="lg" onPress={onOpen} fullWidth><span className="text-sm">Filters</span></Button>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				scrollBehavior="inside"
				placement="center"
				motionProps={customMotionProps}
				classNames={{
					base: 'max-h-full',
				}}
			>
				<ModalContent>
					{(onClose) => (
						<div>
							<ModalHeader className="flex flex-col gap-1">
							Filters
							</ModalHeader>
							<ModalBody>
								<div className="flex flex-col gap-y-10 mt-10">
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

								</div>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									Close
								</Button>
								<Button color="primary" onPress={onFilterActionHandler}>
									Search
								</Button>
							</ModalFooter>
						</div>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}