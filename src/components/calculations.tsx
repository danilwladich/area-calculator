import { useCoordsStore } from "../hooks/use-coords";
import { Info } from "./info";
import { SvgField } from "./svg-field";

export function Calculations() {
	const { coords, isError } = useCoordsStore();

	if (isError) {
		return <p className="py-4 text-center text-lg">Error</p>;
	}

	const svgWidth = 300;
	const svgHeight = 300;

	const ax = coords.a.x;
	const ay = coords.a.y;
	const bx = coords.b.x;
	const by = coords.b.y;
	const cx = coords.c.x;
	const cy = coords.c.y;

	const height =
		Math.abs((cy - by) * ax + (bx - cx) * ay + (cx * by - bx * cy)) /
		Math.sqrt((cy - by) ** 2 + (bx - cx) ** 2);

	const AB = Math.sqrt((bx - ax) ** 2 + (by - ay) ** 2);
	const BC = Math.sqrt((cx - bx) ** 2 + (cy - by) ** 2);
	const AC = Math.sqrt((cx - ax) ** 2 + (cy - ay) ** 2);

	const area = +(0.5 * height * BC).toFixed(2);

	let scale = 1;
	while (Math.max(AB * scale, BC * scale, AC * scale) < (svgHeight * 2) / 3) {
		scale += 0.1;
	}
	while (Math.max(AB * scale, BC * scale, AC * scale) > (svgHeight * 2) / 3) {
		scale -= 0.1;
	}
	scale = +scale.toFixed(2);

	const factOX = (ax + bx + cx) / 3;
	const factOY = (ay + by + cy) / 3;

	const relOX = svgWidth / 2 / scale;
	const relOY = svgHeight / 2 / scale;

	const vectorX = relOX - factOX;
	const vectorY = relOY - factOY;

	return (
		<div>
			<Info area={area} scale={scale} />

			<SvgField
				svgWidth={svgWidth}
				svgHeight={svgHeight}
				ax={ax}
				ay={ay}
				bx={bx}
				by={by}
				cx={cx}
				cy={cy}
				scale={scale}
				vectorX={vectorX}
				vectorY={vectorY}
			/>
		</div>
	);
}
