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
import { useMovie } from '@/store/context/MovieContext';
import { MovieContext } from '@/interfaces/movie';
import { genreList } from '@/mocks/genreList.js';
import styles from '@/styles/FilterSidebar.module.scss';
import classNames from 'classnames';
import { useMemo } from 'react';
import customMotionProps from '@/configs/customMotionProps.js';

export default function FilterPopup () {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

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

	const onFilterActionHandler = () => {

		if (getMovies) {
			onClose();
			getMovies();
		}
	};

	const computedSliderValue = useMemo(() => {
		const stringToArray = filterByRatings?.split(',').map((rating) => parseInt(rating));

		return stringToArray;
	}, [filterByRatings]);

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
											value={computedSliderValue}
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