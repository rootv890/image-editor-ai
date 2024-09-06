import React, { useEffect, useMemo, useState } from 'react';
import { ActiveTool, Editor, fonts } from '../types';
import { cn } from '@/lib/utils';
import ToolSidebarHeader from './tool-sidebar-header';
import ToolSidebarClose from './tool-sidebar-close';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

import { useGetImages } from '@/features/images/api/use-get-images';
import { AlertTriangle, Loader } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { UploadButton } from '@/lib/uploadthing';

interface ImageSidebarProps {
	activeTool: ActiveTool;
	onChangeActiveTool: (tool: ActiveTool) => void;
	editor: Editor | undefined;
}

export default function ImageSidebar({
	activeTool,
	onChangeActiveTool,
	editor,
}: ImageSidebarProps) {
	const value = editor?.getActiveFontFamily();

	const onClose = () => {
		onChangeActiveTool('select');
	};

	const { data, isLoading, isError } = useGetImages();

	return (
		<aside
			className={cn(
				'bg-white flex flex-col relative border-b z-[40] w-[360px] h-full',
				activeTool === 'images' ? 'visible' : 'hidden',
			)}
		>
			<ToolSidebarHeader
				title="Images"
				description="Add Images to Your Canvas"
			/>

			<div className="p-4 border-b">
				<UploadButton
					appearance={{
						button: 'w-full text-sm font-medium ',
						allowedContent: 'hidden',
					}}
					content={{ button: 'Upload Image' }}
					endpoint="imageUploader"
					onClientUploadComplete={(res) => {
						editor?.addImage(res[0].url);
					}}
					onUploadProgress={(progress: number) => {
						// Do something with the progress.
						console.log('Progress:', progress);
					}}
					onUploadError={(error: Error) => {
						// Do something with the error.
						alert(`ERROR! ${error.message}`);
					}}
				/>
			</div>

			{isLoading && (
				<div className="flex items-center justify-center flex-1">
					<Loader className="size-8 to-muted-foreground animate-spin" />
				</div>
			)}
			{isError && (
				<div className="flex flex-col gap-y-4 items-center justify-center flex-1">
					<AlertTriangle className="size-8 to-muted-foreground animate-pulse" />
					<p className="text-sm to-muted-foreground">Failed to Fetch Images </p>
				</div>
			)}
			<ScrollArea>
				<div className=" p-4">
					<div className="grid grid-cols-2 gap-4">
						{data &&
							data.map((image) => {
								return (
									<button
										onClick={() => {
											editor?.addImage(image.urls.regular);
										}}
										key={image.id}
										className="relative w-full h-[100px] hover:opacity-75 bg-muted rounded-sm overflow-hidden border group"
									>
										<Image
											fill
											src={image.urls.small}
											alt={image.alt_description || 'Image'}
											className="object cover"
										/>
										<Link
											href={image.links.html}
											target="_blank"
											className="opacity-0 group-hover:opacity-100 absolute  text-[10px] text-white hover:underline  
										 bg-black/50 text-left p-2 bottom-2 left-2"
										>
											{image.user.name}
										</Link>
									</button>
								);
							})}
					</div>
				</div>
			</ScrollArea>
			<ToolSidebarClose onClick={() => onClose()} />
		</aside>
	);
}
