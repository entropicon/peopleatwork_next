import Categories from "@/components/home/Categories";
import DashboardAds from "@/components/home/DashboardAds";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import Header from "@/components/home/Header";
import RecommendedJobs from "@/components/jobs/RecommendedJobs";
import { getHomePageData } from "@/lib/api";
import { getTranslations } from "next-intl/server";

export default async function HomePage() {
	const t = await getTranslations("homePage");
	const data = await getHomePageData();
	return (
		<>
			<Header job_count={data?.total_active_ads_count} />
			<Categories
				md={true}
				popular_categories={data?.first_eight_most_job_categories}
			/>
			<DashboardAds />
			<FeaturedJobs md={true} jobs={data?.featured_4_jobs} />
			<RecommendedJobs
				md={true}
				jobs={data?.recommended_jobs}
				text={t("recommendedJobs.text1")}
				text_blue={t("recommendedJobs.text2")}
			/>
		</>
	);
}
