import React, { useEffect, useMemo, useState } from 'react';
import { ActiveTool, Editor, filters } from '../types';
import { cn } from '@/lib/utils';
import ToolSidebarHeader from './tool-sidebar-header';
import ToolSidebarClose from './tool-sidebar-close';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

interface FilterSidebarProps {
	activeTool: ActiveTool;
	onChangeActiveTool: (tool: ActiveTool) => void;
	editor: Editor | undefined;
}

export default function FilterSidebar({
	activeTool,
	onChangeActiveTool,
	editor,
}: FilterSidebarProps) {
	const onClose = () => {
		onChangeActiveTool('select');
	};

	return (
		<aside
			className={cn(
				'bg-white flex flex-col relative border-b z-[40] w-[360px] h-full',
				activeTool === 'filter' ? 'visible' : 'hidden',
			)}
		>
			<ToolSidebarHeader
				title="Filter"
				description="Add Filters to your design!"
			/>
			<ScrollArea>
				<div className=" space-y-2 border-b p-4">
					{filters.map(filter => (
						<Button
							key={filter}
							variant={'secondary'}
							size={'lg'}
							className={cn('w-full h-16 justify-start text-left')}
							onClick={() => editor?.changeImageFilter(filter)}
						>
							{filter}
						</Button>
					))}
				</div>
			</ScrollArea>
			<ToolSidebarClose onClick={() => onClose()} />
		</aside>
	);
}
