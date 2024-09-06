import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import type { IconType } from 'react-icons';

interface ShapeToolProps {
	icon: IconType | LucideIcon;
	onClick: () => void;
	iconClassname?: string;
}

export default function ShapeTool({
	icon: Icon,
	onClick,
	iconClassname,
}: ShapeToolProps) {
	return (
		<button
			className="aspect-square border rounded-md p-5 hover:bg-muted transition"
			onClick={onClick}
		>
			<Icon className={cn(`h-full w-full `, iconClassname)} />
		</button>
	);
}
