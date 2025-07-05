import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { numberFormatter } from "@/lib/utils";
import type { SearchResult } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { CircleDot, GitFork, Loader, Star } from "lucide-react";
import React, { type FormEvent, useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
	component: App,
});

async function searchRepositories(query: string, page = 1) {
	if (!query) return Promise.resolve(null);

	const params = new URLSearchParams();
	params.set("q", query);
	params.set("per_page", "20");
	params.set("page", `${page}`);
	return fetch(`https://api.github.com/search/repositories?${params}`, {}).then(
		(res) => res.json() as Promise<SearchResult>,
	);
}

function App() {
	const [query, setQuery] = useState("");
	const [page, _setPage] = useState(1);
	const loaderRef = useRef(null);

	const {
		isPending,
		isError,
		data,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		fetchNextPage,
	} = useInfiniteQuery({
		queryKey: ["search_repos", query, page],
		initialPageParam: 1,
		queryFn: (x) => searchRepositories(query, x.pageParam),
		getNextPageParam: (lastPage, _pages, lastPageParam) => {
			const currentTotal = lastPageParam * 20;
			if (lastPage && lastPage.total_count <= currentTotal) return undefined;

			return lastPageParam + 1;
		},
	});

	useEffect(() => {
		if (!loaderRef.current || !hasNextPage || !query) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (!isFetching && !isFetchingNextPage && entries[0].isIntersecting) {
					fetchNextPage();
				}
			},
			{
				threshold: 1.0,
			},
		);

		observer.observe(loaderRef.current);

		return () => observer.disconnect();
	}, [hasNextPage, fetchNextPage, isFetching, isFetchingNextPage, query]);

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const query = formData.get("search") as string;

		setQuery(query);
	};

	return (
		<>
			<form onSubmit={onSubmit}>
				<Label className="mb-2">Search any repository</Label>
				<Input name="search" placeholder="Press Enter to search" />
			</form>
			{isPending}
			<div className="mt-4 mb-8">
				{isPending && (
					<div>
						<Loader className="animate-spin" />
					</div>
				)}
				{isError && <div>Something went wrong</div>}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
					{data?.pages.map((group, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<React.Fragment key={i}>
							{group?.items?.map((d) => (
								<Card key={d.id}>
									<CardHeader>
										<CardTitle>{d.full_name}</CardTitle>
										<CardDescription>{d.description ?? ""}</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="flex items-center gap-5">
											<Badge className="flex items-center">
												<CircleDot size={12} />{" "}
												{numberFormatter.format(d.open_issues_count)} Open
												Issues
											</Badge>
											<Badge variant="secondary" className="flex items-center">
												<GitFork size={12} />{" "}
												{numberFormatter.format(d.forks_count)} Forks
											</Badge>
											<Badge variant="secondary" className="flex items-center">
												<Star size={12} />{" "}
												{numberFormatter.format(d.stargazers_count)} Stars
											</Badge>
										</div>
									</CardContent>
								</Card>
							))}
						</React.Fragment>
					))}
				</div>
				{hasNextPage && query && (
					<div ref={loaderRef}>
						<Loader className="animate-spin" />
					</div>
				)}
			</div>
		</>
	);
}
