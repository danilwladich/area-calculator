import { create } from "zustand";

type CoordsType = {
	a: {
		x: number;
		y: number;
	};
	b: {
		x: number;
		y: number;
	};
	c: {
		x: number;
		y: number;
	};
};

interface CoordsStore {
	coords: CoordsType;
	isError: boolean;
	onChange: (coords: CoordsType) => void;
}

export const useCoordsStore = create<CoordsStore>((set) => ({
	coords: {
		a: {
			x: 44,
			y: 16,
		},
		b: {
			x: 18,
			y: 78,
		},
		c: {
			x: 38,
			y: 64,
		},
	},
	isError: false,
	onChange: (coords: CoordsType) => {
		if (
			!coords.a.x ||
			!coords.a.y ||
			!coords.b.x ||
			!coords.b.y ||
			!coords.c.x ||
			!coords.c.y
		) {
			set({ isError: true });
		} else {
			set({ isError: false });
		}

		set({ coords });
	},
}));
