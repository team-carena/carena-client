export const HomePage = () => {
	return (
		<div
			className="min-h-screen p-6 space-y-12 bg-white text-gray-900"
			style={{ fontFamily: "var(--font-base)" }}
		>
			<header className="space-y-1">
				<h1 className="display02-sb-28 text-primary-500">CareNA</h1>
			</header>

			{/* ================= Colors ================= */}
			<section className="space-y-6">
				<h2 className="head01-b-18">🎨 Colors</h2>

				{/* Grayscale */}
				<div className="space-y-1">
					<p className="label01-sb-14">Grayscale</p>
					<div className="bg-gray-50 p-2">gray-50</div>
					<div className="bg-gray-100 p-2">gray-100</div>
					<div className="bg-gray-200 p-2">gray-200</div>
					<div className="bg-gray-300 p-2">gray-300</div>
					<div className="bg-gray-400 p-2">gray-400</div>
					<div className="bg-gray-500 p-2 text-white">gray-500</div>
					<div className="bg-gray-600 p-2 text-white">gray-600</div>
					<div className="bg-gray-700 p-2 text-white">gray-700</div>
					<div className="bg-gray-800 p-2 text-white">gray-800</div>
					<div className="bg-gray-900 p-2 text-white">gray-900</div>
				</div>

				{/* Primary */}
				<div className="space-y-1">
					<p className="label01-sb-14">Primary</p>
					<div className="bg-primary-50 p-2">primary-50</div>
					<div className="bg-primary-100 p-2">primary-100</div>
					<div className="bg-primary-200 p-2">primary-200</div>
					<div className="bg-primary-300 p-2 text-white">primary-300</div>
					<div className="bg-primary-400 p-2 text-white">primary-400</div>
					<div className="bg-primary-500 p-2 text-white">primary-500</div>
					<div className="bg-primary-600 p-2 text-white">primary-600</div>
					<div className="bg-primary-700 p-2 text-white">primary-700</div>
					<div className="bg-primary-800 p-2 text-white">primary-800</div>
					<div className="bg-primary-900 p-2 text-white">primary-900</div>
				</div>

				{/* Secondary */}
				<div className="space-y-1">
					<p className="label01-sb-14">Secondary</p>
					<div className="bg-secondary-50 p-2">secondary-50</div>
					<div className="bg-secondary-100 p-2">secondary-100</div>
					<div className="bg-secondary-200 p-2">secondary-200</div>
					<div className="bg-secondary-300 p-2">secondary-300</div>
					<div className="bg-secondary-400 p-2 text-white">secondary-400</div>
					<div className="bg-secondary-500 p-2 text-white">secondary-500</div>
					<div className="bg-secondary-600 p-2 text-white">secondary-600</div>
					<div className="bg-secondary-700 p-2 text-white">secondary-700</div>
					<div className="bg-secondary-800 p-2 text-white">secondary-800</div>
					<div className="bg-secondary-900 p-2 text-white">secondary-900</div>
				</div>

				{/* Semantic */}
				<div className="space-y-1">
					<p className="label01-sb-14">Semantic</p>
					<div className="bg-red-100 p-2">red-100</div>
					<div className="bg-red-300 p-2 text-white">red-300</div>
					<div className="bg-red-500 p-2 text-white">red-500</div>

					<div className="bg-blue-100 p-2">blue-100</div>
					<div className="bg-blue-300 p-2">blue-300</div>
					<div className="bg-blue-500 p-2 text-white">blue-500</div>

					<div className="bg-green-100 p-2">green-100</div>
					<div className="bg-green-300 p-2 text-white">green-300</div>
					<div className="bg-green-500 p-2 text-white">green-500</div>

					<div className="bg-black p-2 text-white">black</div>
					<div className="bg-black/30 p-2">black-30</div>
					<div className="bg-white p-2">white</div>
				</div>
			</section>

			{/* ================= Typography ================= */}
			<section className="space-y-4">
				<h2 className="head01-b-18">🔤 Typography</h2>

				{/* Display */}
				<div className="space-y-1">
					<p className="display01-b-24">display01-b-24</p>
					<p className="display02-sb-28">display02-sb-28</p>
				</div>

				{/* Head */}
				<div className="space-y-1">
					<p className="head01-b-18">head01-b-18</p>
					<p className="head02-b-16">head02-b-16</p>
					<p className="head03-sb-16">head03-sb-16</p>
					<p className="head04-m-16">head04-m-16</p>
					<p className="head05-r-14">head05-r-14</p>
				</div>

				{/* Body */}
				<div className="space-y-1">
					<p className="body01-sb-12">body01-sb-12</p>
					<p className="body02-m-12">body02-m-12</p>
					<p className="body03-r-16">body03-r-16</p>
					<p className="body04-r-14">body04-r-14</p>
					<p className="body05-r-12">body05-r-12</p>
				</div>

				{/* Label */}
				<div className="space-y-1">
					<p className="label01-sb-14">label01-sb-14</p>
					<p className="label02-m-14">label02-m-14</p>
					<p className="label03-m-12">label03-m-12</p>
					<p className="label04-r-16">label04-r-16</p>
					<p className="label05-r-14">label05-r-14</p>
					<p className="label06-r-12">label06-r-12</p>
				</div>
			</section>
		</div>
	);
};
