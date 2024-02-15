'use client';
import {
	Select,
	SelectItem,
	Card,
	CardHeader,
	CardBody,
	Image,
} from '@nextui-org/react';
import { sortByList } from '@/mocks/sortByList.js';
import { useEffect, useMemo, useState } from 'react';
import { useMovie } from '@/store/context/MovieContext';
import { MovieContext } from '@/interfaces/movie';

export default function SortByDropdown () {
	const [value, setValue] = useState<string>('');
	const { setSortBy, getMovies, sortBy }: MovieContext = useMovie();

	const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

		if (setSortBy) {
			setSortBy(e.target.value);
		}
	};

	// useEffect(() => {
	// 	if (getMovies) getMovies();
	// }, [sortBy]);

	return (
		<>
			<Select
				label="Sort by"
				size="sm"
				radius="full"
				defaultSelectedKeys={['popularity.desc']}
				classNames={{
					// 'base': 'w-2/12',
					'trigger': 'px-4',
				}}

				onChange={handleSelectionChange}
			>
				{sortByList.map((sort) => (
					<SelectItem key={sort.value} value={sort.value}>{sort.label}</SelectItem>
				))}
			</Select>
		</>
	);
}