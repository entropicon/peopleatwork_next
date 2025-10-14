import { jobDetailsPaperStyles } from "@/lib/utils";
import theme from "@/theme/theme";
import { JobOwner } from "@/types/types";
import { East } from "@mui/icons-material";
import { Box, Paper, Stack, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
const JobOwnerCompany = ({ owner }: { owner: JobOwner }) => {
	const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
	const t = useTranslations();
	return (
		<Paper
			elevation={0}
			sx={jobDetailsPaperStyles}
		>
			<Stack direction={"row"} alignItems={"center"} spacing={2}>
				<Image
					src={owner?.logo}
					alt={owner?.name}
					width={80}
					height={80}
					style={{ objectFit: "cover" }}
				/>
				<Box>
					<Typography variant={isMediumScreen ? "h5" : "h4"}>
						{owner?.name}
					</Typography>
					<Link
						style={{
							textDecoration: "none",
							display: "flex",
							alignItems: "center",
							fontSize: isMediumScreen ? "0.8rem" : "1rem",
						}}
						href={`/company/${owner?.id}`}
					>
						{t("common.readMore")}
						<East
							sx={{
								fill: "var(--primary-color)",
								ml: 1,
							}}
						/>
					</Link>
				</Box>
			</Stack>
			<Typography sx={{ mt: 2 }} variant={"body1"}>
				{owner?.description}
			</Typography>
		</Paper>
	);
};

export default JobOwnerCompany;
