import React from 'react';
import { ActiveTool, Editor, STROKE_COLOR } from '../types';
import { cn } from '@/lib/utils';
import ToolSidebarHeader from './tool-sidebar-header';
import ToolSidebarClose from './tool-sidebar-close';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ColorPicker } from './color-picker';

interface StrokeColorSidebarProps {
	activeTool: ActiveTool;
	onChangeActiveTool: (tool: ActiveTool) => void;
	editor: Editor | undefined;
}

export default function StrokeColorSidebar({
	activeTool,
	onChangeActiveTool,
	editor,
}: StrokeColorSidebarProps) {
	// const value = editor?.canvas.getActiveObject()?.get('fill') as string;
	const value = editor?.getActiveStrokeColor() || STROKE_COLOR;

	const onClose = () => {
		onChangeActiveTool('select');
	};

	const onChange = (value: string) => {
		editor?.changeStrokeColor(value);
	};

	return (
		<aside
			className={cn(
				'bg-white flex flex-col relative border-b z-[40] w-[360px] h-full',
				activeTool === 'stroke-color' ? 'visible' : 'hidden',
			)}
		>
			<ToolSidebarHeader
				title="Stroke Color"
				description="Add color to your strokes"
			/>
			<ScrollArea>
				<div className=" space-y-6 p-4">
					<ColorPicker value={value} onChange={onChange} />
				</div>
			</ScrollArea>
			<ToolSidebarClose onClick={() => onClose()} />
		</aside>
	);
}
