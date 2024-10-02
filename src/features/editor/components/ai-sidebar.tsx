import React, { useState } from 'react';
import { ActiveTool, Editor } from '../types';
import { cn } from '@/lib/utils';
import ToolSidebarHeader from './tool-sidebar-header';
import ToolSidebarClose from './tool-sidebar-close';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useGenerateImage } from '@/features/ai/api/use-generate-image';
import { Loader } from 'lucide-react';
import { usePaywall } from '@/features/subscriptions/hooks/use-paywall';

interface AiSidebarProps
{
    activeTool: ActiveTool;
    onChangeActiveTool: ( tool: ActiveTool ) => void;
    editor: Editor | undefined;
}

export default function AiSidebar ( {
    activeTool,
    onChangeActiveTool,
    editor,
}: AiSidebarProps )
{
    const { shouldBlock, triggerPaywall } = usePaywall();
    const mutation = useGenerateImage();
    const [ value, setValue ] = useState( '' );

    const onSubmit = ( e: React.FormEvent<HTMLFormElement> ) =>
    {
        e.preventDefault();

        if ( shouldBlock )
        {
            triggerPaywall();
            return;
        }


        mutation.mutate(
            { prompt: value },
            {
                onSuccess: ( { data } ) =>
                {
                    editor?.addImage( data );
                },
            },
        );
    };

    const onClose = () =>
    {
        onChangeActiveTool( 'select' );
    };

    return (
        <aside
            className={cn(
                'bg-white flex flex-col relative border-b z-[40] w-[360px] h-full',
                activeTool === 'ai' ? 'visible' : 'hidden',
            )}
        >
            <ToolSidebarHeader
                title="AI Image"
                description="Generate Image using AI"
            />
            <ScrollArea>
                <form
                    onSubmit={onSubmit}
                    className=" space-y-6 p-4"
                >
                    <Textarea
                        placeholder="black forest gateau cake spelling out the words 'CANVA CLONE' tasty, food photography, dynamic shot"
                        cols={30}
                        rows={6}
                        required
                        value={value}
                        minLength={3}
                        onChange={e => setValue( e.target.value )}
                    />
                    <Button
                        disabled={mutation.isPending}
                        type="submit"
                        className="w-full"
                    >
                        {mutation.isPending ? (
                            <span className="flex justify-center items-center">
                                {'Generating...'}
                                <Loader className="animate-spin" />
                            </span>
                        ) : (
                            'Generate ✨'
                        )}
                    </Button>
                </form>
            </ScrollArea>
            <ToolSidebarClose onClick={() => onClose()} />
        </aside>
    );
}
