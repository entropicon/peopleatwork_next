import { Company } from "@/types/types";
import { Grid, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { CardAvatar, StyledCard } from "../common/card_ui";

const CompanyCard = ({
	listStyle,
	company,
	lang,
}: {
	listStyle: string;
	company: Company;
	lang: string;
}) => {
	const t = useTranslations();
	return (
		<Grid
			key={company.id}
			size={{
				xs: 12,
				md: listStyle === "list" ? 12 : 4,
			}}
		>
			<Link href={`/company/${company.id}`} style={{ textDecoration: "none" }}>
				<StyledCard>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems={"center"}
					>
						<Stack direction="row" spacing={1} alignItems="center">
							<CardAvatar avatar={company?.logo ? company.logo : undefined} />
							<Stack>
								<Typography variant="h6" className="one-line-text">
									{company?.name.slice(0, 15)}{" "}
									{company.name.length > 15 && "..."}
								</Typography>

								<Typography
									variant="body2"
									color="var(--neutral-dark)"
									className="one-line-text"
								>
									{listStyle === "grid"
										? company?.industry &&
										  company.industry[
												`name_${lang}` as "name_en" | "name_az" | "name_ru"
										  ].slice(0, 15) +
												(company.industry[
													`name_${lang}` as "name_en" | "name_az" | "name_ru"
												].length > 15
													? "..."
													: "")
										: company?.industry &&
										  company.industry[
												`name_${lang}` as "name_en" | "name_az" | "name_ru"
										  ]}
								</Typography>
							</Stack>
						</Stack>
						<Typography
							variant="body2"
							sx={{
								height: "fit-content",
								backgroundColor: "var(--neutral-lightest)",
								color: "primary.main",
							}}
						>
							{company?.jobs} {t("common.jobs")}
						</Typography>
					</Stack>

					<Typography
						variant="body2"
						color="var(--neutral-darker)"
						sx={{
							display: "-webkit-box",
							WebkitLineClamp: 4,
							WebkitBoxOrient: "vertical",
							overflow: "hidden",
							textOverflow: "ellipsis",
							lineHeight: "1.5em",
							height: "6em",
						}}
					>
						{company?.description
							? company.description
							: t("common.noDescription")}
					</Typography>
				</StyledCard>
			</Link>
		</Grid>
	);
};

export default CompanyCard;
