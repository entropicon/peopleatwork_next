import { Job } from "@/types/types";
import { Container, Divider } from "@mui/material";
import JobDetailsHeading from "../jobs/JobDetailsHeading";
import JobDetailsTab from "../jobs/JobDetailsTab";
import JobOwnerCompany from "../jobs/JobOwnerCompany";

const JobDetailsComponent = ({ job }: { job: Job }) => {
	if (!job) {
		return null;
	}

	return (
		<Container
			maxWidth="lg"
			className="mt"
			sx={{
				mx: "auto",
				display: "flex",
				flexDirection: "column",
				gap: 1,
			}}
		>
			<JobDetailsHeading job={job} getJob={() => {}} />

			<JobDetailsTab job={job} />
			{!job?.is_company_confidential && <Divider />}
			{!job?.is_company_confidential && <JobOwnerCompany owner={job?.owner} />}
		</Container>
	);
};

export default JobDetailsComponent;
