'use client';
import Image from 'next/image';
import { SyntheticEvent, useEffect, useState } from 'react';

interface ImageFallbackProp {
	fallbackImage?: string,
	alt: string,
	src: string,
	width: number,
	height: number,
	className: string,
}

export default function ImageFallback ({
	fallbackImage = '/profile-placeholder.svg',
	alt,
	src,
	...props
}: ImageFallbackProp) {

	const [ error, setError ] = useState<boolean | null | SyntheticEvent<HTMLImageElement, Event>>(null);

	useEffect(() => {
		setError(null);
	}, [src]);


	return (
		<Image
			onError={setError}
			src={error ? fallbackImage : src}
			alt={alt}
			{...props}
		/>
	);
}