import {
	fetchMovieDetails,
	fetchMovieCastDetails,
} from '@/lib/movie-api';
import MovieDetailsModal from '@/components/MovieDetailsModal';

export default async function MovieDetail ({ params }: { params: { id: string } }) {

	const [ movieDetails, movieCastDetails ] = await Promise.all([
		fetchMovieDetails(params.id),
		fetchMovieCastDetails(params.id),
	]);

	return (
		<MovieDetailsModal
			movieDetails={movieDetails}
			movieCastDetails={movieCastDetails}
		/>
	);
}