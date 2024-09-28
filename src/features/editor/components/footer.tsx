'use client';
import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';

import { Editor } from '../types';
import { Slider } from '@radix-ui/react-slider';
import { FormEvent, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { fabric } from 'fabric';
import { BiZoomIn, BiZoomOut } from 'react-icons/bi';
import { IoResize } from 'react-icons/io5';
interface FooterProps
{
    editor: Editor | undefined;
}

function Footer ( { editor }: FooterProps )
{
    const [ zoom, setZoom ] = useState<number | 1>( editor?.canvas?.getZoom() || 1 );

    const canvas = editor?.canvas;

    const center = canvas?.getCenter();
    canvas?.zoomToPoint(
        new fabric.Point( center?.left || 0.5, center?.top || 0.5 ),
        zoom < 0.2 ? 0.2 : zoom,
    );

    return (
        <footer className="h-[52px] bg-white border-t w-full items-center overflow-x-auto z-[49] p-2 gap-x-1 shrink-0 px-4 flex justify-end  ">
            {/* <input
				type="range"
				className="w-[6rem] slider"
				value={zoom}
				min={0.2}
				max={2.2}
				step={0.01}
				onChange={(e) => {
					const canvas = editor?.canvas;
					setZoom(parseFloat(e.target.value));
				}}
			/>

			<Hint
				label="Reset"
				side="top"
				sideOffset={10}
			>
				<Button
					size={'icon'}
					className="h-full"
					variant={'ghost'}
					onClick={() => {
						editor?.autoZoom();
					}}
				>
					<IoResize className="size-4 " />
				</Button>
			</Hint> */}
            <Hint
                label="Zoom In"
                side="top"
                sideOffset={10}
            >
                <Button
                    size={'icon'}
                    className="h-full"
                    variant={'ghost'}
                    onClick={() =>
                    {
                        editor?.zoomIn();
                        setZoom( editor?.canvas.getZoom() as number );
                    }}
                >
                    <BiZoomIn className="size-4 " />
                </Button>
            </Hint>
            <Hint
                label="Zoom Out"
                side="top"
                sideOffset={10}
            >
                <Button
                    size={'icon'}
                    className="h-full"
                    variant={'ghost'}
                    onClick={() =>
                    {
                        editor?.zoomOut();
                        setZoom( editor?.canvas.getZoom() as number );
                    }}
                >
                    <BiZoomOut className="size-4 " />
                </Button>
            </Hint>
        </footer>
    );
}

export default Footer;
