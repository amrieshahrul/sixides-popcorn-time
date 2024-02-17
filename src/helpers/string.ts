export const getFullPathImage = (imagePath: string): string => {
	// TODO: w300 is enough for now.
	if (!imagePath) {
		return '';
	};
	return `${process.env.NEXT_PUBLIC_TMDB_IMG_DOMAIN}/w300${imagePath}`;
};