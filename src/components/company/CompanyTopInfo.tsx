import { Stack, Theme, Typography, useMediaQuery } from "@mui/material";
import { format } from "date-fns";
import { az, enUS, ru } from "date-fns/locale";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { memo, useMemo } from "react";

const InfoItem = memo(
	({ icon, label, value }: { icon: string; label: string; value: string }) => (
		<Stack direction="row" spacing={1}>
			<Image
				src={icon}
				alt={label}
				width={44}
				height={44}
				style={{
					borderRadius: "50%",
					padding: "10px",
					border: "1px solid var(--border-color)",
				}}
			/>
			<Stack>
				<Typography variant="body1">{label}</Typography>
				<Typography
					variant="body1"
					sx={{
						fontFamily: "Epilogue SemiBold",
					}}
				>
					{value}
				</Typography>
			</Stack>
		</Stack>
	)
);

InfoItem.displayName = "InfoItem";

const CompanyTopInfo = ({
	company,
	lang,
}: {
	company: {
		founded?: Date;
		employee_count?: string;
		contact?: {
			address?: string;
			location?: string;
		};
		industry?: {
			name_az?: string;
			name_en?: string;
			name_ru?: string;
		};
	};
	lang: string;
}) => {
	const t = useTranslations()
	const md = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
	const info = useMemo(
		() => [
			{
				icon: "/images/icons/flame.svg",
				label: t("common.founded"),
				value: company?.founded
					? format(new Date(company.founded), "dd MMMM, yyyy", {
							locale: lang === "az" ? az : lang === "ru" ? ru : enUS,
					  })
					: t("common.notSpecified"),
			},
			{
				icon: "/images/icons/applicants_light.svg",
				label: t("common.employee_count"),
				value: company?.employee_count
					? company.employee_count
					: t("common.notSpecified"),
			},
			{
				icon: "/images/icons/location.svg",
				label: t("common.address"),
				value: company?.contact?.address
					? company.contact?.location
					: t("common.notSpecified"),
			},
			{
				icon: "/images/icons/industry.svg",
				label: t("common.industry"),
				value: company?.industry
					? company.industry[`name_${lang as "en" | "az" | "ru"}`]
					: t("common.notSpecified"),
			},
		],
		[company, t, lang]
	);
	return (
		<Stack spacing={2} direction={md ? "row" : "column"}>
			{info.map((item, index) => (
				<InfoItem
					key={index}
					icon={item.icon}
					label={item.label}
					value={item.value || t("common.notSpecified")}
				/>
			))}
		</Stack>
	);
};

export default memo(CompanyTopInfo);
