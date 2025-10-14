"use client";

import { JobCategories } from "@/types/types";
import { ArrowForward } from "@mui/icons-material";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

interface CategoryCardProps {
	category: JobCategories;
}

const CategoryCard: React.FC<CategoryCardProps> = React.memo(({ category }) => {
	const lang = useLocale();
	const t = useTranslations();
	return (
		<Grid
			size={{
				xs: 12,
				sm: 6,
				md: 3,
			}}
			sx={{
				p: 3,
				border: "1px solid var(--border-color)",
				transition: "all .3s",
				borderRadius: "1rem",
				textDecoration: "none",
				"&:hover": {
					backgroundColor: "var(--primary-color)",
					backdropFilter: "blur(100px)",
					"& *": {
						color: "white",
					},
					"& path": {
						stroke: "white",
					},
				},
			}}
		>
			<Link href={"/jobs?q=" + category.name_en}>
				<Stack
					direction={{
						xs: "row",
						md: "column",
					}}
					spacing={2}
					alignItems={{
						xs: "center",
						sm: "flex-start",
					}}
				>
					<Box>
						<Typography variant="h5">
							{category[`name_${lang as "en" | "az" | "ru"}`]}
						</Typography>
						<Stack
							direction="row"
							spacing={1}
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<Typography
								variant="body1"
								sx={{
									color: "var(--neutral-darker)",
								}}
							>
								{category.job_count} {t("common.jobs")}
							</Typography>
							<ArrowForward />
						</Stack>
					</Box>
				</Stack>
			</Link>
		</Grid>
	);
});
CategoryCard.displayName = "CategoryCard";
export default CategoryCard;
