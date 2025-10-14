"use client";
import { Box, Button, Typography } from "@mui/material";

import Navbar from "@/components/common/Navbar";
import { useTranslations } from "next-intl";
import Link from "next/link";

const NotFound = () => {
	const t = useTranslations();
	return (
		<>
			<Navbar />
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
					backgroundColor: "var(--neutral-light)",
					flexDirection: "column",
					gap: 2,
				}}
			>
				<Typography variant="h1">{t("notFound.title")} </Typography>
				<Typography variant="body1">{t("notFound.description")}</Typography>
				<Link href="/" style={{ textDecoration: "none" }}>
					<Button variant="contained">{t("notFound.backToHome")}</Button>
				</Link>
			</Box>
		</>
	);
};

export default NotFound;
