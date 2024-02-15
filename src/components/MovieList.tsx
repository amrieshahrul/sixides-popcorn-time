'use client';
import { useMovie } from '@/store/context/MovieContext';
import MovieTile from './MovieTile';
import { MovieContext, MovieType } from '@/interfaces/movie';
import {
	Pagination,
	Button,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import MovieDetailPopup from './MovieDetailPopup';

export default function MovieList () {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure({
		defaultOpen: false,
	});
	const [ currentMovieId, setCurrentMovieId ] = useState<number|React.Key|null>(null);

	const { movieList, getMovies, currentPage, setCurrentPage }: MovieContext = useMovie();

	useEffect(() => {
		if (getMovies) getMovies();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	const onMovieTileClickHandler = (id: number|React.Key) => {
		onOpen();
		setCurrentMovieId(id);
	};

	return (
		<>
			<div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
				{movieList && movieList.results.map((movie: MovieType) => (
					<MovieTile
						key={movie.id}
						movieId={movie.id}
						title={movie.title}
						posterPath={movie.poster_path}
						releaseDate={movie.release_date}
						onClick={(id) => onMovieTileClickHandler(id)}
					/>
				))}
			</div>

			{movieList && movieList.total_pages > 1 && (
				<div className="pagination mt-10 flex justify-center">
					<Pagination isCompact showControls total={movieList?.total_pages} page={currentPage} onChange={setCurrentPage} />
				</div>
			)}

			{isOpen && (
				<MovieDetailPopup movieId={currentMovieId} isOpen={isOpen} onOpenChange={onOpenChange} />
			)}
		</>
	);

};