import { Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import { memo } from "react";

import { JobCardProps } from "@/types/types";
import Heading from "../common/Heading";
import JobCardList from "../jobs/JobCardList";
import { useTranslations } from "next-intl";

const CompanyJobs = ({
	jobs,
	company,
}: {
	jobs: JobCardProps[];
	company: string;
}) => {
	const t = useTranslations();
	if (jobs?.length === 0) return null;
	return (
		<Box
			component="section"
			id="latest-jobs"
			sx={{
				py: 8,
				mt: 4,
				mb: -4,
				backgroundColor: "var(--neutral-lightest)",
				backgroundImage: `url(${"/images/bg/Pattern.png"})`,
				backgroundPositionX: "right",
				backgroundRepeat: "no-repeat",
				backgroundSize: "contain",
			}}
		>
			<Container maxWidth="lg">
				<Heading
					text={t("common.openJobs")}
					text_blue=""
					button_text="Show All Jobs"
					button_link={"/jobs?q=" + company}
				/>
				<Grid container spacing={2}>
					{jobs.map((job) => (
						<JobCardList key={job.id} job={job} md_size={6} />
					))}
				</Grid>
			</Container>
		</Box>
	);
};

export default memo(CompanyJobs);
