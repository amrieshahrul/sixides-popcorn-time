
const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
				'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				'primary-grey': '#777777',
				'primary-blue': '#17b7da',
				'divider-grey': '#f1f1f1',

				// TMDB color preset
				'tmdbLightGrey': '#e3e3e3',
				'tmdbDarkBlue': '#032541',
				'tmdbLightBlue': '#01b4e4',
				'tmdbLighterGreen': '#c0fed0',
				'tmdbLightGreen': '#1ed5a9',
				'tmdbLogoGreen': '#90cea1',
				'tmdbLogoOrange': '#fdc070',
				'tmdbLogoRed': '#d93b63',
			},
		},
	},
	plugins: [nextui()],
};
