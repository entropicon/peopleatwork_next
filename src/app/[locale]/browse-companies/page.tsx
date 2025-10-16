import CompaniesComponent from "@/components/company/CompaniesComponent";
import { getCompanies, getIndustries } from "@/lib/api";
import { Container } from "@mui/material";

export default async function BrowseCompaniesPage({
	searchParams,
}: {
	searchParams: Promise<
		{ page: string; q: string; sort: string; industry: string } | undefined
	>;
}) {
	const params = await searchParams;

	const page = params?.page ? Number(params.page) : 1;
	const query = params?.q ? String(params.q) : "";
	const sort = params?.sort ? String(params.sort) : "";
	const industry = params?.industry
		? (params.industry as string).split(",")
		: [];

	const industries = await getIndustries();
	const companies = await getCompanies(page, query, industry, sort);

	return (
		<Container maxWidth="lg" sx={{ mt: 4 }}>
			<CompaniesComponent data={companies} industries={industries} />
		</Container>
	);
}
