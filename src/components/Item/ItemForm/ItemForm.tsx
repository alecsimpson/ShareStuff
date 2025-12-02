import {useState} from 'react';
import {ItemT} from '../../../models/ItemT';

type ItemFormProps = {
	item: ItemT;
	onCancel: () => void;
	onSave: (updated: ItemT) => void;
	onDelete: (id: string) => void;
};

export default function ItemForm({item, onCancel, onSave, onDelete}: ItemFormProps) {
	const [name, setName] = useState(item.name);
	const [description, setDescription] = useState(item.description ?? '');
	const [price, setPrice] = useState(item.price ?? undefined);
	const [link, setLink] = useState(item.link ?? '');
	const [amount, setAmount] = useState(item.amount ?? undefined);
	const [image, setImage] = useState(item.image_url ?? '');
	const [urgent, setUrgent] = useState(item.urgent);
	const [bought, setBought] = useState(item.bought);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const updated: ItemT = {
			...item,
			name: name.trim() || item.name,
			description: description.trim() || undefined,
			price: typeof price === 'number' && !Number.isNaN(price) ? price : undefined,
			link: link.trim() || undefined,
			amount: typeof amount === 'number' && !Number.isNaN(amount) ? amount : undefined,
			image_url: image.trim() || undefined,
			urgent,
			bought,
			created_at: item.created_at,
			created_by: item.created_by,
		};
		onSave(updated);
	};

	return (
		<form onSubmit={handleSubmit} className="bg-white border rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium text-gray-700">Name</label>
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 text-black"
						required
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Amount</label>
					<input
						type="number"
						value={amount ?? ''}
						onChange={(e) => setAmount(e.target.value === '' ? undefined : Number(e.target.value))}
						className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 text-black"
						min={0}
						step={1}
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Price</label>
					<input
						type="number"
						value={price ?? ''}
						onChange={(e) => setPrice(e.target.value === '' ? undefined : Number(e.target.value))}
						className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 text-black"
						min={0}
						step="0.01"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Link</label>
					<input
						type="url"
						value={link}
						onChange={(e) => setLink(e.target.value)}
						className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 text-black"
						placeholder="https://..."
					/>
				</div>
				<div className="sm:col-span-2">
					<label className="block text-sm font-medium text-gray-700">Image URL</label>
					<input
						value={image}
						onChange={(e) => setImage(e.target.value)}
						className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 text-black"
						placeholder="https://..."
					/>
				</div>
				<div className="sm:col-span-2">
					<label className="block text-sm font-medium text-gray-700">Description</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 text-black"
						rows={3}
					/>
				</div>
			</div>

			<div className="flex items-center gap-6">
				<label className="inline-flex items-center gap-2 text-sm text-gray-700">
					<input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)}/>
					Urgent
				</label>
				<label className="inline-flex items-center gap-2 text-sm text-gray-700">
					<input type="checkbox" checked={bought} onChange={(e) => setBought(e.target.checked)}/>
					Bought
				</label>
			</div>

			<div className="text-xs text-gray-500">
				<div>Added by: <span className="font-medium text-gray-700">{item.created_by}</span></div>
				<div>Added at: <span className="font-medium text-gray-700">{new Date(item.created_at).toLocaleString()}</span>
				</div>
			</div>

			<div className="flex justify-end gap-2">
				<button
					type="button"
					onClick={onCancel}
					className="px-3 sm:px-4 py-2 rounded-md bg-gray-200 text-gray-800 text-sm font-medium shadow hover:bg-gray-300"
				>
					Cancel
				</button>
				<button
					type="submit"
					className="px-3 sm:px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium shadow hover:bg-blue-700"
				>
					Save
				</button>
				{
					item.id !== 'new' &&
						(
							<button
								type="button"
								onClick={() => {
									onDelete(item.id)
								}}
								className="px-3 sm:px-4 py-2 rounded-md bg-red-500 text-white text-sm font-medium shadow hover:bg-red-600"
							>
								Delete
							</button>
						)
				}
			</div>
		</form>
	);
}