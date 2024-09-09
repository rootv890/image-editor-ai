import React, { useState } from 'react';
import { ActiveTool, Editor, FONT_SIZE, FONT_WEIGHT } from '../types';
import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RxBorderWidth, RxTransparencyGrid } from 'react-icons/rx';
import {
	AlignCenter,
	AlignLeft,
	AlignRight,
	ArrowDown,
	ArrowUp,
	ChevronDown,
	DeleteIcon,
	SquareSplitHorizontal,
	Trash,
} from 'lucide-react';
import { isTextType } from '../utils';
import { BiFontFamily } from 'react-icons/bi';
import { FaBold, FaStrikethrough } from 'react-icons/fa6';
import { FaItalic, FaUnderline } from 'react-icons/fa';
import { ITextOptions } from 'fabric/fabric-impl';
import { Separator } from '@/components/ui/separator';
import FontSizeInput from './FontSizeInput';
import { TbColorFilter } from 'react-icons/tb';

interface ToolbarProps {
	editor: Editor | undefined;
	activeTool: ActiveTool;
	onChangeActiveTool: (tool: ActiveTool) => void;
}

function Toolbar({ editor, activeTool, onChangeActiveTool }: ToolbarProps) {
	// const selectedObject = editor?.canvas.getActiveObject();

	const initialFillColor = editor?.getActiveFillColor();

	const initialStrokeColor = editor?.getActiveStrokeColor();
	const initialFontFamily = editor?.getActiveFontFamily();
	const initialFontWeight = editor?.getActiveFontWeight() || FONT_WEIGHT;
	const intialFontStyle = editor?.getActiveFontStyle() || 'normal';
	const initialFontLinethrough = editor?.getActiveFontLineThrough();
	const initialFontUnderline = editor?.getActiveFontUnderline();
	const initialTextAlign = editor?.getActiveTextAlign();
	const initialFontSize = editor?.getActiveFontSize();

	const [properties, setProperties] = useState({
		fillColor: initialFillColor,
		strokeColor: initialStrokeColor,
		fontFamily: initialFontFamily,
		fontWeight: initialFontWeight,
		fontStyle: intialFontStyle,
		fontLinethrough: initialFontLinethrough,
		fontUnderline: initialFontUnderline,
		textAlign: initialTextAlign,
		fontSize: initialFontSize || FONT_SIZE,
	});

	const selectedObjectType = editor?.selectedObjects[0]?.type;
	const isText = isTextType(selectedObjectType);
	const isImage = selectedObjectType === 'image';

	const selectedObject = editor?.selectedObjects[0];
	const toggleBold = () => {
		if (!selectedObject) return;

		const newValue = properties.fontWeight > 500 ? 400 : 700;
		editor?.changeFontWeight(newValue);
		setProperties(current => ({ ...current, fontWeight: newValue }));
	};
	const toggleItalic = () => {
		if (!selectedObject) return;
		const isItalic = properties.fontStyle === 'italic';
		const newValue = isItalic ? 'normal' : 'italic';
		editor?.changeFontStyle(newValue);
		setProperties(current => ({ ...current, fontStyle: newValue }));
	};
	const toggleLinethrough = () => {
		if (!selectedObject) return;

		const newValue = properties.fontLinethrough ? false : true;
		editor?.changeFontLineThrough(newValue);
		// @ts-ignore
		setProperties(current => ({ ...current, fontLinethrough: newValue }));
	};
	const toggleUnderline = () => {
		if (!selectedObject) return;

		const newValue = properties.fontUnderline ? false : true;
		editor?.changeFontUnderline(newValue);
		// @ts-ignore
		setProperties(current => ({ ...current, fontUnderline: newValue }));
	};

	const onChangeTextAlign = (value: ITextOptions['textAlign']) => {
		if (!selectedObject) return;
		editor?.changeTextAlign(value);
		setProperties(current => ({ ...current, textAlign: value }));
	};

	const onChangeFontSize = (value: number) => {
		if (!selectedObject) return;
		editor?.changeFontSize(value);
		setProperties(current => ({ ...current, fontSize: value }));
	};

	if (editor?.selectedObjects.length === 0) {
		return (
			<div className="shrink-0 h-[56px] bg-white w-full border-b items-center flex overflow-x-auto z-[49] p-2 gap-x-2"></div>
		);
	}

	return (
		<div className="shrink-0 h-[56px] bg-white w-full border-b items-center flex overflow-x-auto z-[49] p-2 gap-x-2">
			<div className="flex items-center justify-center h-full">
				{!isImage && (
					<Hint
						label="Color"
						side="bottom"
						sideOffset={5}
					>
						<Button
							onClick={() => {
								onChangeActiveTool('fill');
							}}
							size="icon"
							variant="ghost"
							className={cn(activeTool === 'fill' && 'bg-gray-100')}
						>
							<div
								className="rounded-sm size-4 border"
								style={{
									backgroundColor: properties.fillColor,
									// typeof fillColor === 'string' ? fillColor : 'black',
								}}
							></div>
						</Button>
					</Hint>
				)}
				{!isText && (
					<>
						<Hint
							label="Stroke Color"
							side="bottom"
							sideOffset={5}
						>
							<Button
								onClick={() => {
									onChangeActiveTool('stroke-color');
								}}
								size="icon"
								variant="ghost"
								className={cn(activeTool === 'stroke-color' && 'bg-gray-100')}
							>
								<div
									className="rounded-sm size-4  border-2 bg-white"
									style={{
										borderColor: properties.strokeColor,
										// typeof fillColor === 'string' ? fillColor : 'black',
									}}
								></div>
							</Button>
						</Hint>
						<div className="">
							<Hint
								label="Stroke Width"
								side="bottom"
								sideOffset={5}
							>
								<Button
									onClick={() => {
										onChangeActiveTool('stroke-width');
									}}
									size="icon"
									variant="ghost"
									className={cn(activeTool === 'stroke-width' && 'bg-gray-100')}
								>
									<div className="rounded-sm size-4   bg-white">
										<RxBorderWidth className="size-4" />
									</div>
								</Button>
							</Hint>
						</div>
					</>
				)}
				{/* // ! FONT */}
				{isText && (
					<>
						{' '}
						<Hint
							label="Font"
							side="bottom"
							sideOffset={5}
						>
							<Button
								onClick={() => {
									onChangeActiveTool('font');
									// changeFontFamily();
								}}
								size="default"
								variant="ghost"
								className={cn(
									activeTool === 'font' && 'bg-gray-100',
									'w-auto px-2 text-sm',
								)}
							>
								<div className="rounded-sm  truncate max-w-[100px]  bg-white">
									{properties.fontFamily}
								</div>
								<ChevronDown size={14} />
							</Button>
						</Hint>
						<Hint
							label="Bold"
							side="bottom"
							sideOffset={5}
						>
							<Button
								onClick={toggleBold}
								size="icon"
								variant="ghost"
								className={cn(properties.fontWeight > 500 && 'bg-gray-100')}
							>
								<div className="rounded-sm size-4  bg-white">
									<FaBold className="size-4" />
								</div>
							</Button>
						</Hint>
						<Hint
							label="Italic"
							side="bottom"
							sideOffset={5}
						>
							<Button
								onClick={toggleItalic}
								size="icon"
								variant="ghost"
								className={cn(
									properties.fontStyle === 'italic' && 'bg-gray-100',
								)}
							>
								<div className="rounded-sm size-4  bg-white">
									<FaItalic className="size-4" />
								</div>
							</Button>
						</Hint>
						<Hint
							label="Underlien"
							side="bottom"
							sideOffset={5}
						>
							<Button
								onClick={toggleUnderline}
								size="icon"
								variant="ghost"
								className={cn(properties.fontUnderline! && 'bg-gray-100')}
							>
								<div className="rounded-sm size-4  bg-white">
									<FaUnderline className="size-4" />
								</div>
							</Button>
						</Hint>
						<Hint
							label="Strike Through"
							side="bottom"
							sideOffset={5}
						>
							<Button
								onClick={toggleLinethrough}
								size="icon"
								variant="ghost"
								className={cn(properties.fontLinethrough! && 'bg-gray-100')}
							>
								<div className="rounded-sm size-4  bg-white">
									<FaStrikethrough className="size-4" />
								</div>
							</Button>
						</Hint>
						<Separator orientation="vertical" />
						<Hint
							label="Text Align Left"
							side="bottom"
							sideOffset={5}
						>
							<Button
								onClick={() => onChangeTextAlign('left')}
								size="icon"
								variant="ghost"
								className={cn(properties.textAlign === 'left' && 'bg-gray-100')}
							>
								<div className="rounded-sm size-4  bg-white">
									<AlignLeft className="size-4" />
								</div>
							</Button>
						</Hint>
						<Hint
							label="Text Align Center"
							side="bottom"
							sideOffset={5}
						>
							<Button
								onClick={() => onChangeTextAlign('center')}
								size="icon"
								variant="ghost"
								className={cn(
									properties.textAlign === 'center' && 'bg-gray-100',
								)}
							>
								<div className="rounded-sm size-4  bg-white">
									<AlignCenter className="size-4" />
								</div>
							</Button>
						</Hint>
						<Hint
							label="Text Align Right"
							side="bottom"
							sideOffset={5}
						>
							<Button
								onClick={() => onChangeTextAlign('right')}
								size="icon"
								variant="ghost"
								className={cn(
									properties.textAlign === 'right' && 'bg-gray-100',
								)}
							>
								<div className="rounded-sm size-4  bg-white">
									<AlignRight className="size-4" />
								</div>
							</Button>
						</Hint>
						<div>
							<FontSizeInput
								value={properties.fontSize}
								onChange={onChangeFontSize}
							/>
						</div>
					</>
				)}
				{isImage && (
					<Hint
						label="Filter"
						side="bottom"
						sideOffset={5}
					>
						<Button
							onClick={() => onChangeActiveTool('filter')}
							size="icon"
							variant="ghost"
							className={cn(activeTool === 'filter' && 'bg-gray-100')}
						>
							<div className="rounded-sm size-4  bg-white">
								<TbColorFilter className="size-4" />
							</div>
						</Button>
					</Hint>
				)}
				{isImage && (
					<Hint
						label="Remove background"
						side="bottom"
						sideOffset={5}
					>
						<Button
							onClick={() => onChangeActiveTool('remove-bg')}
							size="icon"
							variant="ghost"
							className={cn(activeTool === 'remove-bg' && 'bg-gray-100')}
						>
							<div className="rounded-sm size-4  bg-white">
								<SquareSplitHorizontal className="size-4" />
							</div>
						</Button>
					</Hint>
				)}

				<Separator orientation="vertical" />
				<Hint
					label="Bring Forward"
					side="bottom"
					sideOffset={5}
				>
					<Button
						onClick={() => editor?.bringForward()}
						size="icon"
						variant="ghost"
					>
						<div className="rounded-sm size-4  bg-white">
							<ArrowUp className="size-4" />
						</div>
					</Button>
				</Hint>

				<Hint
					label="Send Backwards"
					side="bottom"
					sideOffset={5}
				>
					<Button
						onClick={() => editor?.sendBackward()}
						size="icon"
						variant="ghost"
					>
						<div className="rounded-sm size-4  bg-white">
							<ArrowDown className="size-4" />
						</div>
					</Button>
				</Hint>

				<div className="border-none flex items-center justify-center h-full">
					<Hint
						label="Opacity"
						side="bottom"
						sideOffset={5}
					>
						<Button
							onClick={() => onChangeActiveTool('opacity')}
							size="icon"
							variant="ghost"
							className={cn(activeTool === 'opacity' && 'bg-gray-100')}
						>
							<div className="rounded-sm size-4  bg-white">
								<RxTransparencyGrid className="size-4" />
							</div>
						</Button>
					</Hint>
				</div>
				<div className="border-none flex items-center justify-center h-full">
					<Hint
						label="Delete"
						side="bottom"
						sideOffset={5}
					>
						<Button
							onClick={() => editor?.delete()}
							size="icon"
							variant="ghost"
						>
							<div className="rounded-sm size-4  bg-white">
								<Trash className="size-4" />
							</div>
						</Button>
					</Hint>
				</div>
			</div>
		</div>
	);
}

export default Toolbar;
