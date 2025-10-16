import PostJobFormComponents from "@/components/post-job/PostJobFormComponents";
import {
	getBenefits,
	getCategories,
	getEmploymentTypes,
	getSkills,
} from "@/lib/api";
import { Container } from "@mui/material";

export default async function PostJobPage() {
	const categories = await getCategories();
	const employmentTypes = await getEmploymentTypes();
	const benefits = await getBenefits();
	const skills = await getSkills();

	return (
		<Container maxWidth="lg" className="mt">
			<PostJobFormComponents
				categories={categories}
				employmentTypes={employmentTypes}
				skills={skills}
				benefits={benefits}
			/>
		</Container>
	);
}
