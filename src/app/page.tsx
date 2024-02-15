'use client';
import FilterPopup from '@/components/FilterPopup';
import FilterSidebar from '@/components/FilterSidebar';
import MovieList from '@/components/MovieList';
import SortByDropdown from '@/components/SortByDropdown';
import { MovieProvider } from '@/store/context/MovieContext';


export default function Home () {

	return (
		<MovieProvider>
			<main className="generic-container py-10 md:py-24 dark text-foreground bg-background">
				<h2 className="mb-10">Now Playing Movies</h2>
				<div className="flex justify-between gap-x-16">
					<div className="movie-sidebar hidden md:block md:w-2/12 mt-12">
						<FilterSidebar />
					</div>
					<div className="movie-list w-full md:w-10/12">
						<div className="flex justify-end gap-x-3">
							<div className="w-1/2 md:hidden">
								<FilterPopup />
							</div>
							<div className="w-1/2 md:w-3/12">
								<SortByDropdown />
							</div>
						</div>

						<div className="">
							<MovieList />
						</div>
					</div>
				</div>
			</main>
		</MovieProvider>
	);
}
