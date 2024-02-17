export default async function fetching (url: String) {

	try {
		const response = await fetch(`${process.env.TMDB_API_ENDPOINT}${url}`, {
			headers: {
				Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
			},
		});

		return response;
	} catch (error) {
		console.error(error);
	}
}