import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
	Box,
	Typography,
	IconButton,
} from "@mui/material";
import { Close as CloseIcon, Upload as UploadIcon } from "@mui/icons-material";
import React, { useState } from "react";

const ApplyGuestJobDialog = ({
	open,
	setOpen,
	job,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
	job: string;
}) => {
	const [formData, setFormData] = useState({
		fullName: "",
		subject: "",
		message: "",
		cv: null as File | null,
	});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
		// Clear error when user starts typing
		if (errors[field]) {
			setErrors((prev) => ({
				...prev,
				[field]: "",
			}));
		}
	};

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			// Check file type (PDF, DOC, DOCX)
			const allowedTypes = [
				"application/pdf",
				"application/msword",
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			];

			if (!allowedTypes.includes(file.type)) {
				setErrors((prev) => ({
					...prev,
					cv: "Please upload a PDF, DOC, or DOCX file",
				}));
				return;
			}

			// Check file size (max 5MB)
			if (file.size > 5 * 1024 * 1024) {
				setErrors((prev) => ({
					...prev,
					cv: "File size must be less than 5MB",
				}));
				return;
			}

			setFormData((prev) => ({
				...prev,
				cv: file,
			}));
			setErrors((prev) => ({
				...prev,
				cv: "",
			}));
		}
	};

	const validateForm = () => {
		const newErrors: { [key: string]: string } = {};

		if (!formData.fullName.trim()) {
			newErrors.fullName = "Full name is required";
		}

		if (!formData.subject.trim()) {
			newErrors.subject = "Subject is required";
		}

		if (!formData.message.trim()) {
			newErrors.message = "Message is required";
		}

		if (!formData.cv) {
			newErrors.cv = "CV is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async () => {
		if (!validateForm()) {
			return;
		}

		setIsSubmitting(true);

		try {
			const submitData = new FormData();
			submitData.append("fullName", formData.fullName);
			submitData.append("subject", formData.subject);
			submitData.append("message", formData.message);
			submitData.append("jobId", job);
			if (formData.cv) {
				submitData.append("cv", formData.cv);
			}

			// TODO: Replace with actual API call
			console.log("Submitting application:", {
				fullName: formData.fullName,
				subject: formData.subject,
				message: formData.message,
				jobId: job,
				cv: formData.cv?.name,
			});

			await new Promise((resolve) => setTimeout(resolve, 2000));

			setFormData({
				fullName: "",
				subject: "",
				message: "",
				cv: null,
			});
			setOpen(false);

			// TODO: Show success message
			alert("Application submitted successfully!");
		} catch (error) {
			console.error("Error submitting application:", error);
			// TODO: Show error message
			alert("Error submitting application. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleClose = () => {
		setFormData({
			fullName: "",
			subject: "",
			message: "",
			cv: null,
		});
		setErrors({});
		setOpen(false);
	};

	return (
		<Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
			<DialogTitle
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Typography variant="h6">Apply for Job</Typography>
				<IconButton onClick={handleClose} size="small">
					<CloseIcon />
				</IconButton>
			</DialogTitle>

			<DialogContent dividers>
				<Box sx={{ display: "flex", flexDirection: "column", gap: 3, py: 1 }}>
					<TextField
						fullWidth
						label="Full Name"
						value={formData.fullName}
						onChange={(e) => handleInputChange("fullName", e.target.value)}
						error={!!errors.fullName}
						helperText={errors.fullName}
						disabled={isSubmitting}
					/>

					<TextField
						fullWidth
						label="Subject"
						value={formData.subject}
						onChange={(e) => handleInputChange("subject", e.target.value)}
						error={!!errors.subject}
						helperText={errors.subject}
						disabled={isSubmitting}
					/>

					<TextField
						fullWidth
						label="Message"
						multiline
						rows={4}
						value={formData.message}
						onChange={(e) => handleInputChange("message", e.target.value)}
						error={!!errors.message}
						helperText={errors.message}
						placeholder="Tell us why you're interested in this position..."
						disabled={isSubmitting}
					/>

					<Box>
						<input
							type="file"
							accept=".pdf,.doc,.docx"
							onChange={handleFileUpload}
							style={{ display: "none" }}
							id="cv-upload"
							disabled={isSubmitting}
						/>
						<label htmlFor="cv-upload">
							<Button
								variant="outlined"
								component="span"
								startIcon={
									<UploadIcon
										sx={{
											fill: errors.cv ? "var(--red)" : "var(--primary-color)",
										}}
									/>
								}
								fullWidth
								sx={{
									height: 56,
									borderColor: errors.cv ? "error.main" : undefined,
									color: errors.cv ? "error.main" : undefined,
								}}
								disabled={isSubmitting}
							>
								{formData.cv ? formData.cv.name : "Upload CV (PDF, DOC, DOCX)"}
							</Button>
						</label>
						{errors.cv && (
							<Typography
								variant="caption"
								color="error"
								sx={{ mt: 1, display: "block" }}
							>
								{errors.cv}
							</Typography>
						)}
						{formData.cv && (
							<Typography
								variant="caption"
								color="text.secondary"
								sx={{ mt: 1, display: "block" }}
							>
								File size: {(formData.cv.size / 1024 / 1024).toFixed(2)} MB
							</Typography>
						)}
					</Box>
				</Box>
			</DialogContent>

			<DialogActions sx={{ p: 3 }}>
				<Button
					onClick={handleClose}
					disabled={isSubmitting}
					variant="outlined"
				>
					Cancel
				</Button>
				<Button
					onClick={handleSubmit}
					variant="contained"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Submitting..." : "Submit Application"}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ApplyGuestJobDialog;
