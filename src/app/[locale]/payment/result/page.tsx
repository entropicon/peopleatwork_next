"use client";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Box,
  Button,
  Chip,
  Divider,
  Fade,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import theme from "@/theme/theme";

type PaymentStatusKey = "success" | "pending" | "failed" | "unknown";

const iconsx = {
  fontSize: 90,
  fill: theme.palette.warning.main,
};

const containerSx = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: "rgba(255,255,255,0.8)",
  px: 2,
} as const;

const paperSx = {
  width: "100%",
  maxWidth: 720,
  backdropFilter: "blur(12px)",
  borderRadius: 4,
  p: { xs: 4, md: 6 },
  boxShadow: 12,
} as const;

const statusChipSx = {
  alignSelf: "center",
  mt: 2,
  fontWeight: 600,
  px: 1.5,
  py: 0.5,
  borderRadius: 2,
  textTransform: "capitalize" as const,
} as const;

const detailRowSx = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 2,
  py: 1,
  flexWrap: "wrap" as const,
} as const;

const fadeTimeout = 700;

const statusConfig: Record<PaymentStatusKey, { icon: typeof CheckCircleOutlineIcon; color: string }> = {
  success: { icon: CheckCircleOutlineIcon, color: theme.palette.success.main },
  pending: { icon: HourglassEmptyIcon, color: theme.palette.warning.main },
  failed: { icon: ErrorOutlineIcon, color: theme.palette.error.main },
  unknown: { icon: InfoOutlinedIcon, color: theme.palette.info.main },
};

const SUPPORT_EMAIL = "support@peopleatwork.az";

export default function PaymentResultPage() {
  const router = useRouter();
  const locale = useLocale();
  const tPayment = useTranslations("payment");
  const tCommon = useTranslations("common");
  const searchParams = useSearchParams();

  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  const rawStatus = searchParams.get("status")?.toLowerCase();

  const status: PaymentStatusKey = useMemo(() => {
    if (rawStatus === "success" || rawStatus === "pending" || rawStatus === "failed") {
      return rawStatus;
    }
    return "unknown";
  }, [rawStatus]);

  const orderId = searchParams.get("order_id") ?? searchParams.get("orderId") ?? undefined;
  const transactionId = searchParams.get("transaction_id") ?? searchParams.get("transactionId") ?? undefined;
  const rawAmount = searchParams.get("amount") ?? undefined;
  const rawCurrency = searchParams.get("currency") ?? undefined;
  const provider = searchParams.get("provider") ?? undefined;
  const message = searchParams.get("message") ?? undefined;
  const paidAtRaw = searchParams.get("paid_at") ?? searchParams.get("paidAt") ?? undefined;

  const normalizedCurrency = useMemo(() => rawCurrency?.toUpperCase(), [rawCurrency]);

  const formattedAmount = useMemo(() => {
    if (!rawAmount) {
      return undefined;
    }

    const numericAmount = Number(rawAmount);

    if (Number.isNaN(numericAmount)) {
      return rawAmount;
    }

    try {
      if (normalizedCurrency) {
        return new Intl.NumberFormat(locale, {
          style: "currency",
          currency: normalizedCurrency,
        }).format(numericAmount);
      }

      return new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(numericAmount);
    } catch {
      return numericAmount.toString();
    }
  }, [locale, normalizedCurrency, rawAmount]);

  const formattedPaidAt = useMemo(() => {
    if (!paidAtRaw) {
      return undefined;
    }

    const date = new Date(paidAtRaw);

    if (Number.isNaN(date.getTime())) {
      return paidAtRaw;
    }

    return new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  }, [locale, paidAtRaw]);

  const detailRows = useMemo(() => {
    const rows: Array<{ label: string; value: string }> = [];

    if (orderId) {
      rows.push({ label: tPayment("result.fields.orderId"), value: orderId });
    }

    if (transactionId) {
      rows.push({ label: tPayment("result.fields.transactionId"), value: transactionId });
    }

    if (formattedAmount) {
      rows.push({ label: tPayment("result.fields.amount"), value: formattedAmount });
    }

    if (normalizedCurrency && !formattedAmount?.includes(normalizedCurrency)) {
      rows.push({ label: tPayment("result.fields.currency"), value: normalizedCurrency });
    }

    if (provider) {
      rows.push({ label: tPayment("result.fields.provider"), value: provider });
    }

    if (formattedPaidAt) {
      rows.push({ label: tPayment("result.fields.paidAt"), value: formattedPaidAt });
    }

    if (message) {
      rows.push({ label: tPayment("result.fields.message"), value: message });
    }

    return rows;
  }, [formattedAmount, formattedPaidAt, message, normalizedCurrency, orderId, provider, tPayment, transactionId]);

  const { icon: StatusIcon, color: statusColor } = statusConfig[status];

  const handleTryAgain = useCallback(() => {
    router.back();
  }, [router]);

  const handleContactSupport = useCallback(() => {
    window.location.href = `mailto:${SUPPORT_EMAIL}`;
  }, []);

  const handleGoHome = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <Fade in timeout={fadeTimeout}>
      <Box sx={containerSx}>
        <Paper elevation={10} sx={paperSx}>
          <LazyMotion features={domAnimation}>
            <m.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 140 }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <StatusIcon style={iconsx} />
            </m.div>
          </LazyMotion>

          <Typography variant="h4" fontWeight={700} textAlign="center" mt={3}>
            {tPayment("result.title")}
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary" mt={1.5}>
            {tPayment("result.description")}
          </Typography>

          <Chip
            label={tPayment(`result.status.${status}`)}
            sx={{ ...statusChipSx, bgcolor: `${statusColor}1a`, color: statusColor }}
          />

          <Typography variant="body1" textAlign="center" color="text.secondary" mt={2.5}>
            {tPayment(`result.statusDescription.${status}`)}
          </Typography>

          {detailRows.length > 0 && (
            <>
              <Divider sx={{ my: 4 }} />

              <Typography variant="h6" fontWeight={600} mb={1.5}>
                {tPayment("result.detailsTitle")}
              </Typography>

              <Stack spacing={0.5}>
                {detailRows.map((row) => (
                  <Box key={row.label} sx={detailRowSx}>
                    <Typography variant="body2" color="text.secondary">
                      {row.label}
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {row.value}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </>
          )}

          {detailRows.length === 0 && (
            <Typography variant="body2" color="text.secondary" textAlign="center" mt={4}>
              {tCommon("notSpecified")}
            </Typography>
          )}

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            mt={{ xs: 4, sm: 5 }}
          >
            <Button variant="contained" color="primary" onClick={handleGoHome}>
              {tPayment("common.goHome")}
            </Button>
            <Button variant="outlined" color="primary" onClick={handleTryAgain}>
              {tPayment("result.actions.tryAgain")}
            </Button>
            <Button variant="text" color="secondary" onClick={handleContactSupport}>
              {tPayment("result.actions.contactSupport")}
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Fade>
  );
}