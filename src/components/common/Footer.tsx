"use client";

import { screenPadding } from "@/lib/utils";
import { LinkedIn } from "@mui/icons-material";
import {
	Box,
	Button,
	Divider,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemText,
	OutlinedInput,
	Stack,
	Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const aboutLinks = [
	{ labelKey: "homePage.footer.about.companies", href: "#" },
	{ labelKey: "homePage.footer.about.pricing", href: "#" },
	{ labelKey: "homePage.footer.about.terms", href: "#" },
	{ labelKey: "homePage.footer.about.advice", href: "#" },
	{ labelKey: "homePage.footer.about.privacy", href: "/privacy-policy" },
];

const resourceLinks = [
	{ labelKey: "homePage.footer.resources.helpDocs", href: "#" },
	{ labelKey: "homePage.footer.resources.guide", href: "#" },
	{ labelKey: "homePage.footer.resources.updates", href: "#" },
	{ labelKey: "homePage.footer.resources.contact", href: "#" },
];

const socialLinks = [
	// { icon: <Facebook />, label: "facebook", href: "#" },
	{
		icon: <LinkedIn />,
		label: "linkedin",
		href: "https://www.linkedin.com/company/entropicon",
	},
	// { icon: <X />, label: "x", href: "#" },
	// { icon: <Instagram />, label: "instagram", href: "#" },
];

const Footer: React.FC = React.memo(() => {
	const t = useTranslations();

	return (
		<Grid
			container
			component="footer"
			spacing={4}
			sx={{
				px: screenPadding,
				py: 4,
				backgroundColor: "var(--footer-bg)",
			}}
		>
			<Grid
				size={{
					xs: 12,
					md: 4,
				}}
			>
				<Box
					component="img"
					src="/logo/logo_long.svg"
					alt="logo"
					sx={{ mb: 2, height: 35 }}
				/>
			</Grid>
			<Grid
				size={{
					xs: 12,
					md: 4,
				}}
			>
				<Stack spacing={8} direction="row">
					<Box>
						<Typography variant="h6" sx={{ color: "var(--white)" }}>
							{t("homePage.footer.about.about")}
						</Typography>
						<List
							sx={{
								"& *": {
									color: "var(--neutral-dark)!important",
								},
							}}
						>
							{aboutLinks.map((link) =>
								link.href && link.href !== "#" ? (
									<ListItem key={link.labelKey} disablePadding>
										<Link href={link.href} passHref legacyBehavior>
											<ListItemText
												primary={t(link.labelKey)}
												sx={{ cursor: "pointer" }}
											/>
										</Link>
									</ListItem>
								) : (
									<ListItem key={link.labelKey} disablePadding>
										<ListItemText primary={t(link.labelKey)} />
									</ListItem>
								)
							)}
						</List>
					</Box>
					<Box>
						<Typography variant="h6" sx={{ color: "var(--white)" }}>
							{t("homePage.footer.resources.resources")}
						</Typography>
						<List
							sx={{
								"& *": {
									color: "var(--neutral-dark)!important",
								},
							}}
						>
							{resourceLinks.map((link) => (
								<ListItem key={link.labelKey} disablePadding>
									<ListItemText primary={t(link.labelKey)} />
								</ListItem>
							))}
						</List>
					</Box>
				</Stack>
			</Grid>
			<Grid
				size={{
					xs: 12,
					md: 4,
				}}
			>
				<Typography variant="h6" sx={{ color: "var(--white)" }}>
					{t("homePage.footer.getJobNotifications")}
				</Typography>
				<Typography
					variant="body1"
					className="text-neutral-dark"
					sx={{ my: 2 }}
				>
					{t("homePage.footer.subscribeText")}
				</Typography>
				<Stack spacing={1} direction="row">
					<OutlinedInput
						placeholder={t("placeholder.email")}
						sx={{
							width: "100%",
							backgroundColor: "var(--white)",
							borderRadius: 0,
						}}
						inputProps={{ "aria-label": "email" }}
					/>
					<Button
						variant="contained"
						color="primary"
						sx={{
							borderRadius: 0,
						}}
					>
						{t("homePage.footer.subscribe")}
					</Button>
				</Stack>
			</Grid>
			<Grid
				size={{
					xs: 12,
				}}
			>
				<Divider sx={{ borderColor: "var(--neutral-darker)", mb: 1 }} />
				<Stack direction="row" spacing={1} justifyContent="flex-end">
					{socialLinks.map((social) => (
						<IconButton
							key={social.label}
							href={social.href}
							target="_blank"
							rel="noopener noreferrer"
							sx={{
								width: "32px",
								height: "32px",
								color: "var(--white)",
								backgroundColor: "#363a45",
								"& svg": {
									fill: "var(--white)",
									fontSize: "1.2rem",
								},
							}}
						>
							{social.icon}
						</IconButton>
					))}
				</Stack>
			</Grid>
		</Grid>
	);
});

export default Footer;
Footer.displayName = "Footer";
