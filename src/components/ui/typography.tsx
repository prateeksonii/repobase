import { cn } from "@/lib/utils";
import type React from "react";

type Props = {
	className: string;
	children?: React.ReactNode;
};

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
