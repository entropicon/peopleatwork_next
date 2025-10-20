"use client";

import { CREATE_PAYMENT } from "@/constants/apiRoutes";
import { ArrowForward } from "@mui/icons-material";
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Chip,
	Container,
	Divider,
	Stack,
	Typography,
} from "@mui/material";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

const PLAN_DETAILS = {
	amount: 0.01,
	currency: "AZN",
};

const formatCurrency = (value: number, currency: string) =>
	new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
	}).format(value);

export default function PaymentPage() {
	const t = useTranslations("payment.checkout");
	const [loading, setLoading] = useState(false);
	const { id } = useParams();

	const orderId = useMemo(
		() => Math.random().toString(36).substring(2, 15).toUpperCase(),
		[]
	);
	const planName = t("title");
	const orderChipLabel = t("orderLabel", { orderId });

	const handlePayment = useCallback(async () => {
		setLoading(true);
		try {
			const response = await axios.post(CREATE_PAYMENT + id, {
				amount: PLAN_DETAILS.amount,
				order_id: orderId,
				description: "test",
			});
			if (response.data && response.data.redirect_url) {
				window.location.href = response.data.redirect_url;
			}
		} catch (paymentError) {
			console.error(paymentError);
		} finally {
			setLoading(false);
		}
	}, [orderId, planName, id]);

	return (
		<Container maxWidth="lg" className="mt">
			<Card
				sx={{
					relative: "relative",
					p: 4,
					boxShadow: "var(--box-shadow)",
					display: "flex",
					flexDirection: "column",
					gap: 4,
				}}
			>
				<CardHeader
					title={
						<Stack
							direction={{ xs: "column", sm: "row" }}
							spacing={2}
							alignItems="center"
						>
							<Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
								{planName}
							</Typography>
							<Chip
								label={orderChipLabel}
								color="warning"
								sx={{
									"& span": {
										color: "var(--neutral-lightest)",
									},
								}}
							/>
						</Stack>
					}
					sx={{
						px: 0,
						backgroundColor: "transparent",
					}}
				/>
				<CardContent>
					<Stack spacing={2}>
						<Box>
							<Typography
								variant="overline"
								sx={{ color: "var(--neutral-darkest)" }}
							>
								{t("totalDue")}
							</Typography>
							<Stack direction="row" alignItems="baseline" spacing={1}>
								<Typography variant="h2" sx={{ fontWeight: 700 }}>
									{formatCurrency(PLAN_DETAILS.amount, PLAN_DETAILS.currency)}
								</Typography>
								<Typography
									variant="subtitle2"
									sx={{ color: "var(--neutral-darkest)" }}
								>
									{t("oneTimePayment")}
								</Typography>
							</Stack>
						</Box>
						<Divider sx={{ borderColor: "var(--border-color)" }} />
						<Stack spacing={1.5} sx={{ color: "var(--neutral-darkest)" }}>
							<Typography variant="body2">{t("terms")}</Typography>
							<Typography variant="body2">{t("receipt")}</Typography>
						</Stack>
					</Stack>
				</CardContent>
				<CardActions>
					<Button
						fullWidth
						variant="contained"
						size="large"
						onClick={handlePayment}
						disabled={loading}
						endIcon={<ArrowForward />}
					>
						{loading ? t("button.loading") : t("button.default")}
					</Button>
				</CardActions>
			</Card>
		</Container>
	);
}
