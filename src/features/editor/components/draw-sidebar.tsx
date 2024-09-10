import React from 'react';
import { ActiveTool, Editor, STROKE_COLOR, STROKE_WIDTH } from '../types';
import { cn } from '@/lib/utils';
import ToolSidebarHeader from './tool-sidebar-header';
import ToolSidebarClose from './tool-sidebar-close';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ColorPicker } from './color-picker';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface DrawSidebarProps {
	activeTool: ActiveTool;
	onChangeActiveTool: (tool: ActiveTool) => void;
	editor: Editor | undefined;
}

export default function DrawSidebar({
	activeTool,
	onChangeActiveTool,
	editor,
}: DrawSidebarProps) {
	const colorValue = editor?.getActiveStrokeColor() || STROKE_COLOR;
	const strokeWidthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH;

	const onClose = () => {
		editor?.disableDrawingMode();
		onChangeActiveTool('select');
	};

	const onColorChange = (value: string) => {
		editor?.changeStrokeColor(value);
	};
	const onWidthChange = (value: number) => {
		editor?.changeStrokeWidth(value);
	};

	return (
		<aside
			className={cn(
				'bg-white flex flex-col relative border-b z-[40] w-[360px] h-full',
				activeTool === 'draw' ? 'visible' : 'hidden',
			)}
		>
			<ToolSidebarHeader
				title="Draw Tools"
				description="Modify Brush Setting"
			/>
			<ScrollArea>
				<div className=" space-y-6 p-4 border-b">
					<Label>Brush Width</Label>
					<Slider
						value={[strokeWidthValue]}
						onValueChange={values => {
							onWidthChange(values[0]);
						}}
					/>
				</div>
				<div className=" space-y-6 p-4">
					<ColorPicker
						value={colorValue}
						onChange={onColorChange}
					/>
				</div>
			</ScrollArea>
			<ToolSidebarClose onClick={() => onClose()} />
		</aside>
	);
}
