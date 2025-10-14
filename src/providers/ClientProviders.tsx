"use client";

import theme from "@/theme/theme";
import { ThemeProvider } from "@mui/material";
import GlobalSnackbarProvider from "@/providers/SnackbarProvider";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function ClientProviders({
	children,
}: {
	children: React.ReactNode;
}) {
	const [queryClient] = React.useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						retry: 1,
					},
				},
			})
	);

	return (
		<ThemeProvider theme={theme}>
			<GlobalSnackbarProvider>
				<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
			</GlobalSnackbarProvider>
		</ThemeProvider>
	);
}
