import { Box, Container, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { memo, useMemo } from "react";
import SearchBox from "../common/SearchBox";

const MAX_JOB_COUNT_TO_DISPLAY = 5000;

const Header = memo(({ job_count = 0 }: { job_count?: number }) => {
	const t = useTranslations("homePage");

	const formattedJobCount = useMemo(() => {
		if (!job_count) {
			return 0;
		}
		if (job_count > MAX_JOB_COUNT_TO_DISPLAY) {
			return `${MAX_JOB_COUNT_TO_DISPLAY}+`;
		}
		return job_count;
	}, [job_count]);

	const heroTextSx = useMemo(
		() => ({
			fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" },
			lineHeight: 0.7,
			fontWeight: 700,
		}),
		[]
	);

	return (
		<Box sx={{ backgroundColor: "var(--neutral-lightest)", width: "100%" }}>
			<Container maxWidth="lg">
				<Stack
					direction="column"
					justifyContent="center"
					spacing={{ xs: 3, md: 4 }}
					sx={{
						minHeight: { xs: "auto", md: "100vh" },
						py: { xs: 8, md: 12 },
					}}
				>
					<Typography variant="h1" sx={heroTextSx}>
						{t("headerText1")}
					</Typography>
					<Typography variant="h1" sx={heroTextSx}>
						{t("headerText2")}
					</Typography>
					<Typography variant="h1" sx={heroTextSx} color="var(--blue)">
						{formattedJobCount} {t("headerText3")}
					</Typography>
					<Box
						component="img"
						src="/images/icons/underline.svg"
						alt="decorative underline"
						sx={{
							width: { xs: "80%", sm: "55%", md: "40%" },
							maxWidth: 420,
						}}
					/>
					<SearchBox />
					<Typography variant="body1" className="text-neutral-dark">
						{t("popularSearches")}:{" "}
						<span>
							Frontend Developer, Backend Developer, Full Stack Developer
						</span>
					</Typography>
				</Stack>
			</Container>
		</Box>
	);
});

Header.displayName = "Header";

export default Header;
