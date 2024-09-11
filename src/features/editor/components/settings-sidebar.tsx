import React, { useEffect, useMemo, useState } from 'react';
import { ActiveTool, Editor, FILL_COLOR } from '../types';
import { cn } from '@/lib/utils';
import ToolSidebarHeader from './tool-sidebar-header';
import ToolSidebarClose from './tool-sidebar-close';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ColorPicker } from './color-picker';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SettingsSidebarProps {
	activeTool: ActiveTool;
	onChangeActiveTool: (tool: ActiveTool) => void;
	editor: Editor | undefined;
}

export default function SettingsSidebar({
	activeTool,
	onChangeActiveTool,
	editor,
}: SettingsSidebarProps) {
	// const value = editor?.canvas.getActiveObject()?.get('fill') as string;

	const workspace = editor?.getWorkspace();

	const initialWidth = useMemo(() => `${workspace?.width ?? 0}`, [workspace]);
	const initialHeight = useMemo(() => `${workspace?.height ?? 0}`, [workspace]);
	const initialBackground = useMemo(
		() => `${workspace?.fill ?? '#ffffff'}`,
		[workspace],
	);

	const [values, setValues] = useState({
		width: initialWidth,
		height: initialHeight,
		background: initialBackground,
	});

	useEffect(() => {
		setValues({
			width: initialWidth,
			height: initialHeight,
			background: initialBackground,
		});
	}, [initialWidth, initialHeight, initialBackground]);

	const changeWidth = (value: string) =>
		setValues(past => ({ ...past, width: value }));

	const changeHeight = (value: string) =>
		setValues(past => ({ ...past, height: value }));

	const changeBackground = (value: string) =>
		setValues(past => {
			editor?.changeBackground(value);
			return { ...past, background: value };
		});

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		editor?.changeSize({
			width: parseInt(values.width, 10),
			height: parseInt(values.height, 10),
		});
	};

	const onClose = () => {
		onChangeActiveTool('select');
	};

	return (
		<aside
			className={cn(
				'bg-white flex flex-col relative border-b z-[40] w-[360px] h-full',
				activeTool === 'settings' ? 'visible' : 'hidden',
			)}
		>
			<ToolSidebarHeader
				title="Canvas Settings"
				description="Change settings of your canvas"
			/>
			<ScrollArea>
				<form
					className="space-y-4 p-4"
					onSubmit={onSubmit}
				>
					<div className="space-y-2  ">
						<Label>Height</Label>
						<Input
							placeholder="Height"
							value={values.height}
							type="number"
							onChange={e => changeHeight(e.target.value)}
						/>
						<Label>Width</Label>
						<Input
							placeholder="Width"
							value={values.width}
							type="number"
							onChange={e => changeWidth(e.target.value)}
						/>

						<Button
							type="submit"
							className="w-full"
						>
							Resize
						</Button>
					</div>
					<div className="p-4">
						<ColorPicker
							value={values.background as string}
							onChange={changeBackground}
						/>
					</div>
				</form>
			</ScrollArea>
			<ToolSidebarClose onClick={() => onClose()} />
		</aside>
	);
}
