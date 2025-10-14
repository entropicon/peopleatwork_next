import { Job } from "@/types/types";
import { Box, Divider } from "@mui/material";
import JobDetailsHeading from "../jobs/JobDetailsHeading";
import JobDetailsTab from "../jobs/JobDetailsTab";
import JobOwnerCompany from "../jobs/JobOwnerCompany";
import { screenPadding } from "@/lib/utils";

const JobDetailsComponent = ({
	job,
}: {
	job: Job;
}) => {
	if (!job) {
		return null;
	}
	

	return (
		<Box>
			<Box
				sx={{
					mx: "auto",
					px: screenPadding,
					py: { xs: 3, md: 4 },
					display: "flex",
					flexDirection: "column",
					gap: 1,
					mt: { xs: "56px", md: "64px" },
				}}
			>
				<JobDetailsHeading
					job={job}
					getJob={() => {}}
				/>

					<JobDetailsTab job={job} />
					{!job?.is_company_confidential && <Divider />}
					{!job?.is_company_confidential && (
						<JobOwnerCompany owner={job?.owner} />
					)}
			
			</Box>
		</Box>
	);
};

export default JobDetailsComponent;
