"use client";

import {
	Email,
	Facebook,
	Instagram,
	LinkedIn,
	LocationOn,
	Phone,
	Send,
} from "@mui/icons-material";
import {
	Alert,
	Box,
	Button,
	Container,
	Grid,
	IconButton,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { useState } from "react";
import * as Yup from "yup";

const ContactPage = () => {
	const tContact = useTranslations("contactPage");
	const tForm = useTranslations("form");

	const validationSchema = Yup.object({
		name: Yup.string().required(tForm("error.required")),
		email: Yup.string()
			.email(tForm("error.invalidEmail"))
			.required(tForm("error.required")),
		subject: Yup.string().required(tForm("error.required")),
		message: Yup.string().required(tForm("error.required")),
	});

	const [submitStatus, setSubmitStatus] = useState<
		"idle" | "success" | "error"
	>("idle");

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			subject: "",
			message: "",
		},
		validationSchema,
		onSubmit: async (values, { resetForm }) => {
			try {
				// Simulate API call
				console.log("Contact form submitted:", values);
				setSubmitStatus("success");
				resetForm();
				setTimeout(() => setSubmitStatus("idle"), 5000);
			} catch (error) {
				console.error("Contact form error:", error);
				setSubmitStatus("error");
				setTimeout(() => setSubmitStatus("idle"), 5000);
			}
		},
	});

	const contactInfo = [
		{
			icon: <Email sx={{ fill: "var(--primary-color)" }} />,
			title: tContact("contactInfo.email"),
			content: "support@entropicon.ai",
		},
		{
			icon: <Phone sx={{ fill: "var(--primary-color)" }} />,
			title: tContact("contactInfo.phone"),
			content: "+994 70 323 26 66",
		},
		{
			icon: <LocationOn sx={{ fill: "var(--primary-color)" }} />,
			title: tContact("contactInfo.address"),
			content: "Sülh küçəsi 14F",
		},
	];

	const socialLinks = [
		{
			icon: <LinkedIn sx={{ fill: "var(--primary-color)" }} />,
			url: "https://www.linkedin.com/company/entropicon",
			label: "LinkedIn",
		},
		{
			icon: <Facebook sx={{ fill: "var(--primary-color)" }} />,
			url: "https://www.facebook.com/profile.php?id=61572811841776",
			label: "Facebook",
		},
		{
			icon: <Instagram sx={{ fill: "var(--primary-color)" }} />,
			url: "https://www.instagram.com/entropicon.ai/",
			label: "Instagram",
		},
	];

	return (
		<Container
			maxWidth="lg"
			sx={{
				my: {
					xs: "56px",
					md: "64px",
				},
			}}
		>
			<Stack
				alignItems={"center"}
				spacing={2}
				sx={{ py: 6, textAlign: "center" }}
			>
				<Typography
					variant="h2"
					sx={{
						fontWeight: "bold",
						background:
							"linear-gradient(135deg, #4640de 0%, #7b61ff 50%, #26a4ff 100%)",
						backgroundClip: "text",
						WebkitBackgroundClip: "text",
						color: "transparent",
					}}
				>
					{tContact("title")}
				</Typography>
				<Typography
					variant="body1"
					sx={{
						maxWidth: "800px",
						mx: "auto",
						opacity: 0.9,
					}}
				>
					{tContact("subtitle")}
				</Typography>
			</Stack>
			<Grid container spacing={2}>
				{/* Contact Form */}
				<Grid size={{ xs: 12, md: 8 }}>
					<Paper
						elevation={2}
						sx={{
							p: 4,
							borderRadius: 3,
							height: "fit-content",
						}}
					>
						<Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
							{tContact("sendMessageTitle")}
						</Typography>

						{submitStatus === "success" && (
							<Alert severity="success" sx={{ mb: 3 }}>
								{tContact("form.successMessage")}
							</Alert>
						)}

						{submitStatus === "error" && (
							<Alert severity="error" sx={{ mb: 3 }}>
								{tContact("form.errorMessage")}
							</Alert>
						)}

						<Box component="form" onSubmit={formik.handleSubmit}>
							<Grid container spacing={3}>
								<Grid size={{ xs: 12, sm: 6 }}>
									<TextField
										fullWidth
										name="name"
										label={tContact("form.nameLabel")}
										value={formik.values.name}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										error={formik.touched.name && Boolean(formik.errors.name)}
										helperText={formik.touched.name && formik.errors.name}
										sx={{
											"& .MuiOutlinedInput-root": {
												borderRadius: 2,
											},
										}}
									/>
								</Grid>
								<Grid size={{ xs: 12, sm: 6 }}>
									<TextField
										fullWidth
										name="email"
										label={tContact("form.emailLabel")}
										type="email"
										value={formik.values.email}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										error={formik.touched.email && Boolean(formik.errors.email)}
										helperText={formik.touched.email && formik.errors.email}
										sx={{
											"& .MuiOutlinedInput-root": {
												borderRadius: 2,
											},
										}}
									/>
								</Grid>
								<Grid size={{ xs: 12 }}>
									<TextField
										fullWidth
										name="subject"
										label={tContact("form.subjectLabel")}
										value={formik.values.subject}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										error={
											formik.touched.subject && Boolean(formik.errors.subject)
										}
										helperText={formik.touched.subject && formik.errors.subject}
										sx={{
											"& .MuiOutlinedInput-root": {
												borderRadius: 2,
											},
										}}
									/>
								</Grid>
								<Grid size={{ xs: 12 }}>
									<TextField
										fullWidth
										name="message"
										label={tContact("form.messageLabel")}
										multiline
										rows={5}
										value={formik.values.message}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										error={
											formik.touched.message && Boolean(formik.errors.message)
										}
										helperText={formik.touched.message && formik.errors.message}
										sx={{
											"& .MuiOutlinedInput-root": {
												borderRadius: 2,
											},
										}}
									/>
								</Grid>
								<Grid size={{ xs: 12 }}>
									<Button
										type="submit"
										variant="contained"
										size="large"
										fullWidth
										disabled={formik.isSubmitting}
										endIcon={<Send />}
										sx={{
											borderRadius: 3,
											px: 4,
											py: 1.5,
											textTransform: "none",
											fontWeight: 600,
											fontSize: "1rem",
										}}
									>
										{formik.isSubmitting
											? tContact("form.submittingButton")
											: tContact("form.submitButton")}
									</Button>
								</Grid>
							</Grid>
						</Box>
					</Paper>
				</Grid>

				{/* Contact Information */}
				<Grid size={{ xs: 12, md: 4 }}>
					<Stack spacing={2} justifyContent={"space-between"}>
						{/* Contact Details */}
						<Paper
							elevation={2}
							sx={{
								p: 3,
								borderRadius: 3,
							}}
						>
							<Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
								{tContact("contactInfoTitle")}
							</Typography>
							<Stack spacing={3}>
								{contactInfo.map((info, index) => (
									<Box
										key={index}
										sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
									>
										<Box
											sx={{
												p: 1.5,
												borderRadius: 2,
												backgroundColor: "primary.light",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											{info.icon}
										</Box>
										<Box sx={{ flex: 1 }}>
											<Typography
												variant="subtitle1"
												sx={{ fontWeight: 600, mb: 0.5 }}
											>
												{info.title}
											</Typography>
											<Typography
												variant="body2"
												sx={{ fontWeight: 600, color: "text.primary" }}
											>
												{info.content}
											</Typography>
										</Box>
									</Box>
								))}
							</Stack>
						</Paper>

						{/* Social Media */}
						<Paper
							elevation={2}
							sx={{
								p: 3,
								borderRadius: 3,
							}}
						>
							<Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
								{tContact("socialMediaTitle")}
							</Typography>
							<Stack direction="row" spacing={1}>
								{socialLinks.map((social, index) => (
									<IconButton
										key={index}
										component="a"
										href={social.url}
										target="_blank"
										rel="noopener noreferrer"
										sx={{
											color: "var(--primary-color)",
											border: "1px solid",
											borderColor: "primary.light",
											"&:hover": {
												backgroundColor: "primary.light",
											},
										}}
									>
										{social.icon}
									</IconButton>
								))}
							</Stack>
						</Paper>
					</Stack>
				</Grid>
			</Grid>
		</Container>
	);
};

export default ContactPage;
