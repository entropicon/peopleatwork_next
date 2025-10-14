import { BusinessOutlined, FiberManualRecord } from "@mui/icons-material";
import { Avatar, Box, Card, Stack, styled, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { memo } from "react";

export const Badge = memo(
	({
		text,
		color,
		isOutlined = true,
		sx = {},
	}: {
		text: string;
		color?: string;
		isOutlined?: boolean;
		sx?: object;
	}) => (
		<Box
			component="span"
			className="one-line-text"
			sx={{
				height: "30px",
				width: "fit-content",
				px: 1,
				borderRadius: 1,
				color: isOutlined ? color : "inherit",
				border: "1px solid",
				textAlign: "center",
				lineHeight: "30px",
				borderColor: isOutlined ? color : "var(--border-color)",
				cursor: "default",
				fontSize: {
					xs: "10px",
					sm: "12px",
				},
				fontFamily: isOutlined ? "inherit" : "Epilogue Regular",
				...sx,
			}}
		>
			{text}
		</Box>
	)
);

const StyledDot = memo(() => (
	<FiberManualRecord
		sx={{
			width: 5,
			height: 5,
			fill: "var(--neutral-dark)",
		}}
	/>
));

export const CompanyInfo = memo(
	({
		location,
		companyName,
		isConfidential,
	}: {
		location: string;
		companyName: string;
		isConfidential: boolean;
	}) => {
		const t = useTranslations();
		return (
			<Stack
				direction="row"
				alignItems="center"
				spacing={1}
				className="one-line-text"
			>
				{isConfidential ? (
					<Typography variant="body2">{t("common.confidential")}</Typography>
				) : (
					<>
						<Typography variant="body2">{companyName}</Typography>
						{location && <StyledDot />}
						<Typography variant="body2">{location}</Typography>
					</>
				)}
			</Stack>
		);
	}
);

export const StyledAvatar = styled(Avatar)(
	({ width, height }: { width?: string; height?: string }) => ({
		width: width ? `${width}` : "50px",
		height: height ? `${height}` : "50px",
		border: "1px solid var(--border-color)",
		borderRadius: "1rem",
		backgroundColor: "var(--neutral-lightest)",
	})
);

export const CardAvatar = ({
	avatar,
	width,
	height,
}: {
	avatar: string | undefined;
	width?: string;
	height?: string;
}) => (
	<StyledAvatar src={avatar} alt="" width={width} height={height}>
		<BusinessOutlined
			sx={{
				fill: "var(--border-color)",
			}}
		/>
	</StyledAvatar>
);

export const StyledCard = styled(Card)(() => ({
	padding: "1rem",
	cursor: "pointer",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	gap: "0.5rem",
}));

Badge.displayName = "Badge";
CompanyInfo.displayName = "CompanyInfo";
StyledDot.displayName = "StyledDot";
