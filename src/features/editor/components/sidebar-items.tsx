import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type SidebarItemProps = {
	icon: LucideIcon;
	label: string;
	isActive?: boolean;
	onClick: () => void;
};

function SidebarItem({
	icon: Icon,
	label,
	isActive,
	onClick,
}: SidebarItemProps) {
	return (
		<Button
			variant={'ghost'}
			onClick={onClick}
			className={cn(
				'w-full h-fit aspect-video p-3 py-4 flex flex-col rounded-none',
				{
					'bg-muted text-primary-100': isActive,
				},
			)}
		>
			<Icon className="size-5 shrink-0 stroke-2" />
			<span className="mt-2 text-xs">{label}</span>
		</Button>
	);
}

export default SidebarItem;
