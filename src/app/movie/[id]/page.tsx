import ImageFallback from '@/components/ImageFallback';
import { getFullPathImage } from '@/helpers/string';
import { CastType } from '@/interfaces/movie';
import {
	fetchMovieDetails,
	fetchMovieCastDetails,
} from '@/lib/movie-api';

export default async function MovieDetail ({
	params,
}: { params: { id: string }}) {

	const [ movieDetails, movieCastDetails ] = await Promise.all([
		fetchMovieDetails(params.id),
		fetchMovieCastDetails(params.id),
	]);

	return (
		<div className="generic-container py-10">
			<div className="flex flex-col md:flex-row gap-y-6 md:gap-x-6">
				<ImageFallback
					src={getFullPathImage(movieDetails.poster_path)}
					width={300}
					height={300}
					alt={movieDetails?.tagline ?? ''}
					fallbackImage="/default-movie-poster.svg"
					className="rounded-xl h-120 w-3/4 mx-auto md:mx-0 md:w-2/4"
				/>
				<div className="flex flex-col gap-y-4">
					<div className="">
						<h4 className="text-tmdbLightGrey">Synopsis</h4>
						<p className="mt-3 text-primary-grey">{movieDetails.overview}</p>
					</div>

					<div className="">
						<h6 className="text-tmdbLightGrey">Release Date:</h6>
						<p className="mt-1 text-sm text-primary-grey">{movieDetails.release_date}</p>
					</div>
					<div className="flex gap-x-12 gap-y-4 flex-wrap">
						{movieCastDetails && movieCastDetails.directors.map((director: CastType) => (
							<div key={director.id} className="">
								<h6 className="text-tmdbLightGrey">Director:</h6>
								<p className="mt-1 text-sm text-primary-grey">{director.name}</p>
							</div>
						))}

						{movieCastDetails && movieCastDetails.writers.map((writer: CastType) => (
							<div key={writer.id} className="">
								<h6	className="text-tmdbLightGrey">Writer:</h6>
								<p className="mt-1 text-sm text-primary-grey">{writer.name}</p>
							</div>

						))}
					</div>
					<div className="">
						<h6	className="text-tmdbLightGrey mb-2">Casts:</h6>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
							{movieCastDetails && movieCastDetails.crewMember.map((cast: CastType) => (
								<div key={cast.id} className="relative group">
									<ImageFallback
										src={getFullPathImage(cast.profile_path || '')}
										width={300}
										height={300}
										alt={cast.name}
										className="h-full w-full rounded-lg"
									/>
									<div className="transition absolute bottom-0 left-0 w-full text-center py-4 opacity-0 group-hover:opacity-100 bg-primary-grey rounded-lg">
										<div className="">{cast.name}</div>
										<div className="text-sm text-tmdbLightGrey">{cast.character}</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}