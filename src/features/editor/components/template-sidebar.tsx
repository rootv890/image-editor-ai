import React, { useEffect, useMemo, useState } from 'react';
import { ActiveTool, Editor } from '../types';
import { cn } from '@/lib/utils';
import ToolSidebarHeader from './tool-sidebar-header';
import ToolSidebarClose from './tool-sidebar-close';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertTriangle, CrownIcon, Loader } from 'lucide-react';
import Image from 'next/image';
import { useGetTemplates, ResponseType } from '@/features/projects/api/use-get-templates';
import useConfirm from '@/hooks/useConfirm';
import { usePaywall } from '@/features/subscriptions/hooks/use-paywall';

interface TemplateSidebarProps
{
    activeTool: ActiveTool;
    onChangeActiveTool: ( tool: ActiveTool ) => void;
    editor: Editor | undefined;
}

export default function TemplateSidebar ( {
    activeTool,
    onChangeActiveTool,
    editor,
}: TemplateSidebarProps )
{
    const value = editor?.getActiveFontFamily();
    const { shouldBlock, trigglePaywall } = usePaywall();
    const [ ConfirmDialog, confirm ] = useConfirm(
        "Are you Sure?",
        "You're about to overwrite current design with this template!"
    );

    const onClose = () =>
    {
        onChangeActiveTool( 'select' );
    };

    const onClick = async ( template: ResponseType[ 'data' ][ 0 ] ) =>
    {


        if ( template.isPro && shouldBlock )
        {
            trigglePaywall();
            return;
        }


        const ok = await confirm();
        if ( ok )
        {
            editor?.loadJson( template.json );
        }
        editor?.loadJson( template.json );
    };

    const { data, isLoading, isError } = useGetTemplates(
        {
            limit: '20',
            page: '1'
        }
    );

    return (
        <aside
            className={cn(
                'bg-white flex flex-col relative border-b z-[40] w-[360px] h-full',
                activeTool === 'templates' ? 'visible' : 'hidden',
            )}
        >
            <ConfirmDialog />
            <ToolSidebarHeader
                title="Templates"
                description="Choose from readymade templates"
            />

            {isLoading && (
                <div className="flex items-center justify-center flex-1">
                    <Loader className="size-8 to-muted-foreground animate-spin" />
                </div>
            )}
            {isError && (
                <div className="flex flex-col gap-y-4 items-center justify-center flex-1">
                    <AlertTriangle className="size-8 to-muted-foreground animate-pulse" />
                    <p className="text-sm to-muted-foreground">Failed to Load Templates </p>
                </div>
            )}
            <ScrollArea>
                <div className=" p-4">
                    <div className="grid grid-cols-2 gap-4">
                        {data &&
                            data.map( ( template ) =>
                            {
                                return (
                                    <button
                                        style={{
                                            aspectRatio: `${template.width}/${template.height}`
                                        }}
                                        onClick={() => onClick( template )}
                                        key={template.id}
                                        className="relative w-full hover:opacity-75 bg-muted rounded-sm overflow-hidden border group"

                                    >

                                        <Image
                                            fill
                                            src={template.thumbnail || ''}
                                            alt={template.name || 'Template'}
                                            className="object cover"
                                        />
                                        {
                                            template.isPro && (
                                                <div className='absolute top-2 left-2 items-center flex justify-center bg-black/50 rounded-full'>
                                                    <CrownIcon className='size-4 fill-yellow-500 text-yellow-500' />
                                                </div>
                                            )
                                        }
                                        <div
                                            className="opacity-0 group-hover:opacity-100 absolute  text-[10px] text-white
										 bg-black/50 text-left p-2 bottom-2 left-2"
                                        >
                                            {template.name}
                                        </div>
                                    </button>
                                );
                            } )}
                    </div>
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={() => onClose()} />
        </aside>
    );
}
