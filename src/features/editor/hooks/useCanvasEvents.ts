import { icons } from 'lucide-react';
import React, { useEffect } from 'react';

interface useCanvasEventsProps {
	canvas: fabric.Canvas | null;
	// container: HTMLDivElement | null;
	setSelectedObjects: (objects: fabric.Object[]) => void;
	clearSelectionCallback?: () => void;
	save: () => void;
}

export default function useCanvasEvents({
	canvas,
	setSelectedObjects,
	clearSelectionCallback,
	save,
}: useCanvasEventsProps) {
	useEffect(() => {
		if (canvas) {
			canvas.on('object:added', () => save());
			canvas.on('object:removed', () => save());
			canvas.on('object:modified', () => save());

			canvas.on('selection:created', (e) => {
				setSelectedObjects(e.selected || []);
			});
			canvas.on('selection:updated', (e) => {
				setSelectedObjects(e.selected || []);
			});
			canvas.on('selection:cleared', () => {
				setSelectedObjects([]);
				clearSelectionCallback?.();
			});
		}

		return () => {
			if (canvas) {
				canvas.off('object:added');
				canvas.off('object:removed');
				canvas.off('object:modified');
				canvas.off('selection:created');
				canvas.off('selection:updated');
				canvas.off('selection:cleared');
			}
		};
	}, [
		canvas,
		clearSelectionCallback,
		setSelectedObjects /*No need for this*/,
		save,
	]);
	return { 1: `1` };
}
