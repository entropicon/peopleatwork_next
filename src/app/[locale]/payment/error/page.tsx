"use client";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box, Button, Fade, Paper, Typography } from "@mui/material";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useEffect } from "react";
import theme from "@/theme/theme";

const containerSx = {
	minHeight: "100vh",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	bgcolor: "rgba(255,255,255,0.75)",
} as const;

const paperSx = {
	backdropFilter: "blur(10px)",
	borderRadius: 4,
	p: 5,
	maxWidth: {
		xs: "90vw",
		sm: "400px",
		md: "700px",
	},
	textAlign: "center",
} as const;

const buttonSx = {
	mt: 2,
	borderRadius: 3,
	textTransform: "none" as const,
} as const;

const errorIconSx = {
	fontSize: 90,
	fill: theme.palette.error.main,
} as const;

const fadeTimeout = 700;

export default function PaymentErrorPage() {
	const router = useRouter();
	const t = useTranslations("payment");

	useEffect(() => {
		router.prefetch("/");
	}, [router]);

	const handleGoHome = useCallback(() => {
		router.push("/");
	}, [router]);

	return (
		<Fade in timeout={fadeTimeout}>
			<Box sx={containerSx}>
				<Paper elevation={6} sx={paperSx}>
					<LazyMotion features={domAnimation}>
						<m.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 150 }}
						>
							<ErrorOutlineIcon sx={errorIconSx} />
						</m.div>
					</LazyMotion>

					<Typography variant="h4" fontWeight="bold" mt={2}>
						{t("error.title")}
					</Typography>
					<Typography variant="body1" mt={1} color="text.secondary">
						{t("error.description")}
					</Typography>
					<Typography variant="body1" mt={1} color="text.secondary">
						{t("error.hint")}
					</Typography>

					<Button
						variant="contained"
						color="error"
						sx={buttonSx}
						onClick={handleGoHome}
					>
						{t("common.goHome")}
					</Button>
				</Paper>
			</Box>
		</Fade>
	);
}
