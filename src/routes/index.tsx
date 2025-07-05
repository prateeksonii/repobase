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
import type { SearchResult } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { CircleDot, GitFork, Star } from "lucide-react";
import { type FormEvent, useState } from "react";

export const Route = createFileRoute("/")({
	component: App,
});

async function searchRepositories(query: string, page = 1) {
	if (!query) return Promise.resolve(null);

	const params = new URLSearchParams();
	params.set("q", query);
	params.set("per_page", "10");
	params.set("page", `${page}`);
	return fetch(`https://api.github.com/search/repositories?${params}`, {}).then(
		(res) => res.json() as Promise<SearchResult>,
	);
}

function App() {
	const [query, setQuery] = useState("");
	const [page, _setPage] = useState(1);

	const { isPending, isError, data } = useQuery({
		queryKey: ["search_repos", query, page],
		queryFn: () => searchRepositories(query, page),
	});

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
			<div className="mt-4">
				{isPending && <div>Loading...</div>}
				{isError && <div>Something went wrong</div>}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
					{data?.items?.map((d) => (
						<Card key={d.id}>
							<CardHeader>
								<CardTitle>{d.full_name}</CardTitle>
								<CardDescription>{d.description ?? ""}</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex items-center gap-5">
									<Badge className="flex items-center">
										<CircleDot size={12} /> {d.open_issues_count} Open Issues
									</Badge>
									<Badge variant="secondary" className="flex items-center">
										<GitFork size={12} /> {d.forks_count} Forks
									</Badge>
									<Badge variant="secondary" className="flex items-center">
										<Star size={12} /> {d.stargazers_count} Stars
									</Badge>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</>
	);
}
