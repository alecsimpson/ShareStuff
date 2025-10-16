import ItemList from "../ItemList/ItemList.tsx";

export default function Home() {
	return (
		<div className="mx-auto max-w-6xl px-4 py-6 space-y-6">
			<header className="space-y-1">
				<h1 className="text-2xl font-semibold tracking-tight">Home</h1>
				<p className="text-sm text-gray-500">Browse and add items to your collection.</p>
			</header>
			<ItemList itemListId="all" />
		</div>
	);
}