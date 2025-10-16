import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

interface HeadingProps {
	text: string;
	text_blue?: string;
	button_text: string;
	button_link: string;
}

const Heading: React.FC<HeadingProps> = React.memo(
	({ text, text_blue, button_text, button_link }) => {
		return (
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				sx={{ pb: 4}}
			>
				<Typography variant="h1">
					{text}
					{text_blue && (
						<Box component="span" color="var(--blue)" fontFamily="inherit">
							{" "}
							{text_blue}
						</Box>
					)}
				</Typography>
				<Button
					variant="text"
					component={Link}
					href={button_link}
					sx={{
						color: "var(--primary-color)",
						display: { xs: "none", md: "flex" },
					}}
					endIcon={
						<ArrowForward
							sx={{
								ml: 1,
								fill: "var(--primary-color)",
							}}
						/>
					}
				>
					{button_text}
				</Button>
			</Stack>
		);
	}
);

export default Heading;
Heading.displayName = "Heading";
