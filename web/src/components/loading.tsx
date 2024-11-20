import { Loader2Icon } from "lucide-react";

export function Loading() {
	return (
		<div className="flex flex-col items-center justify-center p-8">
			<Loader2Icon className="size-10 text-primary animate-spin" />
		</div>
	);
}
