import {ReactNode} from 'react';
import {
	closestCenter,
	DndContext,
	DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy,} from '@dnd-kit/sortable';


type DraggableListProps<T> = {
	items: T[];
	onReorder: (reorderedItems: T[]) => void;
	getItemId: (item: T) => string;
	renderItem: (item: T) => ReactNode;
	className?: string;
};


export default function DraggableList<T>(
	{
		items,
		onReorder,
		getItemId,
		renderItem,
		className = "space-y-4",
	}: DraggableListProps<T>) {

	// Configure sensors for drag detection
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8, // 8px of movement required to start drag
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			const oldIndex = items.findIndex(item => getItemId(item) === active.id);
			const newIndex = items.findIndex(item => getItemId(item) === over.id);

			const reorderedItems = arrayMove(items, oldIndex, newIndex);
			onReorder(reorderedItems);
		}
	};

	const itemIds = items.map(getItemId);

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext
				items={itemIds}
				strategy={verticalListSortingStrategy}
			>
				<div className={className}>
					{items.map(renderItem)}
				</div>
			</SortableContext>
		</DndContext>
	);
}