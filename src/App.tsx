import "./globals.css";
import { Coords } from "./components/coords";
import { Calculations } from "./components/calculations";

function App() {
	return (
		<div className="h-screen flex flex-col">
			<header className="bg-blue-500 py-2">
				<h1 className="text-center text-white font-bold">Area calculator</h1>
			</header>

			<main className="py-4 px-2 flex-auto">
				<Coords />

				<Calculations />
			</main>

			<footer className="flex justify-center py-2">
				<p className="text-gray-500">
					<a
						className="text-gray-500 hover:text-gray-700"
						href="https://github.com/danilwladich/area-calculator"
						target="_blank"
						rel="noopener noreferrer"
					>
						Source code
					</a>
				</p>
			</footer>
		</div>
	);
}

export default App;
