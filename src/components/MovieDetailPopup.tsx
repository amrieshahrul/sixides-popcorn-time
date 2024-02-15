'use client';
import {
	Pagination,
	Button,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
} from '@nextui-org/react';
import customMotionProps from '@/configs/customMotionProps.js';
import { useEffect, useMemo, useState } from 'react';
import { getYearFormat } from '@/helpers/time';
import Image from 'next/image';
import { movieCreditsAPI } from '@/client-api/movie';
import { CastType } from '@/interfaces/movie';
import ImageFallback from './ImageFallback';

interface MovieDetailPopupProps {
	isOpen: boolean,
	movieId: number|React.Key|null,
	onOpenChange: () => void,
}

export default function MovieDetailPopup ({
	isOpen,
	movieId,
	onOpenChange,
}: MovieDetailPopupProps) {

	const [ movieDetail, setMovieDetail ] = useState<any>({});
	const [ movieCredits, setMovieCredits ] = useState<any>({});


	const getMovieDetail = async () => {
		const response = await fetch(`/api/details/${movieId}`);
		const jsonResponse = await response.json();
		console.log('jsonResponse', jsonResponse);
		// setMovieDetail(jsonResponse);
		return Promise.resolve(jsonResponse);
	};

	const getMovieCredits = async () => {
		const response = await fetch(`/api/details/${movieId}/credits`);
		const jsonResponse = await response.json();
		console.log('getMovieCredits', jsonResponse);
		// setMovieDetail(jsonResponse);
		return Promise.resolve(jsonResponse);
	};

	const getMovieDataFromAPI = async () => {
		const [ detail, credits ] = await Promise.all([
			getMovieDetail(),
			movieCreditsAPI(movieId),
		]);

		setMovieDetail(detail);
		setMovieCredits(credits);
	};

	useEffect(() => {
		if (movieId) {
			// getMovieDetail();
			getMovieDataFromAPI();
		}


		// return () => {
		// 	setMovieDetail({});
		// 	setMovieCredits({});
		// };
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const computedDirectors = useMemo(() => {
		if (movieCredits) {
			return movieCredits.directors;
		}
	}, [movieCredits]);

	const computedWriters = useMemo(() => {
		if (movieCredits) {
			return movieCredits.writers;
		}
	}, [movieCredits]);

	const computedCasts = useMemo(() => {
		if (movieCredits) {
			return movieCredits.cast;
		}
	}, [movieCredits]);


	const computedImgSrc = useMemo(() => {
		return `${process.env.NEXT_PUBLIC_TMDB_IMG_DOMAIN}/w300${movieDetail?.poster_path}`;
	}, [movieDetail.poster_path]);


	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			scrollBehavior="outside"
			size="5xl"
			motionProps={customMotionProps}
		>
			<ModalContent>
				{(onClose) => (
					<div>
						<ModalHeader className="flex items-end gap-x-2">
							<h3>{movieDetail.title}</h3>
							<span className="font-light">({getYearFormat(movieDetail.release_date)})</span>
						</ModalHeader>
						<ModalBody>
							<div className="flex flex-col md:flex-row gap-y-6 md:gap-x-6">
								<ImageFallback
									src={computedImgSrc}
									width={300}
									height={300}
									alt={movieDetail?.tagline ?? ''}
									fallbackImage="/default-movie-poster.svg"
									className="rounded-xl h-96 w-3/4 mx-auto md:w-auto"
								/>
								<div className="flex flex-col gap-y-4">
									<div className="">
										<h4 className="text-tmdbLightGrey">Synopsis</h4>
										<p className="mt-3 text-primary-grey">{movieDetail.overview}</p>
									</div>

									<div className="">
										<h6 className="text-tmdbLightGrey">Release Date:</h6>
										<p className="mt-1 text-sm text-primary-grey">{movieDetail.release_date}</p>
									</div>
									<div className="flex gap-x-12 flex-wrap">
										{computedDirectors && computedDirectors.map((director: CastType) => (
											<div key={director.id} className="">
												<h6 className="text-tmdbLightGrey">Director:</h6>
												<p className="mt-1 text-sm text-primary-grey">{director.name}</p>
											</div>
										))}

										{computedWriters && computedWriters.map((writer: CastType) => (
											<div key={writer.id} className="">
												<h6	className="text-tmdbLightGrey">Writer:</h6>
												<p className="mt-1 text-sm text-primary-grey">{writer.name}</p>
											</div>

										))}
									</div>
									<div className="">
										<h6	className="text-tmdbLightGrey mb-2">Casts:</h6>
										<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
											{computedCasts && computedCasts.map((cast: CastType) => (
												<div key={cast.id} className="relative group">
													<ImageFallback
														src={`${process.env.NEXT_PUBLIC_TMDB_IMG_DOMAIN}/w300${cast.profile_path}`}
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
						</ModalBody>
						<ModalFooter>
							<Button color="danger" onPress={onClose}>
								Close
							</Button>
						</ModalFooter>
					</div>
				)}
			</ModalContent>
		</Modal>
	);
}