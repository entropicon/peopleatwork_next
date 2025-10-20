"use client";

import { Grid, Typography, useMediaQuery } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo } from "react";

import { jobLevel } from "@/constants/variables";
import theme from "@/theme/theme";
import JobCardGrid from "../jobs/JobCardGrid";
import JobCardList from "../jobs/JobCardList";
import AdsLayout from "./AdsLayout";
import { Category, EmployeesTypes, JobCardProps } from "@/types/types";
import ApplyGuestJobDialog from "../jobs/ApplyGuestJobDialog";

interface JobsComponentProps {
	jobs: {
		jobs: JobCardProps[];
		total_pages: number;
	};
	employmentTypes: EmployeesTypes[];
	categories: Category[];
}

const JobsComponent: React.FC<JobsComponentProps> = ({
	jobs,
	employmentTypes,
	categories,
}) => {
	const t = useTranslations();
	const [open, setOpen] = React.useState(false);
	const [jobId, setJobId] = React.useState<number | null>(null);
	const router = useRouter();
	const searchParams = useSearchParams();
	const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"), {
		noSsr: true,
	});
	const sort = searchParams.get("sort") || "mostRelevant";
	const listStyleParam = searchParams.get("view") || "";

	const [listStyle, setListStyle] = React.useState<string>(
		listStyleParam === "grid" || listStyleParam === "list"
			? listStyleParam
			: "grid"
	);

	const updateQueryParams = useCallback(
		(
			params: Partial<{
				page: number;
				sort: string;
				q: string;
				employment_type: number[];
				category: number[];
				job_level: number[];
				view: string;
			}>
		) => {
			const urlParams = new URLSearchParams(searchParams.toString());

			if (params.page !== undefined) urlParams.set("page", String(params.page));
			if (params.sort !== undefined) urlParams.set("sort", params.sort);
			if (params.q !== undefined) urlParams.set("q", params.q);
			if (params.view !== undefined) urlParams.set("view", params.view);

			if (params.employment_type !== undefined) {
				if (params.employment_type.length > 0) {
					urlParams.set("employment_type", params.employment_type.join(","));
				} else {
					urlParams.delete("employment_type");
				}
			}

			if (params.category !== undefined) {
				if (params.category.length > 0) {
					urlParams.set("category", params.category.join(","));
				} else {
					urlParams.delete("category");
				}
			}

			if (params.job_level !== undefined) {
				if (params.job_level.length > 0) {
					urlParams.set("job_level", params.job_level.join(","));
				} else {
					urlParams.delete("job_level");
				}
			}

			if (
				params.page === undefined &&
				(params.sort !== undefined ||
					params.q !== undefined ||
					params.employment_type !== undefined ||
					params.category !== undefined ||
					params.job_level !== undefined)
			) {
				urlParams.set("page", "1");
			}

			router.replace(`?${urlParams.toString()}`, { scroll: false });
		},
		[router, searchParams]
	);

	const setListStyleHandler = useCallback(
		(style: string) => {
			setListStyle(style);
			localStorage.setItem("listStyle", style);
			updateQueryParams({ view: style });
		},
		[updateQueryParams]
	);

	const setSortHandler = useCallback(
		(newSort: string) => {
			updateQueryParams({ sort: newSort });
		},
		[updateQueryParams]
	);

	useEffect(() => {
		if (listStyleParam === "grid" || listStyleParam === "list") {
			setListStyle(listStyleParam);
			if (typeof window !== "undefined") {
				localStorage.setItem("listStyle", listStyleParam);
			}
			return;
		}
		if (typeof window !== "undefined") {
			const savedStyle = localStorage.getItem("listStyle");
			if (savedStyle === "grid" || savedStyle === "list") {
				setListStyle(savedStyle);
			}
		}
	}, [listStyleParam]);

	const filterData = useMemo(
		() => [
			{
				title: t("common.employmentType"),
				key: "employment_type",
				data: (employmentTypes || []).map((type) => ({
					...type,
					id: String(type.id),
				})),
			},
			{
				title: t("common.categories"),
				key: "category",
				data: (categories || []).map((category) => ({
					...category,
					id: String(category.id),
				})),
			},
			{
				title: t("common.jobLevel"),
				key: "job_level",
				data: jobLevel.map((level) => ({
					...level,
					id: String(level.id),
				})),
			},
		],
		[t, employmentTypes, categories]
	);

	const handleQuickApply = useCallback(
		(jobId: number) => {
			setOpen(true);
			setJobId(jobId);
		},
		[setOpen]
	);

	return (
		<>
			<ApplyGuestJobDialog open={open} setOpen={setOpen} job={String(jobId)} />
			<AdsLayout
				pageCount={jobs?.total_pages || 0}
				filterData={filterData}
				setSort={setSortHandler}
				sort={sort}
				listingTitle={t("common.jobListing")}
				setListStyle={setListStyleHandler}
				listStyle={listStyle}
			>
				{jobs?.jobs?.length > 0 ? (
					jobs.jobs?.map((job) =>
						listStyle === "grid" || isMediumScreen ? (
							<JobCardGrid
								key={job.id}
								job={job}
								size={4}
								onQuickApply={handleQuickApply}
							/>
						) : (
							<JobCardList
								key={job.id}
								job={job}
								md_size={12}
								onQuickApply={handleQuickApply}
							/>
						)
					)
				) : (
					<Grid
						size={{
							xs: 12,
						}}
					>
						<Typography>{t("common.notFoundAnyResults")}</Typography>
					</Grid>
				)}
			</AdsLayout>
		</>
	);
};

export default JobsComponent;
