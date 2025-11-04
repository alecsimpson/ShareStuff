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
		<div
			ref={setNodeRef}
			style={style}
			className="flex items-stretch gap-2 sm:gap-3 bg-white border rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow"
		>
			<div className="flex-1 min-w-0">
				{children}
			</div>
			{!disabled && (
				<div
					{...attributes}
					{...listeners}
					className="flex items-center justify-center px-1 sm:px-2 text-gray-400 hover:text-gray-600 active:text-gray-700 cursor-grab active:cursor-grabbing touch-none"
					aria-label="Drag to reorder"
				>
					<svg
						className="w-4 h-4 sm:w-5 sm:h-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						aria-hidden="true"
					>
						<path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
					</svg>
				</div>
			)}
		</div>
	);

}