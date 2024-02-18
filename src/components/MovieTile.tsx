'use-client';
import {
	Select,
	SelectItem,
	Card,
	CardHeader,
	CardBody,
	Image,
} from '@nextui-org/react';
import React, { useMemo } from 'react';

interface MovieTileProp {
	movieId?: number|React.Key,
	title: string,
	releaseDate: string,
	posterPath: string,
	onClick?: (id: number|string|React.Key) => void,
}

export default function MovieTile ({ movieId, title, releaseDate, posterPath, onClick }: MovieTileProp) {

	const computedPosterPath = useMemo(() => {
		if (posterPath !== null) {
			return `${process.env.NEXT_PUBLIC_TMDB_IMG_DOMAIN}/w300${posterPath}`;
		}
	}, [posterPath]);

	return (
		<Card className="py-4 pt-0 w-full h-full">
			<CardBody className="overflow-visible py-2">
				<Image
					alt={title}
					className="object-cover rounded-xl"
					src={computedPosterPath}
					width={270}
					fallbackSrc="/default-movie-poster.svg"
					classNames={{
						'wrapper': 'w-full !max-w-full h-26 md:h-60  bg-cover bg-center',
						'img': 'w-full h-full',
					}}
				/>
			</CardBody>

			<CardHeader className="pb-0 pt-2 px-4 flex-col items-start text-left">
				<h4 className="font-bold text-large">{title}</h4>
				<p className="text-tiny uppercase font-semibold mt-4">{releaseDate}</p>
				{/* <small className="text-default-500">12 Tracks</small> */}
			</CardHeader>
		</Card>
	);
}