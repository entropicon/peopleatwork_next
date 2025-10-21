"use client";

import { jobLevel } from "@/constants/variables";
import { dedectError } from "@/lib/utils";
import { snack } from "@/providers/SnackbarProvider";
import postJobSchema from "@/schemas/postjobSchema";
import { JobPostFormValues, StandartType } from "@/types/types";
import { ArrowForward } from "@mui/icons-material";
import {
	Autocomplete,
	Box,
	Button,
	Chip,
	Divider,
	FormControlLabel,
	Grid,
	InputAdornment,
	MenuItem,
	Paper,
	Switch,
	TextField,
	Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import Tiptap from "../tiptap/Tiptap";
import { CREATE_GUEST_JOB } from "@/constants/apiRoutes";

const PostJobFormComponents = ({
	employmentTypes,
	categories,
	skills,
	benefits,
}: {
	employmentTypes: StandartType[];
	categories: StandartType[];
	skills: StandartType[];
	benefits: StandartType[];
}) => {
	const router = useRouter();
	const formik = useFormik<JobPostFormValues>({
		initialValues: {
			title: "",
			employment_type: "",
			category: "",
			min_salary: "",
			max_salary: "",
			currency: "AZN",
			is_salary_hidden: true,
			description: "",
			responsibilities: "",
			who_you_are: "",
			nice_to_have: "",
			experience: "",
			skills: [],
			benefits: [],
			education: "",
			openings: 1,
			is_company_confidential: false,
			owner_name: "",
			owner_email: "",
			owner_phone_number: "",
			job_level: "",
			key_objectives: "",
			measurable_outcomes: "",
			certification: "",
			industry_spesific_knowledge: "",
		},
		validationSchema: postJobSchema,
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: async (values) => {
			const payload = {
				...values,
				salary: `${values.min_salary}-${values.max_salary}`,
			};
			try {
				const response = await axios.post(
					CREATE_GUEST_JOB,
					payload
				);
				if (response.status === 201) {
					snack.success(
						"Job saved successfully. After payment it will be sent for review and after approval it will be published"
					);
					router.push("/payment/" + response.data.id);
				} else {
					snack.error("Failed to create job");
				}
			} catch (e: unknown) {
				console.error(e);
				let errMessage = "Unexpected error";
				if (typeof e === "object" && e !== null) {
					// Attempt to detect axios error shape safely
					const maybeAxios = e as {
						response?: { data?: { message?: string } };
					};
					if (maybeAxios.response?.data?.message) {
						errMessage = maybeAxios.response.data.message;
					}
				}
				snack.error(errMessage);
			}
		},
	});
	const t = useTranslations();
	const lang = useLocale();
	// Stable handlers for rich text fields to avoid re-renders of memoized editor
	const richTextFields = React.useMemo(
		() =>
			[
				"description",
				"responsibilities",
				"who_you_are",
				"nice_to_have",
				"key_objectives",
				"measurable_outcomes",
				"education",
				"certification",
				"industry_spesific_knowledge",
			] as Array<keyof JobPostFormValues>,
		[]
	);
	const richTextHandlers = React.useMemo(() => {
		const entries = richTextFields.map((field) => [
			field,
			(value: string) => formik.setFieldValue(field as string, value, false),
		]);
		return Object.fromEntries(entries) as Record<
			keyof JobPostFormValues,
			(value: string) => void
		>;
	}, [formik, richTextFields]);

	const skillsOptions = React.useMemo(
		() =>
			skills
				.map(
					(s) => s[`name_${lang as "en" | "az" | "ru"}`] as string | undefined
				)
				.filter((v): v is string => !!v && v.trim() !== ""),
		[skills, lang]
	);
	const benefitsOptions = React.useMemo(
		() =>
			benefits
				.map(
					(b) => b[`name_${lang as "en" | "az" | "ru"}`] as string | undefined
				)
				.filter((v): v is string => !!v && v.trim() !== ""),
		[benefits, lang]
	);

	return (
		<Paper
			elevation={2}
			sx={{
				p: 2,
				borderRadius: 3,
			}}
		>
			{/* Global snackbar handled by provider */}
			<Typography
				variant="h4"
				gutterBottom
				fontWeight={800}
				letterSpacing={0.2}
			>
				Post a Job
			</Typography>
			<Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
				Fill in the details below to publish your job listing.
			</Typography>
			<form onSubmit={formik.handleSubmit}>
				<Grid container spacing={3}>
					{/* Section: Job Details */}
					<Grid size={{ xs: 12 }}>
						<Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
							Job Details
						</Typography>
						<Divider />
					</Grid>{" "}
					<Grid size={{ xs: 12 }}>
						<TextField
							fullWidth
							name="title"
							label="Title"
							value={formik.values.title}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={!!dedectError(formik, "title")}
							helperText={
								dedectError(formik, "title") && t("form.error.required")
							}
						/>
					</Grid>
					<Grid size={{ xs: 12, md: 4 }}>
						<Autocomplete
							fullWidth
							options={jobLevel}
							getOptionLabel={(option) =>
								String(option[lang as keyof typeof option] ?? "")
							}
							value={
								jobLevel.find(
									(opt) => opt.id === Number(formik.values.job_level)
								) ?? null
							}
							onChange={(_, newValue) =>
								formik.setFieldValue("job_level", newValue?.id ?? "", false)
							}
							onBlur={() => formik.setFieldTouched("job_level", true)}
							isOptionEqualToValue={(option, value) => option.id === value.id}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Job Level"
									fullWidth
									error={!!dedectError(formik, "job_level")}
									helperText={
										dedectError(formik, "job_level") && t("form.error.required")
									}
								/>
							)}
						/>
					</Grid>
					<Grid size={{ xs: 12, md: 4 }}>
						<Autocomplete
							fullWidth
							options={categories}
							getOptionLabel={(option) =>
								option[`name_${lang as "en" | "az" | "ru"}`] ?? ""
							}
							value={
								categories.find((opt) => opt.id === formik.values.category) ??
								null
							}
							onChange={(_, newValue) =>
								formik.setFieldValue("category", newValue?.id ?? "", false)
							}
							onBlur={() => formik.setFieldTouched("category", true)}
							isOptionEqualToValue={(option, value) => option.id === value.id}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Category"
									fullWidth
									error={!!dedectError(formik, "category")}
									helperText={
										dedectError(formik, "category") && t("form.error.required")
									}
								/>
							)}
						/>
					</Grid>
					<Grid size={{ xs: 12, md: 4 }}>
						<Autocomplete
							fullWidth
							options={employmentTypes}
							getOptionLabel={(option) =>
								option[`name_${lang as "en" | "az" | "ru"}`] ?? ""
							}
							value={
								employmentTypes.find(
									(opt) => opt.id === formik.values.employment_type
								) ?? null
							}
							onChange={(_, newValue) =>
								formik.setFieldValue(
									"employment_type",
									newValue?.id ?? "",
									false
								)
							}
							onBlur={() => formik.setFieldTouched("employment_type", true)}
							isOptionEqualToValue={(option, value) => option.id === value.id}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Employment Type"
									fullWidth
									error={!!dedectError(formik, "employment_type")}
									helperText={
										dedectError(formik, "employment_type") &&
										t("form.error.required")
									}
								/>
							)}
						/>
					</Grid>
					{/* Section: Compensation */}
					<Grid size={{ xs: 12 }} sx={{ pt: 2 }}>
						<Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
							Salary
						</Typography>
						<Divider />
					</Grid>
					<Grid size={{ xs: 12, md: 3 }}>
						<TextField
							type="number"
							fullWidth
							name="min_salary"
							label="Min Salary"
							value={formik.values.min_salary}
							onChange={(e) =>
								formik.setFieldValue(
									"min_salary",
									e.target.value === "" ? "" : Number(e.target.value),
									false
								)
							}
							onBlur={() => formik.setFieldTouched("min_salary", true)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										{formik.values.currency}
									</InputAdornment>
								),
							}}
							error={!!dedectError(formik, "min_salary")}
							helperText={
								dedectError(formik, "min_salary") && t("form.error.required")
							}
							inputProps={{ min: 0 }}
						/>
					</Grid>
					<Grid size={{ xs: 12, md: 3 }}>
						<TextField
							type="number"
							fullWidth
							name="max_salary"
							label="Max Salary"
							value={formik.values.max_salary}
							onChange={(e) =>
								formik.setFieldValue(
									"max_salary",
									e.target.value === "" ? "" : Number(e.target.value),
									false
								)
							}
							onBlur={() => formik.setFieldTouched("max_salary", true)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										{formik.values.currency}
									</InputAdornment>
								),
							}}
							error={!!dedectError(formik, "max_salary")}
							helperText={
								dedectError(formik, "max_salary") && t("form.error.required")
							}
							inputProps={{ min: 0 }}
						/>
					</Grid>
					<Grid size={{ xs: 12, md: 3 }}>
						<TextField
							select
							fullWidth
							name="currency"
							label="Currency"
							value={formik.values.currency}
							onChange={(e) =>
								formik.setFieldValue("currency", e.target.value, false)
							}
							onBlur={() => formik.setFieldTouched("currency", true)}
						>
							{["AZN", "USD", "EUR"].map((cur) => (
								<MenuItem key={cur} value={cur}>
									{cur}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid size={{ xs: 12, md: 3 }} display="flex" alignItems="center">
						<FormControlLabel
							control={
								<Switch
									checked={formik.values.is_salary_hidden}
									onChange={(e) =>
										formik.setFieldValue("is_salary_hidden", e.target.checked)
									}
									sx={{
										"& .MuiSwitch-thumb": {
											backgroundColor: formik.values.is_salary_hidden
												? "primary.main"
												: "grey.500",
										},
									}}
								/>
							}
							label="Hide Salary"
						/>
					</Grid>
					{/* Section: Timeline */}
					<Grid size={{ xs: 12 }} sx={{ pt: 2 }}>
						<Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
							Timeline
						</Typography>
						<Divider />
					</Grid>
					<Grid size={{ xs: 12, md: 6 }}>
						<TextField
							type="number"
							fullWidth
							name="openings"
							label="Number of Openings"
							value={formik.values.openings}
							onChange={(e) =>
								formik.setFieldValue(
									"openings",
									e.target.value === "" ? "" : Number(e.target.value),
									false
								)
							}
							onBlur={() => formik.setFieldTouched("openings", true)}
							inputProps={{ min: 1 }}
							error={!!dedectError(formik, "openings")}
							helperText={
								dedectError(formik, "openings") && t("form.error.required")
							}
						/>
					</Grid>
					<Grid size={{ xs: 12, md: 6 }}>
						<TextField
							type="text"
							fullWidth
							name="experience"
							label="Years of Experience"
							value={formik.values.experience}
							onChange={(e) =>
								formik.setFieldValue(
									"experience",
									e.target.value === "" ? "" : Number(e.target.value),
									false
								)
							}
							onBlur={() => formik.setFieldTouched("experience", true)}
							inputProps={{ min: 1 }}
							error={!!dedectError(formik, "experience")}
							helperText={
								dedectError(formik, "experience") && t("form.error.required")
							}
						/>
					</Grid>
					{/* Section: Skills & Benefits */}
					<Grid size={{ xs: 12 }} sx={{ pt: 2 }}>
						<Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
							Skills & Benefits
						</Typography>
						<Divider />
					</Grid>
					<Grid size={{ xs: 12 }}>
						<Autocomplete
							multiple
							freeSolo
							filterSelectedOptions
							options={skillsOptions}
							value={formik.values.skills}
							onChange={(_, value) => formik.setFieldValue("skills", value)}
							renderTags={(value, getTagProps) =>
								value.map((option: string, index: number) => (
									<Chip
										variant="outlined"
										label={option}
										{...getTagProps({ index })}
										key={`${option + index}`}
									/>
								))
							}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Skills"
									placeholder="Select or type"
									error={!!dedectError(formik, "skills")}
									helperText={
										dedectError(formik, "skills") && t("form.error.required")
									}
									onBlur={() => formik.setFieldTouched("skills", true)}
								/>
							)}
						/>
					</Grid>
					<Grid size={{ xs: 12 }}>
						<Autocomplete
							multiple
							freeSolo
							filterSelectedOptions
							options={benefitsOptions}
							value={formik.values.benefits}
							onChange={(_, value) => formik.setFieldValue("benefits", value)}
							renderTags={(value, getTagProps) =>
								value.map((option: string, index: number) => (
									<Chip
										variant="outlined"
										label={option}
										{...getTagProps({ index })}
										key={`${option + index}`}
									/>
								))
							}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Benefits"
									placeholder="Select or type"
									error={!!dedectError(formik, "benefits")}
									helperText={
										dedectError(formik, "benefits") && t("form.error.required")
									}
									onBlur={() => formik.setFieldTouched("benefits", true)}
								/>
							)}
						/>
					</Grid>
					{/* Section: Description */}
					<Grid size={{ xs: 12 }} sx={{ pt: 2 }}>
						<Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
							Description
						</Typography>
						<Divider />
					</Grid>
					{richTextFields.map((field) => (
						<Grid size={{ xs: 12 }} key={field}>
							<Typography variant="subtitle1" color="text.secondary">
								{t(`form.label.${field}`)}
							</Typography>
							<Tiptap
								value={
									formik.values[field as keyof JobPostFormValues] as string
								}
								onChange={
									richTextHandlers[field as keyof JobPostFormValues] as (
										value: string
									) => void
								}
							/>
						</Grid>
					))}
					{/* Section: Contact */}
					<Grid size={{ xs: 12 }} sx={{ pt: 2 }}>
						<Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
							Contact Information
						</Typography>
						<Divider />
					</Grid>
					<Grid size={{ xs: 12, md: 4 }}>
						<TextField
							fullWidth
							name="owner_name"
							label="Your Name"
							value={formik.values.owner_name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={!!dedectError(formik, "owner_name")}
							helperText={
								dedectError(formik, "owner_name") && t("form.error.required")
							}
						/>
					</Grid>
					<Grid size={{ xs: 12, md: 4 }}>
						<TextField
							fullWidth
							name="owner_email"
							label="Your Email"
							value={formik.values.owner_email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={!!dedectError(formik, "owner_email")}
							helperText={
								dedectError(formik, "owner_email") && t("form.error.required")
							}
						/>
					</Grid>
					<Grid size={{ xs: 12, md: 4 }}>
						<TextField
							fullWidth
							name="owner_phone_number"
							label="Your Phone"
							value={formik.values.owner_phone_number}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={!!dedectError(formik, "owner_phone_number")}
							helperText={
								dedectError(formik, "owner_phone_number") &&
								t("form.error.required")
							}
						/>
					</Grid>
					<Grid size={{ xs: 12 }}>
						<FormControlLabel
							control={
								<Switch
									checked={formik.values.is_company_confidential}
									onChange={(e) =>
										formik.setFieldValue(
											"is_company_confidential",
											e.target.checked
										)
									}
									sx={{
										"& .MuiSwitch-thumb": {
											backgroundColor: formik.values.is_company_confidential
												? "primary.main"
												: "grey.500",
										},
									}}
								/>
							}
							label="Company Confidential"
						/>
					</Grid>
					<Grid size={{ xs: 12 }}>
						<Box display="flex" justifyContent="flex-end" gap={2}>
							<Button
								type="button"
								variant="text"
								color="inherit"
								onClick={() => formik.resetForm()}
							>
								Reset
							</Button>
							{/* <Link href="/payment"> */}
							<Button
								variant="contained"
								color="primary"
								size="large"
								onClick={() => formik.submitForm()}
								endIcon={<ArrowForward />}
							>
								Payment
							</Button>
							{/* </Link> */}
						</Box>
					</Grid>
				</Grid>
			</form>
		</Paper>
	);
};

export default React.memo(PostJobFormComponents);
