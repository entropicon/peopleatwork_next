import JobsComponent from "@/components/common/JobsComponent";
import { getCategories, getEmploymentTypes, getJobs } from "@/lib/api";
import { Container } from "@mui/material";

export default async function JobsPage({
	searchParams,
}: {
	searchParams: Promise<{
		page?: string;
		q?: string;
		sort?: string;
		employment_type?: string;
		category?: string;
		job_level?: string;
	}>;
}) {
	const params = (await searchParams) || {};
	const page = params?.page ? Number(params.page) : 1;
	const query = params?.q ? String(params.q) : "";
	const employment_type = params?.employment_type
		? (params.employment_type as string).split(",")
		: [];
	const category = params?.category
		? (params.category as string).split(",")
		: [];
	const job_level = params?.job_level
		? (params.job_level as string).split(",")
		: [];
	const sort = params?.sort ? String(params.sort) : "";

	const jobs = await getJobs({
		page,
		sort,
		query,
		employment_type: employment_type.join(","),
		category: category.join(","),
		job_level: job_level.join(","),
	});
	const employmentTypes = await getEmploymentTypes();
	const categories = await getCategories();

	return (
		<Container maxWidth="lg" sx={{pt:4}}>
			<JobsComponent
				jobs={jobs}
				employmentTypes={employmentTypes}
				categories={categories}
			/>
		</Container>
	);
}
