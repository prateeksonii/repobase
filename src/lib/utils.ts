import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const numberFormatter = Intl.NumberFormat("en-US", {
	compactDisplay: "short",
	notation: "compact",
});
