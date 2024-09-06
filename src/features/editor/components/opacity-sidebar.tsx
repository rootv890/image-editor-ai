import React, { useEffect, useMemo, useState } from 'react';
import { ActiveTool, Editor } from '../types';
import { cn } from '@/lib/utils';
import ToolSidebarHeader from './tool-sidebar-header';
import ToolSidebarClose from './tool-sidebar-close';
import { ScrollArea } from '@/components/ui/scroll-area';

import { Slider } from '@/components/ui/slider';

interface OpacitySidebarProps {
	activeTool: ActiveTool;
	onChangeActiveTool: (tool: ActiveTool) => void;
	editor: Editor | undefined;
}

export default function OpacitySidebar({
	activeTool,
	onChangeActiveTool,
	editor,
}: OpacitySidebarProps) {
	const initialValue = editor?.getActiveOpacity() || 1;

	const [opacity, setOpacity] = useState(initialValue);

	const onClose = () => {
		onChangeActiveTool('select');
	};

	const onChange = (value: number) => {
		editor?.changeOpacity(value);
		setOpacity(value);
	};
	const selectedObject = useMemo(() => {
		return editor?.selectedObjects[0];
	}, [editor?.selectedObjects]);

	useEffect(() => {
		if (selectedObject) {
			setOpacity(selectedObject.get('opacity') || 1);
		}
	}, [selectedObject]);

	return (
		<aside
			className={cn(
				'bg-white flex flex-col relative border-b z-[40] w-[360px] h-full',
				activeTool === 'opacity' ? 'visible' : 'hidden',
			)}
		>
			<ToolSidebarHeader
				title="Opacity Options"
				description="Modify the opacity to your element"
			/>
			<ScrollArea>
				<div className=" space-y-4 border-b p-4">
					<Slider
						value={[opacity]}
						onValueChange={(values) => onChange(values[0])}
						max={1}
						min={0}
						step={0.01}
					/>
				</div>
			</ScrollArea>
			<ToolSidebarClose onClick={() => onClose()} />
		</aside>
	);
}
