import { numberFormatter } from "@/lib/utils";
import type { Item } from "@/types";
import { CircleDot, GitFork, Star } from "lucide-react";
import { Badge } from "./ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";

type Props = {
	searchItem: Item;
};

export default function SearchItemCard({ searchItem: item }: Props) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{item.full_name}</CardTitle>
				<CardDescription>{item.description ?? ""}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex items-center gap-5">
					<Badge className="flex items-center">
						<CircleDot size={12} />{" "}
						{numberFormatter.format(item.open_issues_count)} Open Issues
					</Badge>
					<Badge variant="secondary" className="flex items-center">
						<GitFork size={12} /> {numberFormatter.format(item.forks_count)}{" "}
						Forks
					</Badge>
					<Badge variant="secondary" className="flex items-center">
						<Star size={12} /> {numberFormatter.format(item.stargazers_count)}{" "}
						Stars
					</Badge>
				</div>
			</CardContent>
		</Card>
	);
}
