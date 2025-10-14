"use client";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
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
	bgcolor: "rgba(255,255,255,0.7)",
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

const successIconSx = {
	fontSize: 90,
	fill: theme.palette.success.main,
} as const;

const fadeTimeout = 700;

export default function PaymentSuccessPage() {
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
							<CheckCircleOutlineIcon sx={successIconSx} />
						</m.div>
					</LazyMotion>

					<Typography variant="h4" fontWeight="bold" mt={2}>
						{t("success.title")}
					</Typography>
					<Typography variant="body1" mt={1} color="text.secondary">
						{t("success.description")}
					</Typography>

					<Button
						variant="contained"
						color="primary"
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
