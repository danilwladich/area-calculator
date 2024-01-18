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

const initialState: CoordsType = {
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
};

const sessionState: CoordsType | null = JSON.parse(
	sessionStorage.getItem("coords") || "null"
);

interface CoordsStore {
	coords: CoordsType;
	isError: boolean;
	onChange: (coords: CoordsType) => void;
	onReset: () => void;
}

export const useCoordsStore = create<CoordsStore>((set) => ({
	coords: sessionState || initialState,
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

		sessionStorage.setItem("coords", JSON.stringify(coords));
		set({ coords });
	},
	onReset: () => {
		sessionStorage.setItem("coords", JSON.stringify(initialState));
		set({ coords: initialState });
	},
}));
