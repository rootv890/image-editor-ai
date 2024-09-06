import React, { useEffect, useMemo, useState } from 'react';
import { ActiveTool, Editor, fonts } from '../types';
import { cn } from '@/lib/utils';
import ToolSidebarHeader from './tool-sidebar-header';
import ToolSidebarClose from './tool-sidebar-close';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

interface FontSidebarProps {
	activeTool: ActiveTool;
	onChangeActiveTool: (tool: ActiveTool) => void;
	editor: Editor | undefined;
}

export default function FontSidebar({
	activeTool,
	onChangeActiveTool,
	editor,
}: FontSidebarProps) {
	const value = editor?.getActiveFontFamily();

	const onClose = () => {
		onChangeActiveTool('select');
	};

	return (
		<aside
			className={cn(
				'bg-white flex flex-col relative border-b z-[40] w-[360px] h-full',
				activeTool === 'font' ? 'visible' : 'hidden',
			)}
		>
			<ToolSidebarHeader
				title="Font"
				description="Add Cool Fonts to your design"
			/>
			<ScrollArea>
				<div className=" space-y-2 border-b p-4">
					{fonts.map((font) => (
						<Button
							key={font}
							variant={'secondary'}
							size={'lg'}
							className={cn(
								'w-full h-16 justify-start text-left',
								value === font && 'border-2 border-blue-500',
							)}
							style={{
								fontFamily: font,
								fontSize: '16px',
								padding: '8px 16px',
							}}
							onClick={() => editor?.changeFontFamily(font)}
						>
							{font}
						</Button>
					))}
				</div>
			</ScrollArea>
			<ToolSidebarClose onClick={() => onClose()} />
		</aside>
	);
}
