"use client";

import theme from "@/theme/theme";
import {
	GridViewRounded,
	KeyboardArrowDown,
	Search,
	ViewStreamRounded,
} from "@mui/icons-material";
import {
	ButtonGroup,
	Grid,
	IconButton,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
	useMediaQuery,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type SearchBoxForJobsProps = {
	handleSortChange: (event: SelectChangeEvent<string>) => void;
	sort: string;
	setListStyle: (value: string) => void;
	listStyle: string;
};

const SearchBoxForJobs: React.FC<SearchBoxForJobsProps> = ({
	handleSortChange,
	sort,
	setListStyle,
	listStyle,
}) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [query, setQuery] = useState(searchParams.get("q") || "");
	const pathname = usePathname();

	const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
	const t = useTranslations();

	const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	const handleSearch = useCallback(() => {
		const trimmed = query.trim();
		if (trimmed) {
			router.push(`${pathname}?q=${encodeURIComponent(trimmed)}`);
		} else {
			router.push(pathname);
		}
	}, [query, router, pathname]);

	const queryClient = useQueryClient();
	const timerKey = useMemo(
		() => ["jobs-search-debounce", query] as const,
		[query]
	);

	const { refetch: runDebounced } = useQuery({
		queryKey: timerKey,
		enabled: false,
		queryFn: async () => {
			handleSearch();
			return true; // must not be undefined
		},
	});

	const isFirstRenderRef = useRef(true);
	const pendingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		if (isFirstRenderRef.current) {
			isFirstRenderRef.current = false;
			return;
		}
		if (pendingTimeoutRef.current) {
			clearTimeout(pendingTimeoutRef.current);
			pendingTimeoutRef.current = null;
		}

		const id = setTimeout(() => {
			runDebounced();
		}, 400);
		pendingTimeoutRef.current = id;

		return () => {
			if (pendingTimeoutRef.current) {
				clearTimeout(pendingTimeoutRef.current);
				pendingTimeoutRef.current = null;
			}
			queryClient.cancelQueries({ queryKey: timerKey, exact: true });
		};
	}, [query, queryClient, runDebounced, timerKey]);

	return (
		<Grid
			size={{ xs: 12 }}
			sx={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				gap: 1,
				pt: isMediumScreen ? "56px" : "64px",
			}}
		>
			<OutlinedInput
				value={query}
				onChange={handleQueryChange}
				placeholder={t("common.search")}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						if (pendingTimeoutRef.current) {
							clearTimeout(pendingTimeoutRef.current);
							pendingTimeoutRef.current = null;
						}
						queryClient.cancelQueries({ queryKey: timerKey, exact: true });
						handleSearch();
					}
				}}
				endAdornment={<Search />}
				sx={{
					borderRadius: 3,
					flex: 1,
					"& *": {
						border: "none!important",
						outline: "none!important",
					},
					border: "1px solid var(--border-color)",
					height: 42,
				}}
			/>

			<ButtonGroup sx={{ alignItems: "center", gap: 1 }}>
				<Select
					value={sort}
					onChange={handleSortChange}
					IconComponent={KeyboardArrowDown}
					sx={{
						fontSize: "0.875rem",
						flex: isMediumScreen ? 1 : "unset",
						borderRadius: 3,
						px: 2,
						width: isMediumScreen ? "100%" : "auto",
						height: 42,
					}}
				>
					<MenuItem value="mostRelevant">{t("common.mostRelevant")}</MenuItem>
					<MenuItem value="atoz">{t("common.AtoZ")}</MenuItem>
					<MenuItem value="ztoa">{t("common.ZtoA")}</MenuItem>
					<MenuItem value="newest">{t("common.newest")}</MenuItem>
					<MenuItem value="oldest">{t("common.oldest")}</MenuItem>
				</Select>

				{!isMediumScreen && (
					<>
						<IconButton
							onClick={() => setListStyle("grid")}
							sx={{
								borderRadius: 3,
								background:
									listStyle === "grid" ? "var(--primary-color)" : "transparent",
								border: "1px solid var(--border-color)",
								"&:hover": {
									background:
										listStyle === "grid"
											? "var(--primary-color)"
											: "transparent",
								},
							}}
						>
							<GridViewRounded
								sx={{
									fill:
										listStyle === "grid"
											? "var(--neutral-lightest)"
											: "var(--neutral-darker)",
								}}
							/>
						</IconButton>

						<IconButton
							onClick={() => setListStyle("list")}
							sx={{
								borderRadius: 3,
								background:
									listStyle === "list" ? "var(--primary-color)" : "transparent",
								border: "1px solid var(--border-color)",
								"&:hover": {
									background:
										listStyle === "list"
											? "var(--primary-color)"
											: "transparent",
								},
							}}
						>
							<ViewStreamRounded
								sx={{
									fill:
										listStyle === "list"
											? "var(--neutral-lightest)"
											: "var(--neutral-darker)",
								}}
							/>
						</IconButton>
					</>
				)}
			</ButtonGroup>
		</Grid>
	);
};

export default SearchBoxForJobs;
