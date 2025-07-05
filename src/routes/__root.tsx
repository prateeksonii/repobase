import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import TanStackQueryLayout from "../integrations/tanstack-query/layout.tsx";

import Header from "@/components/header.tsx";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: () => (
		<>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<>
					<Header />
					<main className="mx-auto container mt-4">
						<Outlet />
					</main>
				</>
			</ThemeProvider>
			<TanStackRouterDevtools />

			<TanStackQueryLayout />
		</>
	),
});
