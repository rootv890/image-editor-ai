'use client';

import { Button } from '@/components/ui/button';
import Logo from './logo';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BiChevronDown } from 'react-icons/bi';
import { Download, MousePointerClick, Redo2, Undo2 } from 'lucide-react';
import { CiFileOn } from 'react-icons/ci';
import { Separator } from '@/components/ui/separator';
import { Hint } from '@/components/hint';
import { BsCloudCheck } from 'react-icons/bs';
import { TbPng } from 'react-icons/tb';
import { SiJpeg } from 'react-icons/si';
import { PiFileJpg, PiFilePng, PiFileSvgLight } from 'react-icons/pi';
import { ActiveTool } from '../types';
import { cn } from '@/lib/utils';

interface NavbarProps {
	activeTool: ActiveTool;
	onChangeActiveTool: (tool: ActiveTool) => void;
}

function Navbar({ activeTool, onChangeActiveTool }: NavbarProps) {
	return (
		<nav className="w-full items-center p-4 h-[68px] gap-x-8 border-b lg:pl-[34px] flex ">
			<Logo />
			<DropdownMenu modal={false}>
				<DropdownMenuTrigger asChild>
					<Button size="sm" variant={'ghost'}>
						File <BiChevronDown className="size-4 ml-2" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start" className="min-w-60">
					<DropdownMenuItem
						onClick={() => {}} //todo: open file
						className="flex items-center gap-x-2"
					>
						<CiFileOn className="size-8" />
						<div>
							<p>Open</p>
							<p className="text-xs text-muted-foreground">Opens a JSON file</p>
						</div>
					</DropdownMenuItem>

					<DropdownMenuItem>Open File</DropdownMenuItem>
					<DropdownMenuItem>Save File</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Export</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<Separator orientation="vertical" className="mx-2" />
			<Hint label="Select" side="bottom" align="center" sideOffset={12}>
				<Button
					size="sm"
					variant="ghost"
					className={cn(activeTool === 'select' && 'bg-gray-100')}
				>
					<MousePointerClick
						size="24"
						onClick={() => onChangeActiveTool('select')}
						className={'size-4'}
					/>
				</Button>
			</Hint>
			<Hint label="Undo" side="bottom" align="center" sideOffset={12}>
				<Button size="sm" variant="ghost">
					<Undo2
						size="24"
						onClick={() => {}}
						className="" //todo dynamic class
					/>
				</Button>
			</Hint>
			<Hint label="Undo" side="bottom" align="center" sideOffset={12}>
				<Button size="sm" variant="ghost">
					<Redo2
						size="24"
						onClick={() => {}}
						className="" //todo dynamic class
					/>
				</Button>
			</Hint>

			<Separator orientation="vertical" className="mx-2" />

			{/* Notification  */}

			<div className="flex items-center gap-x-2">
				<BsCloudCheck className="size-6 text-muted-foreground " />
				<p className="text-muted-foreground text-xs">Saved</p>
			</div>

			<div className=" ml-auto flex items-center gap-x-4">
				<DropdownMenu modal={false}>
					<DropdownMenuTrigger asChild>
						<Button size="sm" variant={'ghost'}>
							Export <Download className="size-4 ml-2" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="min-w-60">
						<DropdownMenuItem
							onClick={() => {}} //todo: open file
							className="flex items-center gap-x-2"
						>
							<CiFileOn className="size-8" />
							<div>
								<p>JSON</p>
								<p className="text-xs text-muted-foreground">
									Save for later editing
								</p>
							</div>
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => {}} //todo: open file
							className="flex items-center gap-x-2"
						>
							<PiFilePng className="size-8" />
							<div>
								<p>PNG</p>
								<p className="text-xs text-muted-foreground">
									Best for transparent background
								</p>
							</div>
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => {}} //todo: open file
							className="flex items-center gap-x-2"
						>
							<PiFileJpg className="size-8" />
							<div>
								<p>JPEG</p>
								<p className="text-xs text-muted-foreground">
									Best for low file size
								</p>
							</div>
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => {}} //todo: open file
							className="flex items-center gap-x-2"
						>
							<PiFileSvgLight className="size-8" />
							<div>
								<p>SVG</p>
								<p className="text-xs text-muted-foreground">
									Best for low file size
								</p>
							</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				{/* // TODO Add User Component */}
			</div>
		</nav>
	);
}

export default Navbar;
