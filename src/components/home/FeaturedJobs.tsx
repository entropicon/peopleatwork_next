"use client";

import { ArrowForward } from "@mui/icons-material";
import { Button, Container, Grid } from "@mui/material";

import { JobCardProps } from "@/types/types";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Heading from "../common/Heading";
import JobCardGrid from "../jobs/JobCardGrid";

const FeaturedJobs = ({ md, jobs }: { md: boolean; jobs: JobCardProps[] }) => {
	const t = useTranslations();
	return (
		<Container maxWidth="lg"
			component="section"
			id="featured-jobs"
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
		</Container>
	);
};

export default FeaturedJobs;
