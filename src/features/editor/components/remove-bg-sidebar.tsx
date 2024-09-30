import React, { useState } from 'react';
import { ActiveTool, Editor } from '../types';
import { cn } from '@/lib/utils';
import ToolSidebarHeader from './tool-sidebar-header';
import ToolSidebarClose from './tool-sidebar-close';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Images, Loader2, Scroll } from 'lucide-react';
import Image from 'next/image';
import { useRemoveBackground } from '@/features/ai/api/use-remove-bg';
import { usePaywall } from '@/features/subscriptions/hooks/use-paywall';

interface RemoveBgSidebarProps
{
    activeTool: ActiveTool;
    onChangeActiveTool: ( tool: ActiveTool ) => void;
    editor: Editor | undefined;
}

export default function RemoveBgSidebar ( {
    activeTool,
    onChangeActiveTool,
    editor,
}: RemoveBgSidebarProps )
{
    const { shouldBlock, trigglePaywall } = usePaywall();
    const selectedObject = editor?.selectedObjects[ 0 ];
    // @ts-ignore
    const imageSrc = selectedObject?._originalElement?.currentSrc;

    const mutation = useRemoveBackground();

    const onClose = () =>
    {
        onChangeActiveTool( 'select' );
    };

    const onClick = () =>
    {
        if ( shouldBlock )
        {
            trigglePaywall();
            return;
        }

        mutation.mutate(
            {
                image: imageSrc,
            },
            {
                onSuccess: ( { data } ) =>
                {
                    editor?.addImage( data );
                },
            },
        );
    };

    return (
        <aside
            className={cn(
                'bg-white flex flex-col relative border-b z-[40] w-[360px] h-full',
                activeTool === 'remove-bg' ? 'visible' : 'hidden',
            )}
        >
            <ToolSidebarHeader
                title="Remove Background"
                description="Remove Background using AI features"
            />
            {!imageSrc && (
                <div className="flex flex-col gap-y-4 items-center justify-center">
                    <AlertTriangle
                        size={8}
                        className="size-4 text-muted-foreground"
                    />
                    <p className="text-muted-foreground text-xl">
                        {' '}
                        Feature Not Avialable for this object
                    </p>
                </div>
            )}
            {imageSrc && (
                <ScrollArea className="p-4">
                    <div
                        className={cn(
                            'relative flex flex-col bg-muted overflow-hidden transition aspect-square rounded-md ',
                            mutation.isPending && 'opacity-50',
                        )}
                    >
                        <Image
                            src={imageSrc}
                            alt="Image"
                            className="object-cover"
                            fill
                        />
                    </div>
                    <Button
                        onClick={onClick}
                        className="w-full mt-2"
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? (
                            <span className="flex justify-center items-center">
                                {'Removing BG'}
                                <Loader2 className="animate-spin" />
                            </span>
                        ) : (
                            'Remove Background'
                        )}
                    </Button>
                </ScrollArea>
            )}
            <ToolSidebarClose onClick={() => onClose()} />
        </aside>
    );
}
