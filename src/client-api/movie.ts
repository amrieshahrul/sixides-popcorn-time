import { filter } from 'lodash';

export async function movieCreditsAPI (movieId: any) {
	const response = await fetch(`/api/details/${movieId}/credits`);
	const { cast, crew } = await response?.json();

	const crewMember = filter(crew, (cast: any) => ['Director', 'Writer', 'Characters'].includes(cast.job));

	const directors = filter(crew, (cast: any) => ['Director'].includes(cast.job));

	const writers = filter(crew, (cast: any) => ['Writer'].includes(cast.job));

	return {
		crewMember,
		cast,
		directors,
		writers,
	};
}