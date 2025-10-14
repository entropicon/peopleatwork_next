import {
	Facebook,
	LinkedIn,
	X,
	Instagram,
	MailOutline,
} from "@mui/icons-material";
import {
	Stack,
	Typography,
	Button,
	Theme,
	useMediaQuery,
	Divider,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { memo, useMemo } from "react";


const styles = {
	buttonStyle: {
		px: 2,
		py: 1,
		borderColor: "var(--border-color)",
		"& svg": {
			fill: "var(--primary-color)",
		},
		"& span": {
			mr: 1,
		},
	},
};

const SocialButton = memo(
	({
		icon,
		link,
		type,
		fallbackText,
	}: {
		icon: React.ReactNode;
		link?: string;
		fallbackText: string;
		type: string;
	}) => (
		<Button
			startIcon={icon}
			component="a"
			href={link ? (type === "website" ? link : `mailto:${link}`) : "#"}
			sx={styles.buttonStyle}
			variant="outlined"
		>
			{link || fallbackText}
		</Button>
	)
);

const CompanyContact = ({
	facebook,
	linkedin,
	twitter,
	instagram,
	email,
	description,
}: {
	facebook?: string;
	linkedin?: string;
	twitter?: string;
	instagram?: string;
	email?: string;
	description?: string;
}) => {
	const md = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
	const t = useTranslations()
	const socials = useMemo(
		() => [
			{
				icon: <Facebook />,
				link: facebook,
				type: "website",
			},
			{
				icon: <LinkedIn />,
				link: linkedin,
				type: "website",
			},
			{
				icon: <X />,
				link: twitter,
				type: "website",
			},
			{
				icon: <Instagram />,
				link: instagram,
				type: "website",
			},
			{
				icon: <MailOutline />,
				link: email,
				type: "email",
			},
		],
		[facebook, linkedin, twitter, instagram, email]
	);
	return (
		<>
			{/* Description */}
			{description && (
				<>
					<Stack spacing={1}>
						<Typography variant="h3">{t("common.description")}</Typography>
						<Typography variant="body1">{description}</Typography>
					</Stack>
					<Divider />
				</>
			)}
			{/* Contact */}
			<Stack spacing={1}>
				<Typography variant="h3">{t("common.contact")}</Typography>
				<Stack
					direction={md ? "row" : "column"}
					flexWrap="wrap"
					sx={{
						gap: 1,
					}}
				>
					{socials.map((social, index) => (
						<SocialButton
							key={index}
							icon={social.icon}
							link={social.link}
							type={social.type}
							fallbackText={t("common.notSpecified")}
						/>
					))}
				</Stack>
			</Stack>
		</>
	);
};
SocialButton.displayName = "SocialButton";
CompanyContact.displayName = "CompanyContact";

export default memo(CompanyContact);
