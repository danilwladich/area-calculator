import { Axes } from "./axes";

export function SvgField({
	svgWidth,
	svgHeight,
	ax,
	ay,
	bx,
	by,
	cx,
	cy,
	scale,
	vectorX,
	vectorY,
}: {
	[key: string]: number;
}) {
	const textStyle: React.CSSProperties = {
		transform: `scale(${1 / scale})`,
		fill: "rgb(0,0,255)",
	};
	const lineStyle: React.CSSProperties = {
		stroke: "rgb(255,0,0)",
		strokeWidth: 1,
	};

	return (
		<div>
			<div className={`relative mx-auto w-[${svgWidth}px] h-[${svgHeight}px]`}>
				<Axes />

				<svg
					style={{
						transform: `scale(${scale}) translate(${
							(svgWidth * scale - svgWidth) / scale / 2 / scale
						}px,${(svgHeight * scale - svgHeight) / scale / 2 / scale}px)`,
					}}
					height={`${100 / scale}%`}
					width={`${100 / scale}%`}
				>
					<text
						style={textStyle}
						x={ax * scale + scale + vectorX * scale}
						y={ay * scale - scale + vectorY * scale}
					>
						A
					</text>
					<line
						x1={bx + vectorX}
						y1={by + vectorY}
						x2={cx + vectorX}
						y2={cy + vectorY}
						style={lineStyle}
					/>

					<text
						style={textStyle}
						x={bx * scale + scale + vectorX * scale}
						y={by * scale - scale + vectorY * scale}
					>
						B
					</text>
					<line
						x1={ax + vectorX}
						y1={ay + vectorY}
						x2={bx + vectorX}
						y2={by + vectorY}
						style={lineStyle}
					/>

					<text
						style={textStyle}
						x={cx * scale + scale + vectorX * scale}
						y={cy * scale - scale + vectorY * scale}
					>
						C
					</text>
					<line
						x1={ax + vectorX}
						y1={ay + vectorY}
						x2={cx + vectorX}
						y2={cy + vectorY}
						style={lineStyle}
					/>
				</svg>
			</div>
		</div>
	);
}
