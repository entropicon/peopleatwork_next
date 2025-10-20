"use client";

import { getLocalizedName } from "@/lib/utils";
import { JobCardProps } from "@/types/types";
import { ArrowForward } from "@mui/icons-material";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { memo, useMemo } from "react";
import { Badge, CardAvatar, CompanyInfo, StyledCard } from "../common/card_ui";
import dayjs from "dayjs";

const PRIMARY_BUTTON_SX = { height: 35, borderRadius: 2 };

const JobCardList = memo(
	({
		job,
		md_size = 12,
		onQuickApply,
	}: {
		job: JobCardProps;
		md_size?: number;
		onQuickApply: (jobId: number) => void;
	}) => {
		const t = useTranslations();
		const lang = useLocale();
		const isFullWidth = md_size === 12;
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
		const postedText = useMemo(() => {
			if (!job?.post_date?.time) {
				return "";
			}
			return `${t("common.posted") + ": "} ${job.post_date.ago} ${t(
				`common.${job.post_date.time}`
			)} ${t("common.ago")}`;
		}, [job?.post_date?.ago, job?.post_date?.time, t]);

		const deadlineText = useMemo(() => {
			if (!job?.deadline) {
				return "";
			}
			return dayjs(job.deadline).format("DD MMM");
		}, [job?.deadline]);

		const isGuest = Boolean(job?.is_guest_job);
		const showSalary = salaryText.length > 0;
		const showPostDate = postedText.length > 0;
		const showDeadline = deadlineText.length > 0;
		const ownerLogo = useMemo(
			() => (job?.is_company_confidential ? undefined : job?.owner?.logo),
			[job?.is_company_confidential, job?.owner?.logo]
		);
		const applyHref = useMemo(() => {
			if (isGuest) {
				return "";
			}
			const baseUrl = process.env.NEXT_PUBLIC_MAIN_FRONT_URL;
			const fallback = `/auth/login?redirect=job/${job?.id ?? ""}`;
			return baseUrl
				? `${baseUrl}/auth/login?redirect=job/${job?.id ?? ""}`
				: fallback;
		}, [isGuest, job?.id]);
		const gridSize = useMemo(() => ({ xs: 12, md: md_size }), [md_size]);
		const statsText = useMemo(
			() => ({
				hired: `${job?.hired || 0} ${t("common.hired")}`,
				openings: `${job?.openings || 0} ${t("common.openings")}`,
			}),
			[job?.hired, job?.openings, t]
		);
		const cardLayoutSx = useMemo(
			() => ({
				flexDirection: { xs: "column", md: "row" },
				alignItems: { xs: "stretch", md: "center" },
				gap: { xs: 2, md: 3 },
			}),
			[]
		);

		return (
			<Grid size={gridSize}>
				<StyledCard sx={cardLayoutSx}>
					<Stack
						direction="row"
						spacing={1}
						alignItems="center"
						sx={{ width: isFullWidth ? "50%" : "70%" }}
					>
						<CardAvatar avatar={ownerLogo} />
						<Stack spacing={0.5} className="one-line-text">
							<Typography variant="h6" className="one-line-text">{job?.title || ""}</Typography>
							<CompanyInfo
								location={job?.owner?.location || ""}
								companyName={job?.owner?.name || ""}
								isConfidential={!!job?.is_company_confidential}
							/>
							<Stack direction="row" spacing={1}>
								<Badge text={categoryName} color="primary.main" />
								<Badge
									text={employmentTypeName}
									color={job?.employment_type?.color}
								/>
							</Stack>
						</Stack>
					</Stack>{" "}
					<Stack spacing={0.5} sx={{ width: "30%" }}>
						<Typography variant="body1" fontWeight={700}>
							{showSalary ? salaryText : "-"}
						</Typography>

						{showPostDate && (
							<Typography variant="body2" className="text-neutral-dark">
								{postedText}
							</Typography>
						)}
						{showDeadline && (
							<Typography variant="body2" className="text-neutral-dark">
								{t("common.deadline")}: {deadlineText}
							</Typography>
						)}
						{isFullWidth ? (
							<Typography variant="body2" className="text-neutral-dark">
								<b>{statsText.hired}</b> / {statsText.openings}
							</Typography>
						) : (
							<Link href={`/job/${job.id}`}>
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
						)}
					</Stack>
					{isFullWidth && (
						<Stack spacing={1} height={"100%"} sx={{ width: "20%" }}>
							<Link href={`/job/${job.id}`}>
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
									sx={PRIMARY_BUTTON_SX}
									size="small"
									onClick={() => onQuickApply(job.id)}
								>
									{t("button.quick_apply")}
								</Button>
							) : (
								<Link href={applyHref}>
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
					)}
				</StyledCard>
			</Grid>
		);
	},

	(prevProps, nextProps) => {
		const prevJob = prevProps.job;
		const nextJob = nextProps.job;
		const basicFieldsUnchanged =
			prevJob.id === nextJob.id &&
			prevJob.title === nextJob.title &&
			prevJob.deadline === nextJob.deadline &&
			prevJob.min_salary === nextJob.min_salary &&
			prevJob.max_salary === nextJob.max_salary &&
			prevJob.currency === nextJob.currency &&
			prevJob.is_guest_job === nextJob.is_guest_job &&
			prevJob.is_company_confidential === nextJob.is_company_confidential &&
			prevJob.hired === nextJob.hired &&
			prevJob.openings === nextJob.openings &&
			prevJob.applied === nextJob.applied;
		const postDateUnchanged =
			prevJob.post_date?.ago === nextJob.post_date?.ago &&
			prevJob.post_date?.time === nextJob.post_date?.time;
		const ownerUnchanged =
			prevJob.owner?.logo === nextJob.owner?.logo &&
			prevJob.owner?.name === nextJob.owner?.name &&
			prevJob.owner?.location === nextJob.owner?.location;
		const employmentTypeUnchanged =
			prevJob.employment_type?.name_en === nextJob.employment_type?.name_en &&
			prevJob.employment_type?.name_az === nextJob.employment_type?.name_az &&
			prevJob.employment_type?.name_ru === nextJob.employment_type?.name_ru &&
			prevJob.employment_type?.color === nextJob.employment_type?.color;
		const categoryUnchanged =
			prevJob.category?.name_en === nextJob.category?.name_en &&
			prevJob.category?.name_az === nextJob.category?.name_az &&
			prevJob.category?.name_ru === nextJob.category?.name_ru;

		return (
			basicFieldsUnchanged &&
			postDateUnchanged &&
			ownerUnchanged &&
			employmentTypeUnchanged &&
			categoryUnchanged &&
			prevProps.md_size === nextProps.md_size
		);
	}
);

export default JobCardList;
JobCardList.displayName = "JobCardList";
