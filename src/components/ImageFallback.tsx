'use client';
import Image from 'next/image';
import { useState } from 'react';

interface ImageFallbackProp {
	fallbackImage: string,
	alt: string,
	src: string,
}

export default function ImageFallback ({
	fallbackImage = '/profile-placeholder.svg',
	alt,
	src,
	...props
}: ImageFallbackProp) {

	const [ error, setError ] = useState(false);



	return (
		<Image
			onError={() => setError(true)}
			src={error ? fallbackImage : src}
			alt={alt}
			{...props}
		/>
	);
}