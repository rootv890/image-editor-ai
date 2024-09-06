import React from 'react';
import { ActiveTool, Editor, STROKE_DASH_ARRAY, STROKE_WIDTH } from '../types';
import { cn } from '@/lib/utils';
import ToolSidebarHeader from './tool-sidebar-header';
import ToolSidebarClose from './tool-sidebar-close';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

interface StrokeWidthSidebarProps {
	activeTool: ActiveTool;
	onChangeActiveTool: (tool: ActiveTool) => void;
	editor: Editor | undefined;
}

export default function StrokeWidthSidebar({
	activeTool,
	onChangeActiveTool,
	editor,
}: StrokeWidthSidebarProps) {
	// const value = editor?.canvas.getActiveObject()?.get('fill') as string;
	const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH;
	const typeValue = editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY;

	const onClose = () => {
		onChangeActiveTool('select');
	};

	const onChange = (value: number) => {
		editor?.changeStrokeWidth(value);
	};

	const onChangeStrokeWidth = (value: number) => {
		editor?.changeStrokeWidth(value);
	};
	const onChangeStrokeType = (value: number[]) => {
		editor?.changeStrokeDashArray(value);
	};

	return (
		<aside
			className={cn(
				'bg-white flex flex-col relative border-b z-[40] w-[360px] h-full',
				activeTool === 'stroke-width' ? 'visible' : 'hidden',
			)}
		>
			<ToolSidebarHeader
				title="Stroke Options"
				description="Modify the stroke to your element"
			/>
			<ScrollArea>
				<div className=" space-y-4 border-b p-4">
					<Label className="text-sm">Stroke Width</Label>
					<Slider
						value={[widthValue]}
						onValueChange={(values) => onChange(values[0])}
					/>
				</div>
				<div className=" space-y-4 border-b p-4">
					<Label className="text-sm">Stroke Type</Label>
					<Button
						onClick={() => onChangeStrokeType([])}
						variant="secondary"
						size="lg"
						className={cn(
							'w-full h-16 justify-start text-left',
							JSON.stringify(typeValue) === `[]` && 'border-2 border-blue-500',
						)}
						style={{
							padding: '8px 16px',
						}}
					>
						<div className="w-full border-black rounded-full border-4" />
					</Button>
					<Button
						onClick={() => onChangeStrokeType([5, 5])}
						variant="secondary"
						size="lg"
						className={cn(
							'w-full h-16 justify-start text-left',
							JSON.stringify(typeValue) === `[5,5]` &&
								'border-2 border-blue-500',
						)}
						style={{
							padding: '8px 16px',
						}}
					>
						<div className="w-full border-black rounded-full border-4 border-dashed" />
					</Button>
				</div>
			</ScrollArea>
			<ToolSidebarClose onClick={() => onClose()} />
		</aside>
	);
}
