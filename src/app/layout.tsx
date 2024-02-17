import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Popcorn Time!',
	description: 'Now playing movies in your theatre',
};

export default function RootLayout ({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode,
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<Providers>
					{children}
					{modal}
				</Providers>
			</body>
		</html>
	);
}
