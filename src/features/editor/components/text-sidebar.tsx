import React, { useEffect, useMemo, useState } from 'react';
import { ActiveTool, Editor } from '../types';
import { cn } from '@/lib/utils';
import ToolSidebarHeader from './tool-sidebar-header';
import ToolSidebarClose from './tool-sidebar-close';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

interface TextSidebarProps {
	activeTool: ActiveTool;
	onChangeActiveTool: (tool: ActiveTool) => void;
	editor: Editor | undefined;
}

export default function TextSidebar({
	activeTool,
	onChangeActiveTool,
	editor,
}: TextSidebarProps) {
	const onClose = () => {
		onChangeActiveTool('select');
	};

	return (
		<aside
			className={cn(
				'bg-white flex flex-col relative border-b z-[40] w-[360px] h-full',
				activeTool === 'text' ? 'visible' : 'hidden',
			)}
		>
			<ToolSidebarHeader title="Text" description="Add text to your design" />
			<ScrollArea>
				<div className=" space-y-4 border-b p-4">
					<Button
						className="w-full"
						onClick={() =>
							editor?.addText('textbox', {
								fontSize: 42,
								fontFamily: 'Arial',
							})
						}
					>
						Add Text
					</Button>
					<Button
						variant={'secondary'}
						size={'lg'}
						className="w-full h-16 file:"
						onClick={() =>
							editor?.addText('Heading', {
								fontSize: 80,
								fontWeight: 700,
								fontFamily: 'Arial',
							})
						}
					>
						<span className="text-3xl font-bold">Add a heading</span>
					</Button>
					<Button
						variant={'secondary'}
						size={'lg'}
						className="w-full h-16 file:"
						onClick={() =>
							editor?.addText('Subheading', {
								fontSize: 44,
								fontWeight: 500,
								fontFamily: 'Arial',
							})
						}
					>
						<span className="text-2xl font-medium">Add a subheading</span>
					</Button>
					<Button
						variant={'outline'}
						size={'sm'}
						className="w-full h-16 file:"
						onClick={() =>
							editor?.addText('Paragraph', {
								fontSize: 32,
								fontWeight: 500,
								fontFamily: 'Arial',
							})
						}
					>
						<span className="">Add a paragraph</span>
					</Button>
				</div>
			</ScrollArea>
			<ToolSidebarClose onClick={() => onClose()} />
		</aside>
	);
}
