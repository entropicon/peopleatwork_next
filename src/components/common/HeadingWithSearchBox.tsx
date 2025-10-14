"use client";

import { Box, Stack, Typography } from "@mui/material";
import React, { useMemo } from "react";
import SearchBox from "./SearchBox";
import { useTranslations } from "next-intl";

const HeadingWithSearchBox: React.FC = React.memo(() => {
	const t = useTranslations("homePage");
	const underlineSpanSx = useMemo(
		() => ({
			fontFamily: "inherit",
			position: "relative",
			color: "var(--blue)",
			"&::after": {
				content: "''",
				width: "100%",
				height: 20,
				position: "absolute",
				bottom: -20,
				left: "0",
				backgroundImage: `url(/images/icons/underline.svg)`,
				backgroundSize: "contain",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
			},
		}),
		[]
	);

	return (
		<Stack
			spacing={4}
			alignItems="center"
			sx={{
				minHeight: "60vh",
				backgroundColor: "var(--neutral-lightest)",
				pt: "8rem",
				px: {
					xs: "2%",
					s: "5%",
					md: "8%",
					lg: "10%",
				},
			}}
		>
			<Typography variant="h1">
				{t("findYour")}{" "}
				<Box component="span" sx={underlineSpanSx}>
					{t("dreamJob")}
				</Box>
			</Typography>
			<Typography variant="body1" className="text-neutral-dark">
				{t("findYourDreamJobDescription")}
			</Typography>
			<SearchBox />
		</Stack>
	);
});

export default HeadingWithSearchBox;
HeadingWithSearchBox.displayName = "HeadingWithSearchBox";
