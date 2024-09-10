'use client';
import React from 'react';
import SidebarItem from './sidebar-items';

import {
	LayoutTemplate,
	Type,
	Sparkles,
	Pencil,
	ImageIcon,
	Presentation,
	Shapes,
	Settings,
	PencilIcon,
} from 'lucide-react';
import { ActiveTool } from '../types';

interface SidebarProps {
	activeTool: ActiveTool;
	onChangeActiveTool: (tool: ActiveTool) => void;
}

const Sidebar = ({ activeTool, onChangeActiveTool }: SidebarProps) => {
	return (
		<aside className="bg-white flex fcol w-[100px]  h-fulll border-r ">
			<ul className="flex flex-col w-full">
				<SidebarItem
					icon={LayoutTemplate}
					label={'Design'}
					onClick={() => onChangeActiveTool('templates')}
					isActive={activeTool === 'templates'}
				/>
				<SidebarItem
					icon={ImageIcon}
					label={'Image'}
					onClick={() => onChangeActiveTool('images')}
					isActive={activeTool === 'images'}
				/>
				<SidebarItem
					icon={Type}
					label={'Text'}
					onClick={() => onChangeActiveTool('text')}
					isActive={activeTool === 'text'}
				/>
				<SidebarItem
					icon={Shapes}
					label={'Shapes'}
					onClick={() => onChangeActiveTool('shapes')}
					isActive={activeTool === 'shapes'}
				/>
				<SidebarItem
					icon={PencilIcon}
					label={'Draw'}
					onClick={() => onChangeActiveTool('draw')}
					isActive={activeTool === 'draw'}
				/>
				<SidebarItem
					icon={Sparkles}
					label={'AI'}
					onClick={() => onChangeActiveTool('ai')}
					isActive={activeTool === 'ai'}
				/>
				<SidebarItem
					icon={Settings}
					label={'Settings'}
					onClick={() => onChangeActiveTool('settings')}
					isActive={activeTool === 'settings'}
				/>
			</ul>
		</aside>
	);
};

export default Sidebar;

/**
 * Notes
 **/
