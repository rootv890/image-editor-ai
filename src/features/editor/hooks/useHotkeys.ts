import { fabric } from 'fabric';

import { useEvent } from 'react-use';

interface UseHotKeysProps {
	canvas: fabric.Canvas | null;
	undo: () => void;
	redo: () => void;
	copy: () => void;
	paste: () => void;
	save: (skip?: boolean) => void;
}

function useHotKeys({
	canvas,
	undo,
	redo,
	copy,
	paste,
	save,
}: UseHotKeysProps) {
	useEvent('keydown', (event: React.KeyboardEvent) => {
		const isCtrlKey = event.ctrlKey || event.metaKey;
		const isShiftKey = event.shiftKey;
		const isBackspace = event.key === 'Backspace';
		const isInput = ['INPUT', 'TEXTAREA'].includes(
			(event.target as HTMLElement).tagName,
		);

		if (isInput) return;
		if (isBackspace) {
			canvas?.remove(...canvas.getActiveObjects());
		}

		if (isCtrlKey && event.key === 'z') {
			event.preventDefault();
			undo();
		}
		if (
			(isCtrlKey && event.key === 'y') ||
			(isCtrlKey && isShiftKey) ||
			event.key === 'y'
		) {
			event.preventDefault();
			redo();
		}
		if (isCtrlKey && event.key === 'c') {
			event.preventDefault();
			copy();
		}
		if (isCtrlKey && event.key === 'v') {
			event.preventDefault();
			paste();
		}
		if (isCtrlKey && event.key === 's') {
			event.preventDefault();
			console.log({ todo: 'save to DB' });

			save(true);
		}

		if (isCtrlKey && event.key === 'a') {
			event.preventDefault();
			canvas?.discardActiveObject();

			const allObjects = canvas
				?.getObjects()
				.filter((object) => object.selectable);

			canvas?.setActiveObject(
				new fabric.ActiveSelection(allObjects, { canvas }),
			);

			canvas?.renderAll();
		}
	});
}

export default useHotKeys;
