import {useSortable} from '@dnd-kit/sortable';
import {ReactNode} from 'react';
import {CSS} from '@dnd-kit/utilities';


type DraggableCardProps = {
	id: string,
	children: ReactNode,
	disabled?: boolean
}

export default function DraggableCard({id, children, disabled = false}: DraggableCardProps) {

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id,
		disabled,
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};


	return (
		<div ref={setNodeRef} style={style} className="relative">
			{!disabled && (
				<div
					{...attributes}
					{...listeners}
					className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 p-2 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing z-10"
					aria-label="Drag to reorder"
				>
					<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						<path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
					</svg>
				</div>
			)}
			{children}
		</div>
	);

}