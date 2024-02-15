import { type NextRequest } from 'next/server';
import fetching from '@/configs/fetching';

export async function GET (request: NextRequest) {
	const { searchParams, search } = new URL(request.url);
	console.log('request', searchParams);

	const resp = await fetching(`/discover/movie${search}`);
	const jsonResponse = await resp?.json();
	return Response.json(jsonResponse);
}

// release_date.gte=2024-01-03
// release_date.lte=2024-02-14