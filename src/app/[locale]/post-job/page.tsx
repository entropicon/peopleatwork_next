import PostJobFormComponents from "@/components/post-job/PostJobFormComponents";
import {
	getBenefits,
	getCategories,
	getEmploymentTypes,
	getSkills,
} from "@/lib/api";
import { screenPadding } from "@/lib/utils";
import { Box } from "@mui/material";

export default async function PostJobPage() {
	const categories = await getCategories();
	const employmentTypes = await getEmploymentTypes();
	const benefits = await getBenefits();
	const skills = await getSkills();

	return (
		<Box
			sx={{
				px: screenPadding,
				py: 2,
				mt: {
					xs: "56px",
					md: "64px",
				},
			}}
		>
			<PostJobFormComponents
				categories={categories}
				employmentTypes={employmentTypes}
				skills={skills}
				benefits={benefits}
			/>
		</Box>
	);
}
