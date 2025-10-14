"use client";

import JobDetailsComponent from "@/components/common/JobDetailsComponent";
import RecommendedJobs from "@/components/jobs/RecommendedJobs";
import { Job, JobCardProps } from "@/types/types";
import { Theme, useMediaQuery } from "@mui/material";
import { useTranslations } from "next-intl";

interface Props {
	jobs: JobCardProps[];
	job: Job;
}

export default function ClientJobPage({ job, jobs }: Props) {
	const t = useTranslations();
	const md = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
	return (
		<>
			<JobDetailsComponent
				job={job}
			/>
			{jobs && jobs?.length > 0 && (
				<RecommendedJobs text={t("common.similarJobs")} md={md} jobs={jobs} />
			)}
		</>
	);
}
