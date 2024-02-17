'use client';
import { Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import customMotionProps from '@/configs/customMotionProps.js';
import { getYearFormat } from '@/helpers/time';
import { getFullPathImage } from '@/helpers/string';
import ImageFallback from './ImageFallback';
import { useMemo } from 'react';
import { CastType } from '@/interfaces/movie';

type MovieDetailsModalProps = {
	movieDetails: {
		[key: string]: string,

	},

	movieCastDetails: {
		crewMember: any[],
		cast: any,
		directors: any,
		writers: any,
	} | undefined,
}

export default function MovieDetailsModal ({
	movieDetails,
	movieCastDetails,
}: MovieDetailsModalProps) {

	const router = useRouter();

	const {
		isOpen,
		onOpen,
		onOpenChange,
		onClose } = useDisclosure({
		defaultOpen: true,
	});

	const onCloseHandler = () => {
		onClose();
		router.back();
	};

	const computedImgSrc = useMemo(() => {
		return `${process.env.NEXT_PUBLIC_TMDB_IMG_DOMAIN}/w300${movieDetails?.poster_path}`;
	}, [movieDetails.poster_path]);

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			onClose={onCloseHandler}
			scrollBehavior={'inside'}
			placement="center"
			size="5xl"
			motionProps={customMotionProps}
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex items-end gap-x-2">
							<h3>{movieDetails.title}</h3>
							<span className="font-light">({getYearFormat(movieDetails.release_date)})</span>
						</ModalHeader>
						<ModalBody>
							<div className="flex flex-col md:flex-row gap-y-6 md:gap-x-6">
								<ImageFallback
									src={computedImgSrc}
									width={300}
									height={300}
									alt={movieDetails?.tagline ?? ''}
									fallbackImage="/default-movie-poster.svg"
									className="rounded-xl h-96 w-3/4 mx-auto md:mx-0 md:w-auto"
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
						</ModalBody>
						<ModalFooter>
							<Button color="danger" onPress={onClose}>
								Close
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);

}