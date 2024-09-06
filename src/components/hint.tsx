import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

export interface HintProps {
	label: string;
	children: React.ReactNode;

	side?: 'left' | 'right' | 'top' | 'bottom';
	align?: 'start' | 'center' | 'end';

	sideOffset?: number;
	alignOffset?: number;
}

export function Hint({
	label,
	children,
	side = 'top',
	align = 'center',
	sideOffset = 0,
	alignOffset = 0,
}: HintProps) {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={100}>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent
					side={side}
					align={align}
					sideOffset={sideOffset}
					alignOffset={alignOffset}
					className="text-white bg-slate-800/50 border-slate-800/50"
				>
					<p className="font-semibold capitalize">{label}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
