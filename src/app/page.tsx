import FilterPopup from '@/components/FilterPopup';
import FilterSidebar from '@/components/FilterSidebar';
import MovieList from '@/components/MovieList';
import SortByDropdown from '@/components/SortByDropdown';
import { fetchMovies } from './lib/movie-api';
import { ParamKeys } from '@/interfaces/movie';

interface SearchParamsProps {
	searchParams?: {
		[ParamKeys.SORT_BY]: string,
		[ParamKeys.PAGE]: string,
		[ParamKeys.WITH_GENRES]?: string,
		[ParamKeys.VOTE_GTE]?: string | undefined,
		[ParamKeys.VOTE_LTE]?: string | undefined,
	}
}

export default async function Home ({
	searchParams,
}: SearchParamsProps) {

	const [ movies ] = await Promise.all([
		fetchMovies({
			'sort_by': searchParams?.sort_by || 'popularity.desc',
			'page': searchParams?.page || '1',
			...(searchParams?.with_genres ? { 'with_genres': searchParams?.with_genres } : null),
			'vote_average.gte': searchParams?.['vote_average.gte'] || '0',
			'vote_average.lte': searchParams?.['vote_average.lte'] || '10',
		}),
	]);


	return (
		<main className="generic-container py-10 md:py-24 dark text-foreground bg-background">
			<h2 className="mb-10">Now Playing Movies</h2>
			<div className="flex justify-between gap-x-16">
				<div className="movie-sidebar hidden md:block md:w-2/12 mt-12">
					<FilterSidebar />
				</div>
				<div className="movie-list w-full md:w-10/12">
					<div className="flex justify-end gap-x-3">
						<div className="w-1/2 md:hidden">
							{/* <FilterPopup /> */}
						</div>
						<div className="w-1/2 md:w-3/12">
							<SortByDropdown />
						</div>
					</div>

					<div className="">
						<MovieList movieList={movies} />
						{/* {JSON.stringify(movies)} */}
					</div>
				</div>
			</div>
		</main>
	);
}
