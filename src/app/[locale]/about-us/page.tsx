import {
	HandshakeOutlined,
	LaptopOutlined,
	SearchOutlined,
	StarOutline,
} from "@mui/icons-material";
import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";

export default async function AboutUsPage() {
	const t = await getTranslations("aboutUs");
	return (
		<Container maxWidth="lg" sx={{ my: { xs: "56px", md: "64px" } }}>
			{/* Hero Section */}
			<Stack
				alignItems={"center"}
				spacing={2}
				sx={{ py: 6, textAlign: "center" }}
			>
				<Typography
					variant="h2"
					sx={{
						background:
							"linear-gradient(135deg, #4640de 0%, #7b61ff 50%, #26a4ff 100%)",
						backgroundClip: "text",
						WebkitBackgroundClip: "text",
						color: "transparent",
						backdropFilter: "blur(10px)",
						WebkitBackdropFilter: "blur(10px)",
					}}
				>
					{t("heroTitle")}
				</Typography>
				<Typography
					variant="body1"
					sx={{
						maxWidth: "800px",
						mx: "auto",
						opacity: 0.9,
					}}
				>
					{t("heroSubtitle")}
				</Typography>
			</Stack>

			{/* Mission Section */}
			<Box>
				<Grid container spacing={2} alignItems="center">
					<Grid size={{ xs: 12, lg: 6 }}>
						<Typography variant="h2" sx={{ mb: 3, color: "text.primary" }}>
							{t("missionTitle")}
						</Typography>
						<Typography
							variant="body1"
							sx={{
								mb: 3,
								fontSize: "1.1rem",
								lineHeight: 1.7,
								color: "text.secondary",
							}}
						>
							{t("missionText1")}
						</Typography>
						<Typography
							variant="body1"
							sx={{
								fontSize: "1.1rem",
								lineHeight: 1.7,
								color: "text.secondary",
							}}
						>
							{t("missionText2")}
						</Typography>
					</Grid>
					<Grid size={{ xs: 12, lg: 6 }}>
						<Paper
							elevation={3}
							sx={{
								background:
									"linear-gradient(135deg,#4640de 0%,#7b61ff 50%,#26a4ff 100%)",
								color: "white",
								p: 4,
								borderRadius: 3,
							}}
						>
							<Typography
								variant="h4"
								sx={{ mb: 3, fontWeight: "bold", color: "white" }}
							>
								{t("valuesTitle")}
							</Typography>
							<Stack spacing={2}>
								{[
									{
										icon: <SearchOutlined sx={{ fill: "#fff" }} />,
										value: t("values.transparency"),
									},
									{
										icon: <LaptopOutlined sx={{ fill: "#fff" }} />,
										value: t("values.innovation"),
									},
									{
										icon: <HandshakeOutlined sx={{ fill: "#fff" }} />,
										value: t("values.inclusivity"),
									},
									{
										icon: <StarOutline sx={{ fill: "#fff" }} />,
										value: t("values.excellence"),
									},
								].map((value, index) => (
									<Box
										key={index}
										sx={{ display: "flex", alignItems: "center" }}
									>
										{value.icon}
										<Typography variant="body2" color="#fff" sx={{ ml: 1 }}>
											{value.value}
										</Typography>
									</Box>
								))}
							</Stack>
						</Paper>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}
