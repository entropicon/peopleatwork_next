"use client";

import {
	Grid,
	Pagination
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import FilterBox from "./FilterBox";
import SearchBoxForJobs from "./SearchBoxForJobs";

const AdsLayout = ({
	children,
	pageCount,
	filterData,
	setSort,
	sort,
	setListStyle,
	listStyle,
}: {
	children: React.ReactNode;
	pageCount: number;
	filterData: {
		title: string;
		key: string;
		data: {
			id: string;
			name_en?: string;
			name_az?: string;
			name_ru?: string;
			count?: number;
		}[];
	}[];
	setSort: (sort: string) => void;
	sort: string;
	listingTitle: string;
	setListStyle: (style: string) => void;
	listStyle: string;
}) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const page = parseInt(searchParams.get("page") || "1", 10);
	

	const updatePage = useCallback(
		(pageNumber: number) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set("page", pageNumber.toString());
			router.replace(`?${params.toString()}`, { scroll: true });
		},
		[router, searchParams]
	);

	const handleSortChange = (event: {
		target: {
			value: string;
		};
	}) => {
		const newSort = event.target.value as string;
		setSort(newSort);
	};

	return (
		<Grid
			container
			spacing={2}
			sx={{
				placeItems: "flex-start",
				mb: 4,
			}}
		>
			<SearchBoxForJobs
				handleSortChange={handleSortChange}
				sort={sort}
				setListStyle={setListStyle}
				listStyle={listStyle}
			/>
			<Grid
				size={{
					xs: 12,
					lg: 3,
				}}
			>
				<FilterBox filterData={filterData} />
			</Grid>
			<Grid
				container
				spacing={1}
				size={{
					xs: 12,
					lg: 9,
				}}
			>
	
				{children}
				<Grid
					size={{
						xs: 12,
					}}
					sx={{
						py: "2rem",
						display: "flex",
						justifyContent: "center",
					}}
				>
					{pageCount > 1 && (
						<Pagination
							count={pageCount}
							page={page}
							onChange={(_e, value) => {
								updatePage(value);
							}}
							color="primary"
							shape="rounded"
							sx={{
								"& li button": {
									fontSize: "1rem",
									fontFamily: "Epilogue SemiBold",
								},
							}}
						/>
					)}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default AdsLayout;
