import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { MovieProvider } from '@/store/context/MovieContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Popcorn Time!',
	description: 'Now playing movies in your theatre',
};

export default function RootLayout ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<Providers>
					<MovieProvider>
						{children}
					</MovieProvider>
				</Providers>
			</body>
		</html>
	);
}
