import { Box, Stack, Typography } from "@mui/material";
import SearchBox from "../common/SearchBox";
import { useTranslations } from "next-intl";
import { screenPadding } from "@/lib/utils";
const Header = ({ job_count }: { job_count: number }) => {
	const t = useTranslations("homePage");
	return (
		<Stack
			direction="column"
			justifyContent="center"
			sx={{
				height: "100vh",
				px: screenPadding,
				backgroundColor: "var(--neutral-lightest)",
			}}
		>
			<Typography
				variant="h1"
				fontSize={{
					xs: "3.5rem",
					md: "4.5rem",
				}}
			>
				{t("headerText1")}
			</Typography>
			<Typography
				variant="h1"
				fontSize={{
					xs: "3.5rem",
					md: "4.5rem",
				}}
			>
				{t("headerText2")}
			</Typography>
			<Typography
				variant="h1"
				fontSize={{
					xs: "3.5rem",
					md: "4.5rem",
				}}
				color="var(--blue)"
			>
				{job_count && job_count < 5000
					? job_count
					: job_count > 5000
					? "5000+"
					: 0}{" "}
				{t("headerText3")}
			</Typography>
			<Box
				component="img"
				src="/images/icons/underline.svg"
				alt="placeholder"
				sx={{
					width: {
						xs: "90%",
						sm: "60%",
						md: "40%",
					},
				}}
			/>
			<SearchBox />
			<Typography variant="body1" className="text-neutral-dark">
				{t("popularSearches")}:{" "}
				<span>Frontend Developer, Backend Developer, Full Stack Developer</span>
			</Typography>
		</Stack>
	);
};

export default Header;
