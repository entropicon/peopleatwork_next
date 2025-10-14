"use client";

import useIsomorphicLayoutEffect from "@/hooks/useLayoutEffect";
import { Menu, PostAdd } from "@mui/icons-material";
import {
	Box,
	Button,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemText,
	MenuItem,
	Select,
	SelectChangeEvent,
	Toolbar,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const StyledLinkBox = styled(Link)(
	({ href, pathname }: { href: string; pathname: string }) => ({
		position: "relative",
		color: href === pathname ? "var(--primary-color)" : "var(--neutral-dark)",
		fontFamily: href === pathname ? "Epilogue SemiBold" : "Epilogue Medium",
		textDecoration: "none",
		"&::after":
			href === pathname
				? {
						content: "''",
						position: "absolute",
						display: "block",
						width: "100%",
						height: "2px",
						background: "var(--primary-color)",
						transition: "width .3s",
						bottom: -12,
				  }
				: "",
	})
);

const Navbar: React.FC = () => {
	const pathname = usePathname();
	const [drawerOpen, setDrawerOpen] = useState(false);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"), { noSsr: true });
	const t = useTranslations();
	const locale = useLocale();
	const [scrolled, setScrolled] = useState(false);
	const router = useRouter();

	const handleLanguageChange = (e: SelectChangeEvent<string>) => {
		const newLocale = e.target.value;
		const currentPath = pathname || "/";
		const pathWithoutLocale =
			currentPath.replace(/^\/(az|en|ru)(?=\/|$)/, "") || "/";
		const newPath = `/${newLocale}${pathWithoutLocale}`;
		router.replace(newPath);
		router.refresh();
	};

	const toggleDrawer = (open: boolean) => () => {
		setDrawerOpen(open);
	};

	useIsomorphicLayoutEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 1) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};
		window.addEventListener("scroll", handleScroll);
		handleScroll();
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const language = (
		<Select
			variant="outlined"
			onChange={handleLanguageChange}
			value={locale}
			sx={{
				fontSize: "0.875rem",
			}}
		>
			<MenuItem value="en">EN</MenuItem>
			<MenuItem value="az">AZ</MenuItem>
			<MenuItem value="ru">RU</MenuItem>
		</Select>
	);

	return (
		<Toolbar
			sx={{
				height: "30px!important",
				justifyContent: "space-between",
				backgroundColor: scrolled ? "white" : "transparent",
				position: "fixed",
				top: 0,
				borderBottom: scrolled ? "1px solid var(--border-color)" : "none",
				width: "100%",
				zIndex: 999,
				px: {
					xs: "2%",
					s: "4%",
					md: "6%",
				},
			}}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 2,
				}}
			>
				<Link href={`/${locale}`}>
					<Box
						component="img"
						src="/logo/logo_long.svg"
						alt="logo"
						sx={{
							height: 35,
						}}
					/>
				</Link>
				{!isMobile && (
					<React.Fragment>
						<StyledLinkBox pathname={pathname} href={`/${locale}/jobs`}>
							{t("common.findJobs")}
						</StyledLinkBox>
						<StyledLinkBox
							pathname={pathname}
							href={`/${locale}/browse-companies`}
						>
							{t("common.browseCompanies")}
						</StyledLinkBox>
					</React.Fragment>
				)}
			</Box>

			{isMobile ? (
				<React.Fragment>
					<Box>
						{language}
						<IconButton aria-label="menu" onClick={toggleDrawer(true)}>
							<Menu sx={{ fontSize: 36, fill: "#25324B" }} />
						</IconButton>
					</Box>
					<Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
						<Box
							sx={{
								width: "100vw",
								height: "100vh",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
							}}
							role="presentation"
							onClick={toggleDrawer(false)}
							onKeyDown={toggleDrawer(false)}
						>
							<List>
								<ListItem>
									<Link
										href={`/${locale}/jobs`}
										style={{
											textDecoration: "none",
										}}
									>
										<ListItemText primary={t("common.findJobs")} />
									</Link>
								</ListItem>
								<ListItem>
									<Link
										href={`/${locale}/browse-companies`}
										style={{
											textDecoration: "none",
										}}
									>
										<ListItemText primary={t("common.browseCompanies")} />
									</Link>
								</ListItem>
								<ListItem
									sx={{
										mb: 1,
									}}
								>
									<Button fullWidth variant="outlined">
										<Link
											href={`${process.env.NEXT_PUBLIC_MAIN_FRONT_URL}/auth/login`}
										>
											{t("common.login")}
										</Link>
									</Button>
								</ListItem>
								<ListItem>
									<Button fullWidth variant="contained">
										<Link
											href={`${process.env.NEXT_PUBLIC_MAIN_FRONT_URL}/auth/register`}
										>
											{t("common.signUp")}
										</Link>
									</Button>
								</ListItem>
							</List>
						</Box>
					</Drawer>
				</React.Fragment>
			) : (
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 2,
					}}
				>
					{language}
					{/* <Link href="/post-job">
						<Button
							variant="contained"
							size="small"
							startIcon={
								<PostAdd
									sx={{
										mb: 0.5,
									}}
								/>
							}
						>
							{t("button.post_job")}
						</Button>
					</Link> */}
					<React.Fragment>
						<Link href={`${process.env.NEXT_PUBLIC_MAIN_FRONT_URL}/auth/login`}>
							<Button variant="outlined" size="small">
								{t("common.login")}
							</Button>
						</Link>

						<Link
							href={`${process.env.NEXT_PUBLIC_MAIN_FRONT_URL}/auth/register`}
						>
							<Button variant="contained" size="small">
								{t("common.signUp")}
							</Button>
						</Link>
					</React.Fragment>
				</Box>
			)}
		</Toolbar>
	);
};

export default Navbar;
