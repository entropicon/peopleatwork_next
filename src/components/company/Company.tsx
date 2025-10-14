"use client";

import { CompanyProfileTypes } from "@/types/types";
import { Breadcrumbs, Divider, Grid, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Loading from "../common/Loading";
import AddressSideBar from "./AddressSideBar";
import CompanyContact from "./CompanyContact";
import { CompanyImages } from "./CompanyImages";
import CompanyJobs from "./CompanyJobs";
import CompanyTeam from "./CompanyTeam";
import CompanyTopProfile from "./CompanyTopProfile";
import { screenPadding } from "@/lib/utils";

const styles = {
	p1: {
		xs: 0,
		sm: 1,
		md: 2,
		lg: 4,
	},
	linkStyle: {
		textDecoration: "none",
		color: "var(--neutral-darker)",
	},
};

const CompanyProfile = ({ company }: { company: CompanyProfileTypes }) => {
	const t = useTranslations();
	if (!company) {
		return <Loading />;
	}

	return (
		<>
			{/* Company Header Section */}
			<Stack
				spacing={2}
				direction="column"
				sx={{
					backgroundColor: "var(--neutral-lightest)",
					my: "64px",
					px: screenPadding,
					py: styles.p1,
				}}
			>
				<Breadcrumbs
					aria-label="breadcrumb"
					sx={{
						pb: styles.p1,
					}}
				>
					<Link href="/" style={styles.linkStyle}>
						{t("common.home")}
					</Link>
					<Link href="/browse-companies" style={styles.linkStyle}>
						{t("common.companies")}
					</Link>
					<Typography color="text.primary">{company.name}</Typography>
				</Breadcrumbs>

				{/* Company Profile Header */}
				<CompanyTopProfile
					name={company?.name}
					avatar={company?.logo}
					website={company?.contact?.website}
					founded={company?.founded}
					employee_count={company?.employee_count}
					contact={{
						address: company?.contact?.address,
						location: company?.contact?.location,
					}}
					industry={{
						name_az: company?.industry?.name_az,
						name_en: company?.industry?.name_en,
						name_ru: company?.industry?.name_ru,
					}}
				/>
			</Stack>

			{/* Company Details Section */}
			<Grid
				container
				spacing={2}
				sx={{
					px: screenPadding,
					mb: 4,
				}}
			>
				<Grid
					size={{
						xs: 12,
						md: company?.contact?.location || company?.contact.address ? 8 : 12,
					}}
				>
					<Stack divider={<Divider />} spacing={3}>
						{/* Company Contact */}
						<CompanyContact
							facebook={company?.contact?.facebook}
							linkedin={company?.contact?.linkedin}
							twitter={company?.contact?.twitter}
							instagram={company?.contact?.instagram}
							email={company?.contact?.email}
							description={company?.description}
						/>

						{/* Company Images */}
						<CompanyImages
							images={company.images}
							companyName={company.name}
							showSection={false}
						/>
						{/* Company Team */}
						<CompanyTeam team={company?.team} />
					</Stack>
				</Grid>

				{/* Address Sidebar */}
				<AddressSideBar
					location={{
						address: company?.contact?.address,
						location: company?.contact?.location,
					}}
				/>
			</Grid>
			{/* Jobs Section */}
			<CompanyJobs jobs={company?.jobs} company={company?.name} />
		</>
	);
};

export default CompanyProfile;
