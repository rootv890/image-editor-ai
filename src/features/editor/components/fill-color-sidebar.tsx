import React from 'react';
import { ActiveTool, Editor, FILL_COLOR } from '../types';
import { cn } from '@/lib/utils';
import ToolSidebarHeader from './tool-sidebar-header';
import ToolSidebarClose from './tool-sidebar-close';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ColorPicker } from './color-picker';

interface FillColorSidebarProps {
	activeTool: ActiveTool;
	onChangeActiveTool: (tool: ActiveTool) => void;
	editor: Editor | undefined;
}

export default function FillColorSidebar({
	activeTool,
	onChangeActiveTool,
	editor,
}: FillColorSidebarProps) {
	// const value = editor?.canvas.getActiveObject()?.get('fill') as string;
	const value = editor?.getActiveFillColor() || FILL_COLOR;

	const onClose = () => {
		onChangeActiveTool('select');
	};

	const onChange = (value: string) => {
		editor?.changeFillColor(value);
	};

	return (
		<aside
			className={cn(
				'bg-white flex flex-col relative border-b z-[40] w-[360px] h-full',
				activeTool === 'fill' ? 'visible' : 'hidden',
			)}
		>
			<ToolSidebarHeader
				title="Fill Color"
				description="Add color to your shapes"
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
