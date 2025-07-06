import { cn } from "@/lib/utils";
import type React from "react";

type Props = {
	className?: string;
	children?: React.ReactNode;
};

export function TypographyH1(props: Props) {
	return (
		<h1
			className={cn(
				"scroll-m-20 text-4xl font-extrabold tracking-tight text-balance",
				props.className,
			)}
		>
			{props.children}
		</h1>
	);
}

export function TypographyP(props: Props) {
	return (
		<p className={cn("leading-7 [&:not(:first-child)]:mt-6", props.className)}>
			{props.children}
		</p>
	);
}

export function TypographyMuted(props: Props) {
	return (
		<p className={cn("text-muted-foreground text-sm", props.className)}>
			{props.children}
		</p>
	);
}
