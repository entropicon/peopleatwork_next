import { ArrowForward } from "@mui/icons-material";
import { Button, Container, Grid } from "@mui/material";

import { JobCategories } from "@/types/types";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Heading from "../common/Heading";
import CategoryCard from "./CategoryCard";

const Categories = ({
	md,
	popular_categories,
}: {
	md: boolean;
	popular_categories: JobCategories[];
}) => {
	const t = useTranslations();
	return (
		<Container maxWidth="lg" component="section" id="categories">
			<Heading
				text={t("homePage.categoryHeading.text1")}
				text_blue={t("homePage.categoryHeading.text2")}
				button_text={t("common.showAllJobs")}
				button_link="/jobs"
			/>
			<Grid container spacing={1}>
				{popular_categories?.map((category, index) => (
					<CategoryCard key={index} category={category} />
				))}
			</Grid>
			{!md && (
				<Button
					variant="text"
					sx={{
						color: "var(--primary-color)",
					}}
				>
					<Link href="/jobs">
						{t("common.showAllJobs")}
						<ArrowForward
							sx={{
								ml: 1,
								fill: "var(--primary-color)",
							}}
						/>
					</Link>
				</Button>
			)}
		</Container>
	);
};

export default Categories;
