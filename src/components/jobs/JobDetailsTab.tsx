import { jobLevel } from "@/constants/variables";
import { jobDetailsPaperStyles } from "@/lib/utils";
import { Job } from "@/types/types";
import {
	CalendarMonthRounded,
	CategoryOutlined,
	CheckCircleRounded,
	DiamondOutlined,
	ListAltOutlined,
	WorkspacePremiumRounded
} from "@mui/icons-material";
import {
	Box,
	Chip,
	Divider,
	Grid,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import { format } from "date-fns";
import { az, enUS, ru } from "date-fns/locale";
import { useLocale, useTranslations } from "next-intl";
import { memo, type ReactElement, type ReactNode, useMemo } from "react";

const SectionCard = memo(
	({
		title,
		icon,
		children,
		spacing = 2,
	}: {
		title: string;
		icon?: ReactElement;
		children: ReactNode;
		spacing?: number;
	}) => (
		<Paper
			elevation={0}
			sx={jobDetailsPaperStyles}
		>
			<Stack spacing={spacing}>
				<Stack direction="row" spacing={1.5} alignItems="center">
					{icon && (
						<Box
							sx={{
								borderRadius: 2,
								p: 1,
								backgroundColor: "var(--primary-color)",
								color: "var(--primary-color)",
								display: "inline-flex",
								"& svg": { fill: "#fff" },
							}}
						>
							{icon}
						</Box>
					)}
					<Typography variant="h5">{title}</Typography>
				</Stack>
				{children}
			</Stack>
		</Paper>
	)
);

const SummaryRow = memo(
	({ title, value }: { title: string; value: ReactNode }) => (
		<Stack
			direction={{ xs: "column", sm: "row" }}
			spacing={{ xs: 0.5, sm: 1.5 }}
			alignItems={{ xs: "flex-start", sm: "center" }}
			justifyContent="space-between"
		>
			<Typography
				variant="body2"
				sx={{
					color: "var(--neutral-darker)",
					textTransform: "capitalize",
				}}
			>
				{title}
			</Typography>
			<Typography
				variant="body1"
				sx={{
					fontFamily: "Epilogue SemiBold",
				}}
			>
				{value}
			</Typography>
		</Stack>
	)
);

const JobDetailsTab: React.FC<{ job: Job }> = ({ job }) => {
	const t = useTranslations();
	const lang = useLocale();
	const dateLocale = useMemo(
		() => (lang === "az" ? az : lang === "ru" ? ru : enUS),
		[lang]
	);

	const richTextSections = useMemo(() => {
		const keys: Array<keyof Job> = [
			"description",
			"measurable_outcomes",
			"key_objectives",
			"responsibilities",
			"industry_spesific_knowledge",
			"education",
			"certification",
			"who_you_are",
			"nice_to_have",
		];

		return keys
			.map((key) => {
				const value = job?.[key];
				if (typeof value === "string" && value.trim()) {
					return {
						key: key as string,
						title: t(`jobDetails.${key as string}`),
						value,
					};
				}
				return null;
			})
			.filter(
				(section): section is { key: string; title: string; value: string } =>
					Boolean(section)
			);
	}, [job, t]);

	const summaryItems = useMemo(() => {
		const formattedCurrency = job?.currency
			? `${job.currency[0]?.toUpperCase() ?? ""}${job.currency.slice(1)}`
			: "";

		return [
			{
				title: t("jobDetails.applyBefore"),
				value: job?.deadline
					? format(new Date(job.deadline), "dd MMM, yyyy", {
							locale: dateLocale,
					  })
					: t("jobDetails.notSpecified"),
				icon: <CalendarMonthRounded fontSize="small" />,
			},
			{
				title: t("jobDetails.jobType"),
				value:
					job?.employment_type?.[
						`name_${lang}` as "name_en" | "name_az" | "name_ru"
					] || t("jobDetails.notSpecified"),
				icon: <WorkspacePremiumRounded fontSize="small" />,
			},
			{
				title: t("jobDetails.salary"),
				value:
					job?.salary && !job?.is_salary_hidden
						? `${job.salary} ${formattedCurrency}`.trim()
						: t("jobDetails.notSpecified"),
				icon: <WorkspacePremiumRounded fontSize="small" />,
			},
			{
				title: t("jobDetails.jobLevel"),
				value:
					jobLevel?.find((level) => level.id === job?.job_level)?.[
						lang as "az" | "en" | "ru"
					] || t("jobDetails.notSpecified"),
				icon: <WorkspacePremiumRounded fontSize="small" />,
			},
			{
				title: t("jobDetails.experience"),
				value: job?.experience || t("jobDetails.notSpecified"),
				icon: <WorkspacePremiumRounded fontSize="small" />,
			},
		];
	}, [
		dateLocale,
		job?.currency,
		job?.deadline,
		job?.employment_type,
		job?.experience,
		job?.is_salary_hidden,
		job?.job_level,
		job?.salary,
		lang,
		t,
	]);

	const benefits = job?.benefits ?? [];
	const skills = job?.skills ?? [];

	return (
		<Grid container spacing={1} alignItems="flex-start">
			<Grid
				size={{
					xs: 12,
					lg: 8,
				}}
			>
				<Stack spacing={1}>
					{richTextSections.map(({ key, title, value }) => (
						<SectionCard key={key} title={title}>
							<Box
								component="div"
								sx={{
									"& p": {
										color: "var(--neutral-darker)",
										lineHeight: 1.8,
									},
									"& ul": {
										pl: 2.5,
										mb: 1.5,
									},
									"& li": {
										mb: 0.75,
									},
								}}
								dangerouslySetInnerHTML={{ __html: value }}
							/>
						</SectionCard>
					))}
				</Stack>
			</Grid>

			<Grid
				size={{
					xs: 12,
					lg: 4,
				}}
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: 1,
				}}
			>
				<SectionCard
					title={t("jobDetails.aboutThisRole")}
					icon={<ListAltOutlined />}
				>
					<Stack spacing={1.5} divider={<Divider flexItem light />}>
						{summaryItems.map(({ title, value }) => (
							<SummaryRow key={title} title={title} value={value} />
						))}
					</Stack>
				</SectionCard>

				{job?.category && (
					<SectionCard
						title={t("common.category")}
						icon={<CategoryOutlined />}
					>
						<Chip
							label={
								job.category[
									`name_${lang}` as "name_en" | "name_az" | "name_ru"
								]
							}
							sx={{

								fontFamily: "Epilogue SemiBold",
								borderRadius: 2,
							}}
						/>
					</SectionCard>
				)}

				{skills.length > 0 && (
					<SectionCard
						title={t("jobDetails.requiredSkills")}
						icon={<WorkspacePremiumRounded />}
					>
						<Stack direction="row" gap={1} flexWrap="wrap">
							{skills.map((skill) => (
								<Chip
									key={skill?.id ?? skill?.name_en}
									label={
										skill?.[
											`name_${lang}` as "name_en" | "name_az" | "name_ru"
										] || ""
									}
									sx={{
										backgroundColor: "rgba(28, 100, 242, 0.08)",
										color: "var(--primary-color)",
										borderRadius: 2,
										fontFamily: "Epilogue SemiBold",
									}}
								/>
							))}
						</Stack>
					</SectionCard>
				)}
				{benefits.length > 0 && (
					<SectionCard
						title={t("jobDetails.perksAndBenefits")}
						icon={<DiamondOutlined />}
					>
						<Stack direction="row" flexWrap="wrap" gap={1.5}>
							{benefits.map((benefit) => (
								<Chip
									key={benefit?.id ?? benefit?.name_en}
									label={
										benefit?.[
											`name_${lang}` as "name_en" | "name_az" | "name_ru"
										] || ""
									}
									icon={<CheckCircleRounded sx={{ fill: "var(--green)" }} />}
									variant="outlined"
									sx={{
										borderColor: "rgba(46, 204, 113, 0.4)",
										color: "var(--green)",
										backgroundColor: "rgba(46, 204, 113, 0.08)",
										fontFamily: "Epilogue Medium",
									}}
								/>
							))}
						</Stack>
					</SectionCard>
				)}
			</Grid>
		</Grid>
	);
};

export default JobDetailsTab;

// displayName to help with React DevTools
JobDetailsTab.displayName = "JobDetailsTab";
SectionCard.displayName = "SectionCard";
SummaryRow.displayName = "SummaryRow";
