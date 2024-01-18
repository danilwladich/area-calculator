import { useCoordsStore } from "../hooks/use-coords";
import { Button } from "./ui/button";

export function ResetButton() {
	const { onReset } = useCoordsStore();

	return (
		<div className="flex justify-center pt-4">
			<Button variant="outline" onClick={onReset}>
				Reset
			</Button>
		</div>
	);
}
