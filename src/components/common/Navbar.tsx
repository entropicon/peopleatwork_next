"use client";

import useIsomorphicLayoutEffect from "@/hooks/useLayoutEffect";
import { Close, Menu, PostAdd } from "@mui/icons-material";
import {
	Box,
	Button,
	Container,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
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
		<Box
			component="header"
			sx={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				zIndex: 1200,
				borderBottom: scrolled ? "1px solid var(--border-color)" : "transparent",
				backgroundColor: scrolled ? "rgba(255, 255, 255, 0.9)" : "transparent",
				backdropFilter: scrolled ? "blur(10px)" : "none",
				transition: "background-color 0.2s ease, border-color 0.2s ease",
			}}
		>
			<Container
				maxWidth="lg"
				disableGutters
				sx={{
					px: { xs: 2, sm: 3, md: 0 },
				}}
			>
				<Toolbar
					sx={{
						minHeight: { xs: 64, md: 72 },
						px: 0,
						justifyContent: "space-between",
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
							<Drawer
								anchor="left"
								open={drawerOpen}
								onClose={toggleDrawer(false)}
								PaperProps={{
									sx: {
										width: "100%",
										maxWidth: 320,
										background: "linear-gradient(180deg, rgba(245, 247, 250, 0.95) 0%, #fff 100%)",
										borderRight: "1px solid var(--border-color)",
										boxShadow: "0 12px 32px -12px rgba(37, 50, 75, 0.2)",
										padding: 0,
										display: "flex",
										flexDirection: "column",
									},
								}}
							>
								<Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
											px: 2.5,
											py: 2,
										}}
									>
										<Link href={`/${locale}`}>
											<Box
												component="img"
												src="/logo/logo_long.svg"
												alt="logo"
												sx={{ height: 28 }}
											/>
										</Link>
										<IconButton
											aria-label="close menu"
											onClick={toggleDrawer(false)}
											sx={{ color: "var(--neutral-dark)" }}
										>
											<Close />
										</IconButton>
									</Box>
									<Divider />
									<List
										sx={{
											flexGrow: 1,
											py: 2,
											px: 2.5,
											display: "flex",
											flexDirection: "column",
											gap: 1,
										}}
									>
										<ListItem disablePadding>
											<ListItemButton
												component={Link}
												href={`/${locale}/jobs`}
												onClick={toggleDrawer(false)}
												sx={{
													borderRadius: 2,
													py: 1.5,
												}}
											>
												<ListItemText
													primary={t("common.findJobs")}
													primaryTypographyProps={{
														fontWeight: 600,
														variant: "body1",
													}}
												/>
											</ListItemButton>
										</ListItem>
										<ListItem disablePadding>
											<ListItemButton
												component={Link}
												href={`/${locale}/browse-companies`}
												onClick={toggleDrawer(false)}
												sx={{
													borderRadius: 2,
													py: 1.5,
												}}
											>
												<ListItemText
													primary={t("common.browseCompanies")}
													primaryTypographyProps={{
														fontWeight: 600,
														variant: "body1",
													}}
												/>
											</ListItemButton>
										</ListItem>
									</List>
									<Box
										sx={{
											px: 2.5,
											pb: 3,
											display: "flex",
											flexDirection: "column",
											gap: 1,
										}}
									>
										<Button
											fullWidth
											variant="outlined"
											component={Link}
											href={`${process.env.NEXT_PUBLIC_MAIN_FRONT_URL}/auth/login`}
											onClick={toggleDrawer(false)}
											sx={{ borderRadius: 2 }}
										>
											{t("common.login")}
										</Button>
										<Button
											fullWidth
											variant="contained"
											component={Link}
											href={`${process.env.NEXT_PUBLIC_MAIN_FRONT_URL}/auth/register`}
											onClick={toggleDrawer(false)}
											sx={{ borderRadius: 2 }}
										>
											{t("common.signUp")}
										</Button>
									</Box>
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
							<Link href="/post-job">
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
							</Link>
							<React.Fragment>
								<Link
									href={`${process.env.NEXT_PUBLIC_MAIN_FRONT_URL}/auth/login`}
								>
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
			</Container>
		</Box>
	);
};

export default Navbar;
