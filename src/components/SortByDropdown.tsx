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
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function SortByDropdown () {
	const [value, setValue] = useState<string>('');
	const { setSortBy, getMovies, sortBy }: MovieContext = useMovie();

	const pathname = usePathname();
	const { replace } = useRouter();
	const searchParams = useSearchParams();

	const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

		const params = new URLSearchParams(searchParams);
		params.set('sort_by', e.target.value);

		replace(`${pathname}?${params.toString()}`);
	};

	const getCurrentSortByValue = (): string => {
		const params = new URLSearchParams(searchParams);
		console.log(params.get('sort_by'));
		const value = params.get('sort_by');
		return value ?? 'popularity.desc';
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
				defaultSelectedKeys={[getCurrentSortByValue()]}
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