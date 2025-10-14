"use client";

import { Search } from "@mui/icons-material";
import {
	Button,
	Divider,
	FormControl,
	Grid,
	Input,
	InputAdornment,
} from "@mui/material";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useState } from "react";
import type { SingleValue } from "react-select";

const GooglePlacesAutocomplete = dynamic(
	() => import("react-google-places-autocomplete"),
	{ ssr: false }
);

interface Option {
	label: string;
	value: {
		description: string;
		place_id: string;
		reference: string;
		structured_formatting: {
			main_text: string;
			secondary_text: string;
		};
	};
}

const SearchBox: React.FC = React.memo(() => {
	const searchParams = useSearchParams();
	const [query, setQuery] = useState(searchParams.get("q") || "");
	const [location, setLocation] = useState(searchParams.get("location") || "");
	const router = useRouter();
	const t = useTranslations();
	const google_api_key = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;


	const handleQueryChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setQuery(e.target.value);
		},
		[]
	);

	const handleLocationChange = useCallback((newValue: SingleValue<Option>) => {
		if (newValue?.value?.description) {
			setLocation(newValue.value.description);
		}
	}, []);

	const handleSearch = useCallback(() => {
		if (!query) return;
		router.push(
			`/jobs?q=${encodeURIComponent(
				query
			)}&location=${encodeURIComponent(location)}`
		);
	}, [query, location, router]);

	return (
		<Grid
			container
			sx={{
				p: 3,
				my: 2,
				width: "100%",
				border: "1px solid var(--border-color)",
				backgroundColor: "var(--white)",
				borderRadius: "1rem"
			}}
			alignItems="center"
			spacing={2}
		>
			<Grid
				size={{
					xs: 12,
					md: 4,
				}}
			>
				<FormControl fullWidth>
					<Input
						id="input-with-icon-adornment"
						sx={{
							height: "3.5rem",
							width: "100%",
						}}
						placeholder={t("placeholder.searchForJobs")}
						onChange={handleQueryChange}
						value={query}
						startAdornment={
							<InputAdornment position="start">
								<Search />
							</InputAdornment>
						}
					/>
				</FormControl>
			</Grid>
			<Grid
				size={{
					xs: 0,
					md: 1,
				}}
				sx={{
					display: { xs: "none", md: "flex" },
					justifyContent: "center",
					alignItems: "center",
					m: 0,
				}}
			>
				<Divider orientation="vertical" flexItem />
			</Grid>
			<Grid
				size={{
					xs: 12,
					md: 4,
				}}
			>
				<FormControl variant="standard" fullWidth>
					<GooglePlacesAutocomplete
						apiKey={google_api_key}
						debounce={300}
						minLengthAutocomplete={2}
						selectProps={{
							placeholder: t("label.city"),
							onChange: handleLocationChange,
							name: "location",
							styles: {
								input: (provided) => ({
									...provided,
									height: "48px",
									width: "100%",
									boxSizing: "border-box",
								}),
								control: (provided) => ({
									...provided,
									border: "none",
									height: "56px",
									boxShadow: "none",
									borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
									borderRadius: 0,
									"&:hover": {
										borderBottom: "2px solid #000",
									},
								}),
							},
						}}
					/>
				</FormControl>
			</Grid>
			<Grid
				size={{
					xs: 12,
					md: 3,
				}}
				sx={{
					pl: {
						xs: 0,
						md: "3rem",
					},
				}}
			>
				<Button
					fullWidth
					sx={{
						height: "3.5rem",
						mt: { xs: 2, md: 0 },
					}}
					variant="contained"
					onClick={handleSearch}
					disabled={!query}
				>
					{t("button.search")}
				</Button>
			</Grid>
		</Grid>
	);
});

export default SearchBox;
SearchBox.displayName = "SearchBox";
