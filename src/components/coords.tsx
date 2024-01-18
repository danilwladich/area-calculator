import { useCoordsStore } from "../hooks/use-coords";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { xyType, abcType } from "../types/coords-types";

export function Coords() {
	const { coords, onChange } = useCoordsStore();

	function handleChange(abc: abcType, xy: xyType, value?: number) {
		onChange({ ...coords, [abc]: { ...coords[abc], [xy]: value } });
	}

	return (
		<div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center">
			{Object.keys(coords).map((abcKey) => {
				const abc = abcKey as abcType;

				return (
					<div key={abc} className="flex flex-col gap-2">
						<h3 className="text-center font-bold">{abc.toUpperCase()}</h3>

						<div className="flex flex-col gap-2">
							{Object.keys(coords[abc]).map((xyKey) => {
								const xy = xyKey as xyType;

								return (
									<div key={`${abc}-${xy}`} className="flex items-center gap-2">
										<Label htmlFor={`${abc}-${xy}`}>{xy}:</Label>
										<Input
											id={`${abc}-${xy}`}
											onChange={(v) => handleChange(abc, xy, +v.target.value)}
											value={coords[abc][xy] || ""}
											placeholder="Select value!"
											type="number"
											className="sm:max-w-[150px]"
										/>
									</div>
								);
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
}
