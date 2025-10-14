import { Metadata } from "next";
import { notFound } from "next/navigation";
import ClientJobPage from "@/components/jobs/ClientJobPage";
import { getJobById, getSimilarJobs } from "@/lib/api";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
	const { id } = await params;
	const job = await getJobById(id);
	if (!job) {
		return {
			title: "404",
			description: "Job not found",
		};
	}

	return {
		title: `${job.title}`,
		openGraph: {
			title: `${job.title}`,
			images: ["/wearehiring.jpg"],
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: `${job.title}`,
			images: ["/wearehiring.jpg"],
		},
	};
}

export default async function JobDetailPage({
	params,
}: {
	params: Promise<{ id: string; locale: string }>;
}) {
	const { id } = await params;
	const job = await getJobById(id);
	const jobs = await getSimilarJobs(id);

	if (!job) {
		notFound();
	}
	return <ClientJobPage job={job} jobs={jobs} />;
}
