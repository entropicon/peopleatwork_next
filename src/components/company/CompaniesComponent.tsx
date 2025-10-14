"use client";

import { Company, Industry } from "@/types/types";
import { Grid, Typography } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import AdsLayout from "../common/AdsLayout";
import CompanyCard from "./CompanyCard";

const CompaniesComponent = ({
	industries,
	data,
}: {
	industries: Industry[];
	data: {
		data: Company[];
		page_count: number;
	};
}) => {
	const t = useTranslations();
	const lang = useLocale();
	const searchParams = useSearchParams();
	const sort = searchParams.get("sort") || "mostRelevant";
	const listStyleParam = searchParams.get("view") || "";
	const router = useRouter();
	const pathname = usePathname();

	const [listStyle, setListStyle] = useState<string>(
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
				industry: number[];
				view: string;
			}>
		) => {
			const urlParams = new URLSearchParams(searchParams.toString());

			if (params.page !== undefined) urlParams.set("page", String(params.page));
			if (params.sort !== undefined) urlParams.set("sort", params.sort);
			if (params.q !== undefined) urlParams.set("q", params.q);
			if (params.view !== undefined) urlParams.set("view", params.view);

			if (params.industry !== undefined) {
				if (params.industry.length > 0) {
					urlParams.set("industry", params.industry.join(","));
				} else {
					urlParams.delete("industry");
				}
			}
			if (
				params.page === undefined &&
				(params.sort !== undefined ||
					params.q !== undefined ||
					params.industry !== undefined)
			) {
				urlParams.set("page", "1");
			}

			router.replace(`${pathname}?${urlParams.toString()}`, { scroll: false });
		},
		[router, searchParams, pathname]
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

	const filterData = [
		{
			title: t("common.industry"),
			key: "industry",
			data: (industries || []).map((type) => ({
				...type,
				id: String(type.id),
			})),
		},
	];

	return (
		<AdsLayout
			pageCount={data?.page_count || 1}
			filterData={filterData}
			listingTitle={t("common.allCompanies")}
			setSort={setSortHandler}
			sort={sort}
			setListStyle={setListStyleHandler}
			listStyle={listStyle}
		>
			{data?.data?.length ? (
				data?.data?.map((company) => (
					<CompanyCard
						key={company.id}
						listStyle={listStyle}
						company={company}
						lang={lang}
					/>
				))
			) : (
				<Grid size={{ xs: 12 }}>
					<Typography>{t("common.notFoundAnyResults")}</Typography>
				</Grid>
			)}
		</AdsLayout>
	);
};

export default CompaniesComponent;
