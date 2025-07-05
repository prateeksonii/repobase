import { ModeToggle } from "./mode-toggle";

export default function Header() {
	return (
		<header className="grid place-items-center h-16 mx-auto container">
			<nav className="flex items-center justify-between w-full">
				<div aria-hidden />
				<ModeToggle />
			</nav>
		</header>
	);
}
