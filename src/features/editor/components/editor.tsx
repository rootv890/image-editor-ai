'use client';

import { useEditor } from '@/features/editor/hooks/useEditor';
import { useCallback, useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import Navbar from './navbar';
import Sidebar from './sidebar';
import Toolbar from './toolbar';
import Footer from './footer';
import { ActiveTool, selectionDependentTools } from '../types';
import ShapeSidebar from './shape-sidebard';
import FillColorSidebar from './fill-color-sidebar';
import StrokeColorSidebar from './stroke-color-sidebar';
import StrokeWidthSidebar from './stroke-width-sidebar';
import OpacitySidebar from './opacity-sidebar';
import TextSidebar from './text-sidebar';
import FontSidebar from './font-sidebar';
import ImageSidebar from './image-sidebar';
import FilterSidebar from './filter-sidebar';
import AiSidebar from './ai-sidebar';
import RemoveBgSidebar from './remove-bg-sidebar';
import DrawSidebar from './draw-sidebar';
import SettingsSidebar from './settings-sidebar';
import { ResponseType } from '@/features/projects/api/use-get-project';
import { useUpdateProject } from '@/features/projects/api/use-update-project';
import debounce from 'lodash.debounce';

interface EditorProps
{
    initialData: ResponseType[ 'data' ];
}

export const Editor = ( { initialData }: EditorProps ) =>
{
    const { mutate } = useUpdateProject( initialData.id );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSave = useCallback(
        debounce(
            ( values: { json: string, height: number, width: number; } ) =>
            {
                mutate( values );
            }, 500 // delay to save!
        ), [ mutate ] );

    const [ activeTool, setActiveTool ] = useState<ActiveTool>( 'select' );

    const onClearSelection = useCallback( () =>
    {
        if ( selectionDependentTools.includes( activeTool ) )
        {
            setActiveTool( 'select' );
        }
    }, [ activeTool ] );

    const { init, editor } = useEditor( {
        defaultState: initialData.json,
        defaultWidth: initialData.width,
        defaultHeight: initialData.height,
        clearSelectionCallback: onClearSelection,
        saveCallback: debouncedSave
    } );

    const onChangeActiveTool = useCallback(
        ( tool: ActiveTool ) =>
        {
            if ( tool === 'draw' )
            {
                editor?.enableDrawingMode();
            }

            if ( activeTool === 'draw' )
            {
                editor?.disableDrawingMode();
            }

            if ( activeTool === tool )
            {
                // set active tool to select if the same tool is clicked
                return setActiveTool( 'select' );
            }

            setActiveTool( tool );
        },
        [ activeTool, editor ],
    );

    const canvasRef = useRef<HTMLCanvasElement>( null );
    const containerRef = useRef<HTMLDivElement>( null );

    useEffect( () =>
    {
        // making canvas using html canvas
        const canvas = new fabric.Canvas( canvasRef.current!, {
            controlsAboveOverlay: true,
            preserveObjectStacking: true, // if false, the object will be placed on top of all other objects only visually
        } );
        init( {
            initialCanvas: canvas,
            initialContainer: containerRef.current!,
        } );

        // cleanup / unmount / dispose
        // Cleanup function to dispose of the canvas on component unmount
        return () =>
        {
            canvas.dispose();
        };
    }, [ init ] );

    return (
        <div className="h-full flex flex-col">
            <Navbar
                id={initialData.id}
                editor={editor}
                activeTool={activeTool}
                onChangeActiveTool={onChangeActiveTool} />
            <div className="absolute h-[calc(100%-68px)] w-full top-[68px] flex ">
                <Sidebar
                    activeTool={activeTool} // tells which tool is active
                    onChangeActiveTool={onChangeActiveTool} // logic to change active tool
                />
                <ShapeSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <FillColorSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <StrokeColorSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <StrokeWidthSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <OpacitySidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <TextSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <FontSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <ImageSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <FilterSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <AiSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <RemoveBgSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <DrawSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <SettingsSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />

                <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
                    <Toolbar
                        editor={editor}
                        activeTool={activeTool}
                        onChangeActiveTool={onChangeActiveTool}
                        key={JSON.stringify( editor?.canvas.getActiveObject )}
                    />
                    <div className="flex-1 h-[calc(100%-124px)] bg-muted" ref={containerRef}>
                        <canvas ref={canvasRef} />
                    </div>
                    <Footer editor={editor} />
                </main>
            </div>
        </div>
    );
};

/**
 * Notes
 * Will be Displayed on Page.tsx of editor/[id]  route
 **/
