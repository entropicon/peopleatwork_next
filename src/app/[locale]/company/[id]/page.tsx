import CompanyProfile from "@/components/company/Company";
import { getCompanyById } from "@/lib/api";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
	const { id } = await params;
	const company = await getCompanyById(id);

	if (!company) {
		return {
			title: "404",
			description: "Company not found",
		};
	}

	return {
		title: company.name,
		description: company.description?.substring(0, 160) ?? "company not found",
		openGraph: {
			title: company.name,
			description:
				company.description?.substring(0, 160) ?? "company not found",
			images: [{ url: company.logo || "/company-placeholder.jpg" }],
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: company.name,
			description:
				company.description?.substring(0, 160) ?? "company not found",
			images: [company.logo || "/company-placeholder.jpg"],
		},
	};
}

export default async function CompanyPage({
	params,
}: {
	params: Promise<{ id: string; locale: string }>;
}) {
	const { id } = await params;
	const company = await getCompanyById(id);

	if (!company) {
		notFound();
	}

	return <CompanyProfile company={company} />;
}
