export function Info({ area, scale }: { area: number; scale: number }) {
	return (
		<div className="flex justify-center gap-4 py-6">
			<p>Area: {area}</p>
			<p>Scale: {scale}</p>
		</div>
	);
}
