export function Axes() {
	return (
		<div className="absolute top-0 left-0 w-full h-full">
			<div className="absolute top-0 left-0 w-[1px] h-full bg-black" />
			<div
				className="absolute top-0 right-0 w-[8px] h-[8px] border-t border-t-black 
						border-r border-r-black rotate-45 -translate-y-[3.5px]"
			/>
			<p className="absolute top-0 right-0 -translate-y-[100%] -translate-x-[100%] text-xs">
				X
			</p>

			<div className="absolute top-0 left-0 w-full h-[1px] bg-black" />
			<div
				className="absolute bottom-0 left-0 w-[8px] h-[8px] border-r border-r-black 
						border-b border-b-black rotate-45 -translate-x-[3.5px]"
			/>
			<p className="absolute bottom-0 left-0 -translate-y-[50%] -translate-x-[150%] text-xs -rotate-90">
				Y
			</p>
		</div>
	);
}
