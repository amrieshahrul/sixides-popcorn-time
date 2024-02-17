'use client';
import MovieTile from './MovieTile';
import { MovieType } from '@/interfaces/movie';
import {
	Pagination,
	useDisclosure,
} from '@nextui-org/react';
import { useMemo, useState } from 'react';
import MovieDetailPopup from './MovieDetailPopup';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

type MovieListProp = {
	[key: string]: {
		results: [],
		total_pages: number,
		page: number,
	}
}

export default function MovieList ({ movieList }: MovieListProp) {
	const pathname = usePathname();
	const { replace } = useRouter();
	const searchParams = useSearchParams();

	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure({
		defaultOpen: false,
	});
	const [ currentMovieId, setCurrentMovieId ] = useState<number|React.Key|null>(null);

	// const [ currentPage, setCurrentPage ] = useState<number>(1);


	const computedDefaultPaginationValue: number = useMemo(() => {
		if (!searchParams.get('page')) {
			return 1;
		}

		const defaultPageNumber = searchParams.get('page');

		return parseInt(defaultPageNumber || '1');
	}, [searchParams]);


	const onMovieTileClickHandler = (id: number|React.Key) => {
		onOpen();
		setCurrentMovieId(id);
	};

	const setCurrentPageHandler = (page: number) => {
		const params = new URLSearchParams(searchParams);
		params.set('page', page.toString());

		replace(`${pathname}?${params.toString()}`);
	};

	// useEffect(() => {
	// 	setCurrentPage(computedDefaultPaginationValue);
	// }, [computedDefaultPaginationValue]);

	return (
		<>
			<div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
				{movieList && movieList.results.map((movie: MovieType) => (
					<Link key={movie.id} href={{
						pathname: `/movie/${movie.id}`,
						search: searchParams.toString(),
					}} scroll={false}>
						<MovieTile
							movieId={movie.id}
							title={movie.title}
							posterPath={movie.poster_path}
							releaseDate={movie.release_date}
						/>
					</Link>
				))}
			</div>

			{movieList && movieList.total_pages > 1 && (
				<div className="pagination mt-10 flex justify-center">
					<Pagination
						isCompact
						showControls
						total={movieList?.total_pages}
						page={computedDefaultPaginationValue}
						onChange={setCurrentPageHandler} />
				</div>
			)}

			{/* {isOpen && (
				<MovieDetailPopup movieId={currentMovieId} isOpen={isOpen} onOpenChange={onOpenChange} />
			)} */}
		</>
	);

};