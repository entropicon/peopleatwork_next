"use client";

import { JobCardProps } from "@/types/types";
import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Grid } from "@mui/material";
import Link from "next/link";
import Heading from "../common/Heading";
import JobCardList from "./JobCardList";
import { useTranslations } from "next-intl";
import React from "react";

interface RecommendedJobsProps {
	md: boolean;
	jobs: JobCardProps[];
	text: string;
	text_blue?: string;
}

const RecommendedJobs: React.FC<RecommendedJobsProps> = React.memo(
	({ md, jobs, text, text_blue }) => {
		const t = useTranslations();

		return (
			<Box
				component="section"
				id="latest-jobs"
				sx={{
					px: {
						xs: "2%",
						s: "4%",
						md: "6%",
					},
					pb: 8,
					mt: 4,
					backgroundColor: "var(--neutral-lightest)",
					backgroundImage: `url("/images/bg/Pattern.png")`, // fixed typo here
					backgroundPositionX: "right",
					backgroundRepeat: "no-repeat",
					backgroundSize: "contain",
				}}
			>
				<Heading
					text={text}
					text_blue={text_blue}
					button_text={t("common.showAllJobs")}
					button_link="/jobs"
				/>
				<Grid container spacing={1}>
					{jobs?.map((job) => (
						<JobCardList key={job?.id} job={job} md_size={6} />
					))}
				</Grid>
				{!md && (
					<Button
						variant="text"
						sx={{
							color: "var(--primary-color)",
						}}
						component={Link}
						href="/jobs"
						endIcon={
							<ArrowForward
								sx={{
									ml: 1,
									fill: "var(--primary-color)",
								}}
							/>
						}
					>
						{t("common.showAllJobs")}
					</Button>
				)}
			</Box>
		);
	}
);

export default RecommendedJobs;
RecommendedJobs.displayName = "RecommendedJobs";
