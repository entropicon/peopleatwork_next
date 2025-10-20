import { jobLevel } from "@/constants/variables";
import { jobDetailsPaperStyles } from "@/lib/utils";
import theme from "@/theme/theme";
import { Job } from "@/types/types";
import { ArrowOutwardRounded } from "@mui/icons-material";
import {
	Box,
	Button,
	Chip,
	Grid,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { memo, type ReactElement, useCallback, useMemo, useState } from "react";
import ShareButtons from "../common/ShareButtons";
import { CardAvatar } from "../common/card_ui";
import ApplyGuestJobDialog from "./ApplyGuestJobDialog";

const MetaChip = memo(
	({
		label,
		color,
		icon,
	}: {
		label: string;
		color?: string;
		icon?: ReactElement;
	}) => (
		<Chip
			label={label}
			icon={icon}
			size="medium"
			sx={{
				fontFamily: "Epilogue SemiBold",
				textTransform: "capitalize",
				borderRadius: 1.5,
				backgroundColor: color,
				px: 1.5,
				py: 0.5,
				"& span": {
					color: "#fff",
				},
			}}
		/>
	)
);

const JobDetailsHeading = memo(({ job }: { job: Job; getJob: () => void }) => {
	const t = useTranslations();
	const lang = useLocale();
	const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

	const jobEmploymentType = useMemo(() => {
		if (!job?.employment_type) return "";
		const key = `name_${lang}`;
		return (
			(job.employment_type as unknown as Record<string, string>)[key] || ""
		);
	}, [job?.employment_type, lang]);

	const jobCategory = useMemo(() => {
		if (!job?.category) return "";
		const key = `name_${lang}`;
		return (job.category as unknown as Record<string, string>)[key] || "";
	}, [job?.category, lang]);

	const isConfidential = job?.is_company_confidential;
	const ownerName = isConfidential ? "" : job?.owner?.name || "";

	const metaChips = useMemo(() => {
		const chips: Array<{
			label: string;
			color?: string;
			icon?: ReactElement;
		}> = [];

		if (jobCategory) {
			chips.push({ label: jobCategory, color: "var(--blue)" });
		}

		if (jobEmploymentType) {
			chips.push({ label: jobEmploymentType, color: "var(--green)" });
		}

		if (job?.job_level) {
			chips.push({
				label:
					jobLevel.find((level) => level.id === job.job_level)?.[
						lang as "en" | "az" | "ru"
					] || "",
				color:
					jobLevel.find((level) => level.id === job?.job_level)?.color || "",
			});
		}
		return chips;
	}, [jobCategory, jobEmploymentType, job.job_level, lang]);

	const applyHref = useMemo(
		() =>
			process.env.NEXT_PUBLIC_MAIN_FRONT_URL
				? `${process.env.NEXT_PUBLIC_MAIN_FRONT_URL}/auth/login?redirect=job/${job?.id}`
				: `#apply-${job?.id}`,
		[job?.id]
	);

	const [open, setOpen] = useState(false);
	const [jobId, setJobId] = useState<string | null>(null);

	const onQuickApply = useCallback((jobId: string) => {
		setJobId(jobId);
		setOpen(true);
	}, []);

	return (
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="center"
			sx={{
				position: "relative",
			}}
		>
			<ApplyGuestJobDialog open={open} setOpen={setOpen} job={jobId || ""} />
			<Paper elevation={0} sx={jobDetailsPaperStyles}>
				<Grid container spacing={2} alignItems="center">
					<Grid
						size={{
							xs: 12,
							md: 8,
						}}
					>
						<Stack
							direction={isMediumScreen ? "column" : "row"}
							alignItems={isMediumScreen ? "flex-start" : "center"}
							justifyContent="flex-start"
							spacing={1}
						>
							<CardAvatar
								avatar={
									job?.is_company_confidential ? undefined : job?.owner?.logo
								}
								width={"90px"}
								height={"90px"}
							/>
							<Stack spacing={0.5}>
								<Typography variant={"h5"}>{job?.title}</Typography>
								{ownerName && (
									<Typography
										variant="body1"
										color="primary.main"
										component={Link}
										href={`/company/${job?.owner?.id}`}
										style={{ textDecoration: "none" }}
									>
										{ownerName}
									</Typography>
								)}
								<Stack
									direction={isMediumScreen ? "column" : "row"}
									spacing={1}
									alignItems={isMediumScreen ? "flex-start" : "center"}
									useFlexGap
								>
									{metaChips.map((chip) => (
										<MetaChip
											key={`${chip.label}-${chip.color ?? "default"}`}
											label={chip.label}
											color={chip.color}
											icon={chip.icon}
										/>
									))}
								</Stack>
							</Stack>
						</Stack>
					</Grid>

					<Grid
						size={{
							xs: 12,
							md: 4,
						}}
					>
						<Stack
							direction={isMediumScreen ? "row" : "column"}
							spacing={2}
							alignItems={isMediumScreen ? "stretch" : "flex-end"}
							justifyContent="flex-end"
						>
							<ShareButtons id={job?.id} />
							{job?.owner == null ? (
								<Button
									variant={"contained"}
									size="large"
									sx={{
										fontFamily: "Epilogue SemiBold",
										px: 3,
										py: 1.5,
										borderRadius: 1.5,
									}}
									onClick={() => onQuickApply(job.id)}
									endIcon={<ArrowOutwardRounded />}
								>
									{t("button.quick_apply")}
								</Button>
							) : (
								<Button
									variant="contained"
									size="large"
									component={Link}
									href={applyHref}
									sx={{
										fontFamily: "Epilogue SemiBold",
										px: 3,
										py: 1.5,
										borderRadius: 1.5,
									}}
									endIcon={<ArrowOutwardRounded />}
								>
									{t("common.apply")}
								</Button>
							)}
						</Stack>
					</Grid>
				</Grid>
			</Paper>
		</Box>
	);
});

JobDetailsHeading.displayName = "JobDetailsHeading";
MetaChip.displayName = "MetaChip";
export default JobDetailsHeading;
