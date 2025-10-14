import type { Metadata } from "next";
import "../styles/globals.css";
import ClientProviders from "@/providers/ClientProviders";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export const metadata: Metadata = {
	title: "PeopleAtWork",
	description:
		"Fast and efficient hiring! Manage candidates with a single click and build a smarter team.",
	icons: {
		icon: "favicon.ico",
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();
	const messages = await getMessages();
	return (
		<html lang={locale} suppressHydrationWarning>
			<body>
				<ClientProviders>
					<NextIntlClientProvider locale={locale} messages={messages}>
						{children}
					</NextIntlClientProvider>
				</ClientProviders>
			</body>
		</html>
	);
}
