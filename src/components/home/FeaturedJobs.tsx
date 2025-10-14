"use client";

import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Grid } from "@mui/material";

import { JobCardProps } from "@/types/types";
import Link from "next/link";
import Heading from "../common/Heading";
import JobCardGrid from "../jobs/JobCardGrid";
import { useTranslations } from "next-intl";
import { screenPadding } from "@/lib/utils";

const FeaturedJobs = ({ md, jobs }: { md: boolean; jobs: JobCardProps[] }) => {
	const t = useTranslations();
	return (
		<Box
			component="section"
			id="featured-jobs"
			sx={{
				px: screenPadding,
			}}
		>
			<Heading
				text={t("homePage.featuredJobs.text1")}
				text_blue={t("homePage.featuredJobs.text2")}
				button_text={t("common.showAllJobs")}
				button_link="/jobs"
			/>
			<Grid spacing={1} container>
				{jobs?.map((job) => (
					<JobCardGrid key={job.id} job={job} size={3} />
				))}
			</Grid>
			{!md && (
				<Button
					variant="text"
					sx={{
						color: "var(--primary-color)",
					}}
					component={Link}
					href={"/jobs"}
				>
					{t("common.showAllJobs")}
					<ArrowForward
						sx={{
							ml: 1,
							fill: "var(--primary-color)",
						}}
					/>
				</Button>
			)}
		</Box>
	);
};

export default FeaturedJobs;
