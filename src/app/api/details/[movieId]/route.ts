import { type NextRequest } from 'next/server';
import fetching from '@/configs/fetching';

export async function GET (
	request: NextRequest,
	{ params }: { params: { movieId: string }}
) {
	const movieIdSlug = params.movieId;

	const resp = await fetching(`/movie/${movieIdSlug}`);
	const jsonResponse = await resp?.json();
	return Response.json(jsonResponse);
}