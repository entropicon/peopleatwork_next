"use client";

import { Button, Grid, Stack, Typography } from "@mui/material";
import { memo, useMemo, type CSSProperties, type ReactNode } from "react";

import { getLocalizedName } from "@/lib/utils";
import { JobCardProps } from "@/types/types";
import { ArrowForward } from "@mui/icons-material";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { Badge, CardAvatar, CompanyInfo, StyledCard } from "../common/card_ui";
import dayjs from "dayjs";

const LINK_STYLE: CSSProperties = {
	textDecoration: "none",
	flex: 1,
	maxWidth: "50%",
};

const COMPANY_INFO_SX = { width: "calc(100% - 60px)" };
const PRIMARY_BUTTON_SX = { height: 35, borderRadius: 2 };
const SPLIT_BUTTON_SX = {
	height: 35,
	borderRadius: 2,
	flex: 1,
	maxWidth: "50%",
};
const VALUE_STYLE: CSSProperties = { display: "block" };

const InfoField = ({ label, value }: { label: string; value: ReactNode }) => (
	<Typography
		variant="body2"
		className="text-neutral-dark"
		fontSize="small"
		sx={{
			flex: 1,
			px: 0.5,
		}}
	>
		{label}
		<span style={VALUE_STYLE}>{value}</span>
	</Typography>
);

const JobCardGrid = memo(
	({
		job,
		size = 4,
		onQuickApply,
	}: {
		job: JobCardProps;
		size?: number;
		onQuickApply?: (jobId: number) => void;
	}) => {
		const lang = useLocale();
		const t = useTranslations();

		const isGuest = Boolean(job?.is_guest_job);

		const gridSize = useMemo(
			() => ({
				xs: 12,
				sm: 6,
				md: size,
			}),
			[size]
		);

		const employmentTypeName = useMemo(
			() => getLocalizedName(job?.employment_type, lang),
			[job?.employment_type, lang]
		);

		const categoryName = useMemo(
			() => getLocalizedName(job?.category, lang),
			[job?.category, lang]
		);

		const salaryText = useMemo(() => {
			if (job?.min_salary == null || job?.max_salary == null) {
				return "";
			}
			return `${job.min_salary}-${job.max_salary}${
				job?.currency ? ` ${job.currency}` : ""
			}`;
		}, [job?.currency, job?.max_salary, job?.min_salary]);

		const postedValue = useMemo(() => {
			if (!job?.post_date?.time) {
				return "";
			}
			return `${job.post_date.ago} ${t(`common.${job.post_date.time}`)} ${t(
				"common.ago"
			)}`;
		}, [job?.post_date?.ago, job?.post_date?.time, t]);

		const deadlineText = useMemo(() => {
			if (!job?.deadline) {
				return "—";
			}
			return dayjs(job.deadline).format("DD MMM, YYYY");
		}, [job?.deadline]);

		const openingsValue = useMemo(
			() => (
				<>
					{job?.hired ?? 0} / <b>{job?.openings ?? 0}</b>
				</>
			),
			[job?.hired, job?.openings]
		);

		const detailHref = useMemo(() => {
			const basePath = `/job/${job.id}`;
			return isGuest ? `${basePath}?ref=guest` : basePath;
		}, [job.id, isGuest]);

		const applyHref = useMemo(() => {
			if (isGuest) {
				return "";
			}
			const baseUrl = process.env.NEXT_PUBLIC_MAIN_FRONT_URL;
			const path = `job/${job?.id}`;
			return baseUrl
				? `${baseUrl}/auth/login?redirect=${path}`
				: `/auth/login?redirect=${path}`;
		}, [isGuest, job?.id]);

		const showSalary = salaryText.length > 0;
		const showPostDate = postedValue.length > 0;

		return (
			<Grid size={gridSize}>
				<StyledCard>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
						spacing={1}
					>
						<CardAvatar
							avatar={
								job?.is_company_confidential ? undefined : job?.owner?.logo
							}
						/>

						<Stack spacing={0.5} sx={COMPANY_INFO_SX}>
							<Typography variant="h6" className="one-line-text">
								{job?.title || ""}
							</Typography>
							<CompanyInfo
								location={job?.owner?.location || ""}
								companyName={job?.owner?.name || ""}
								isConfidential={!!job?.is_company_confidential}
							/>
						</Stack>
					</Stack>
					<Stack direction="row" spacing={1} justifyContent="space-between">
						<Badge text={categoryName} color="primary.main" sx={{ flex: 1 }} />
						<Badge
							sx={{ flex: 1 }}
							text={employmentTypeName}
							color={job?.employment_type?.color}
						/>
					</Stack>
					<Stack direction="row" justifyContent="space-between">
						{showPostDate && (
							<InfoField label={t("common.posted")} value={postedValue} />
						)}
						<InfoField label={t("common.deadline")} value={deadlineText} />
					</Stack>
					<Stack direction="row" justifyContent="space-between">
						{showSalary && (
							<InfoField label={t("common.salary")} value={salaryText} />
						)}
						<InfoField label={t("common.openings")} value={openingsValue} />
					</Stack>
					<Stack
						direction="row"
						spacing={1}
						justifyContent="space-between"
						width={"100%"}
					>
						<Link href={detailHref} style={LINK_STYLE}>
							<Button
								fullWidth
								variant="contained"
								sx={PRIMARY_BUTTON_SX}
								size="small"
								endIcon={<ArrowForward />}
							>
								{t("button.view_details")}
							</Button>
						</Link>
						{isGuest ? (
							<Button
								fullWidth
								variant={"outlined"}
								sx={SPLIT_BUTTON_SX}
								size="small"
								onClick={() => onQuickApply?.(job.id)}
							>
								{t("button.quick_apply")}
							</Button>
						) : (
							<Link href={applyHref} style={LINK_STYLE}>
								<Button
									fullWidth
									variant={"outlined"}
									sx={PRIMARY_BUTTON_SX}
									size="small"
								>
									{t("button.apply")}
								</Button>
							</Link>
						)}
					</Stack>
				</StyledCard>
			</Grid>
		);
	},

	(prevProps, nextProps) => {
		return prevProps.size === nextProps.size && prevProps.job === nextProps.job;
	}
);

JobCardGrid.displayName = "JobCardGrid";

export default JobCardGrid;
