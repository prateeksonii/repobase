import { Search } from "lucide-react";
import type { FormEvent } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type Props = {
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function SearchForm({ onSubmit }: Props) {
	return (
		<form onSubmit={onSubmit} className="grid grid-cols-[4fr_1fr] gap-3">
			<div className="w-full">
				<Label className="mb-2">Search any repositories</Label>
				<div className="relative w-full">
					<Input
						name="search"
						placeholder="Press Enter to search"
						className="w-full"
					/>
					<Search className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				</div>
			</div>
		</form>
	);
}
