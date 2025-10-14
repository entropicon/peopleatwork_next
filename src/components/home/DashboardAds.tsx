"use client";

import { screenPadding } from "@/lib/utils";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const containerSx = {
	minHeight: "414px",
	backgroundColor: "var(--primary-color)",
	my: "4.5rem",
	display: "flex",
	alignItems: "center",
	px: { xs: "1rem", md: "5rem" },
	py: { xs: "100px", md: "1rem" },
	flexWrap: { xs: "wrap", md: "nowrap" },
	gap: "2rem",
	position: "relative",
	mx: screenPadding
};

const topLeftBoxSx = {
	width: 100,
	height: 100,
	clipPath: "polygon(0 0, 100% 0, 100% 0, 100% 0, 100% 0, 0 100%, 0 100%, 0 0)",
	position: "absolute",
	top: -1,
	left: -1,
	backgroundColor: "var(--white)",
};

const bottomRightBoxSx = {
	width: 100,
	height: 100,
	clipPath:
		"polygon(100% 0, 100% 0, 100% 100%, 100% 100%, 0 100%, 0 100%, 50% 50%)",
	position: "absolute",
	bottom: -1,
	right: -1,
	backgroundColor: "var(--white)",
};

const stackSx = {
	height: "100%",
	justifyContent: "center",
	alignItems: { xs: "center", md: "flex-start" },
	width: { xs: "100%", md: "50%" },
};

const buttonSx = {
	backgroundColor: "var(--white)",
	color: "var(--primary-color)!important",
	borderRadius: 0,
	mt: "1rem",
	width: { xs: "100%", md: "auto" },
};

const imageStyle = {
	height: "100%",
	objectFit: "cover" as const,
	alignSelf: "center",
	width: "100%",
};

const DashboardAds: React.FC = React.memo(() => {
	const t = useTranslations("homePage");
	return (
		<Box sx={containerSx}>
			<Box sx={topLeftBoxSx} />
			<Stack sx={stackSx} spacing={2}>
				<Typography variant="h1" color="var(--white)">
					{t("dashboardAds.text1")}
					<br /> {t("dashboardAds.text2")}
				</Typography>
				<Typography variant="body1" color="var(--white)">
					{t("dashboardAds.text3")}
				</Typography>
				<Button
					variant="contained"
					sx={buttonSx}
					component={Link}
					href={`${process.env.NEXT_PUBLIC_MAIN_FRONT_URL}/auth/register`}
				>
					{t("dashboardAds.text4")}
				</Button>
			</Stack>
			<Box
				sx={{
					width: { xs: "100%", md: "50%" },
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					position: "relative",
				}}
			>
				<Image
					src="/images/bg/dc.png"
					alt="Dashboard Ads"
					width={500}
					height={500}
					priority
					style={imageStyle}
				/>
			</Box>
			<Box sx={bottomRightBoxSx} />
		</Box>
	);
});

DashboardAds.displayName = "DashboardAds";

export default DashboardAds;
