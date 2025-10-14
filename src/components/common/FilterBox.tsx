import useIsomorphicLayoutEffect from "@/hooks/useLayoutEffect";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Checkbox,
	Divider,
	Drawer,
	FormControlLabel,
	Grid,
	IconButton,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

interface FilterItem {
	id: string | number;
	[key: string]: string | number;
}

interface FilterGroup {
	title: string;
	key: string;
	data: FilterItem[];
}

interface FilterBoxProps {
	filterData: FilterGroup[];
}

const FilterBox: React.FC<FilterBoxProps> = ({ filterData }) => {
	const t = useTranslations();
	const lang = useLocale();
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

	const [drawerOpen, setDrawerOpen] = useState(false);
	const [buttonTransform, setButtonTransform] = useState("translateX(200px)");
	const router = useRouter();
	const searchParams = useSearchParams();

	const [selectedFilters, setSelectedFilters] = useState<{
		[key: string]: number[];
	}>({});

	// Per-group search queries
	const [searchQueries, setSearchQueries] = useState<Record<string, string>>(
		{}
	);

	const handleSearchChange = useCallback((key: string, value: string) => {
		setSearchQueries((prev) => ({ ...prev, [key]: value }));
	}, []);

	const toggleDrawer = () => setDrawerOpen((prev) => !prev);

	// Scroll button visibility
	useIsomorphicLayoutEffect(() => {
		if (typeof window === "undefined") return;

		const handleScroll = () => {
			const scrollY = window.scrollY;
			const scrollHeight = document.documentElement.scrollHeight;
			const clientHeight = document.documentElement.clientHeight;
			const distanceFromBottom = scrollHeight - scrollY - clientHeight;

			if (scrollY > 200 && distanceFromBottom > 500) {
				setButtonTransform("translateX(0)");
			} else {
				setButtonTransform("translateX(200px)");
			}
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Parse URL params
	const parseArrayParam = (param: string | null) =>
		param
			? param
					.split(",")
					.map((id) => parseInt(id, 10))
					.filter((id) => !isNaN(id))
			: [];

	useEffect(() => {
		const newSelected: { [key: string]: number[] } = {};
		filterData.forEach((item) => {
			const arr = parseArrayParam(searchParams.get(item.key));
			if (arr.length > 0) newSelected[item.key] = arr;
		});
		setSelectedFilters(newSelected);
	}, [searchParams, filterData]);

	// Change filter
	const handleFilterChange = useCallback(
		(key: string, data: FilterItem) => {
			const currentArr = selectedFilters[key] || [];
			const id = Number(data.id);
			const updatedArr = currentArr.includes(id)
				? currentArr.filter((item) => item !== id)
				: [...currentArr, id];

			setSelectedFilters((prev) => ({
				...prev,
				[key]: updatedArr,
			}));

			const params = new URLSearchParams(searchParams.toString());
			if (updatedArr.length > 0) {
				params.set(key, updatedArr.join(","));
			} else {
				params.delete(key);
			}
			params.set("page", "1");
			router.replace(`?${params.toString()}`, { scroll: false });
		},
		[router, searchParams, selectedFilters]
	);

	const handleClearFilters = () => {
		setSelectedFilters({});
		const params = new URLSearchParams(searchParams.toString());
		filterData.forEach((item) => params.delete(item.key));
		params.set("page", "1");
		router.replace(`?${params.toString()}`, { scroll: false });
	};

	const filterContent = (
		<Box>
			{filterData.map((item) => {
				const getItemLabel = (data: FilterItem) => {
					const base = (data[`name_${lang}` as keyof typeof data] ??
						data[lang as keyof typeof data]) as unknown as
						| string
						| number
						| undefined;
					const text = (base ?? "").toString();
					const countSuffix =
						data?.count !== undefined && Number(data?.count) >= 0
							? ` (${data.count})`
							: "";
					return { text, labelWithCount: `${text}${countSuffix}` };
				};

				const q = (searchQueries[item.key] || "").trim().toLowerCase();
				const filteredData = q
					? item.data.filter((d) =>
							getItemLabel(d).text.toLowerCase().startsWith(q)
					  )
					: item.data;

				return (
					<React.Fragment key={item.key}>
						<Divider sx={{ my: 2, borderColor: "var(--border-color)" }} />
						<Accordion defaultExpanded>
							<AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ py: 1 }}>
								{item.title}
							</AccordionSummary>
							<AccordionDetails
								sx={{
									p: 0,
									display: "flex",
									flexDirection: "column",
									maxHeight: "250px",
									overflowY: "auto",
									"&::-webkit-scrollbar": { width: "4px" },
									"&::-webkit-scrollbar-thumb": {
										backgroundColor: "#ccc",
										borderRadius: "4px",
									},
								}}
							>
								<Box
									sx={{
										position: "sticky",
										top: 0,
										backgroundColor: "var(--white)",
										zIndex: 1,
										pb: 1,
									}}
								>
									<input
										type="text"
										placeholder={t("common.search")}
										value={searchQueries[item.key] || ""}
										onChange={(e) =>
											handleSearchChange(item.key, e.target.value)
										}
										style={{
											width: "100%",
											padding: "8px 12px",
											border: "1px solid var(--border-color)",
											borderRadius: "4px",
											fontSize: "14px",
											outline: "none",
										}}
									/>
								</Box>
								{filteredData.length === 0 && (
									<Typography variant="body2" color="text.secondary">
										{t("common.notFoundAnyResults")}
									</Typography>
								)}
								{filteredData.map((data) => {
									const isChecked = (selectedFilters[item.key] || []).includes(
										Number(data.id)
									);
									const { labelWithCount } = getItemLabel(data);

									return (
										<FormControlLabel
											key={data.id}
											control={
												<Checkbox
													checked={isChecked}
													onChange={() => handleFilterChange(item.key, data)}
													sx={{
														py: 0.5,

														"& svg": {
															fill: isChecked
																? "var(--primary-color)"
																: "var(--text-color)",
														},
													}}
												/>
											}
											label={labelWithCount}
										/>
									);
								})}
							</AccordionDetails>
						</Accordion>
					</React.Fragment>
				);
			})}
		</Box>
	);

	if (!isDesktop) {
		return (
			<>
				<IconButton
					onClick={toggleDrawer}
					sx={{
						position: "fixed",
						bottom: "10px",
						right: "10px",
						zIndex: 2,
						width: 40,
						backgroundColor: "var(--primary-color)",
						color: "white",
						transform: buttonTransform,
						transition: "transform 0.3s ease-in-out",
						"&:hover": { backgroundColor: "var(--primary-color)" },
					}}
				>
					<FilterListIcon
						sx={{
							fill: "var(--neutral-lightest)",
						}}
					/>
				</IconButton>

				<Drawer
					anchor="left"
					open={drawerOpen}
					onClose={toggleDrawer}
					sx={{ "& .MuiDrawer-paper": { width: "80%", maxWidth: 300 } }}
				>
					<Box sx={{ p: 2 }}>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								mb: 2,
							}}
						>
							<Typography variant="h5">{t("common.filter")}</Typography>
							<IconButton onClick={toggleDrawer}>
								<CloseIcon />
							</IconButton>
						</Box>
						{filterContent}
					</Box>
				</Drawer>
			</>
		);
	}

	return (
		<Grid
			size={{ xs: 12 }}
			sx={{
				boxShadow: "var(--box-shadow)",
				borderRadius: 4,
				border: "1px solid var(--border-color)",
				p: 2,
				position: "sticky",
				top: 64,
				zIndex: 1,
			}}
		>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				mb={1}
			>
				<Typography variant="h5">{t("common.filter")}</Typography>
				<Typography
					variant="body2"
					className="text-neutral-dark"
					onClick={handleClearFilters}
					sx={{ cursor: "pointer" }}
				>
					{t("button.clear")}
				</Typography>
			</Stack>
			{filterContent}
		</Grid>
	);
};

export default FilterBox;
