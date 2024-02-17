'use client';
import {
	Select,
	SelectItem,
} from '@nextui-org/react';
import { sortByList } from '@/mocks/sortByList.js';
import { useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function SortByDropdown () {
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
		const value = params.get('sort_by');
		return value ?? 'popularity.desc';
	};

	return (
		<>
			<Select
				label="Sort by"
				size="sm"
				radius="full"
				defaultSelectedKeys={[getCurrentSortByValue()]}
				classNames={{
					// 'base': 'w-2/12',
					'trigger': 'px-6 lg:px-4',
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