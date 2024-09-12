import { useCallback, useState, useMemo } from 'react';
import { fabric } from 'fabric';
import { useAutoResize } from './useAutoResize';
import {
	BuildEditorProps,
	CIRCLE_OPTIONS,
	DIAMOND_OPTIONS,
	Editor,
	EditorHookProps,
	FILL_COLOR,
	RECTANGLE_OPTIONS,
	STROKE_DASH_ARRAY,
	STROKE_WIDTH,
	TEXT_OPTIONS,
	TRIANGLE_OPTIONS,
	FONT_FAMILY,
	FONT_WEIGHT,
	FONT_SIZE,
	JSON_KEYS,
} from '../types';
import useCanvasEvents from './useCanvasEvents';
import {
	createFilter,
	downloadFile,
	isTextType,
	transformText,
} from '../utils';
import { ITextboxOptions, ITextOptions } from 'fabric/fabric-impl';
import { useClipboard } from './use-clipboard';
import useHistory from './useHistory';
import useHotKeys from './useHotkeys';
import { useWindowEvents } from './use-window-events';

// Hook

export const useEditor = ({ clearSelectionCallback }: EditorHookProps) => {
	// here canvas is a FabricJS based canvas
	const [canvas, setCanvas] = useState<fabric.Canvas /*👈🏻*/ | null>(null);
	const [container, setContainer] = useState<HTMLDivElement | null>(null);

	// Selected Objects
	const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);
	const [fontFamily, setFontFamily] = useState<string>(FONT_FAMILY);
	const [fillColor, setFillColor] = useState<string>(FILL_COLOR);
	const [strokeColor, setStrokeColor] = useState<string>(FILL_COLOR);
	const [strokeWidth, setStrokeWidth] = useState<number>(STROKE_WIDTH);
	const [strokeDashArray, setStrokeDashArray] =
		useState<number[]>(STROKE_DASH_ARRAY);

	// Window Event Exit
	useWindowEvents();

	// Use History
	const { save, canRedo, canUndo, undo, redo, canvasHistory, setHistoryIndex } =
		useHistory({ canvas });

	// Use ClipBoard
	const { copy, paste } = useClipboard({ canvas });

	// AutoResize when change in width or height of the viewport?
	const { autoZoom } = useAutoResize({ canvas, container });

	useCanvasEvents({ save, canvas, setSelectedObjects, clearSelectionCallback });

	// HotKeys
	useHotKeys({
		canvas,
		undo,
		redo,
		save,
		copy,
		paste,
	});

	const editor = useMemo(() => {
		if (canvas) {
			return buildEditor({
				save,
				undo,
				redo,
				canUndo,
				canRedo,
				canvas,
				fillColor,
				setFillColor,
				strokeColor,
				setStrokeColor,
				strokeWidth,
				setStrokeWidth,
				selectedObjects,
				strokeDashArray,
				setStrokeDashArray,
				autoZoom,
				copy,
				paste,
				fontFamily,
				setFontFamily,
			});
		} else {
			return undefined;
		}
	}, [
		canvas,
		fillColor,
		strokeColor,
		strokeWidth,
		selectedObjects,
		strokeDashArray,
		fontFamily,
		autoZoom,
		copy,
		paste,
		save,
		undo,
		redo,
		canUndo,
		canRedo,
	]);

	const init = useCallback(
		({
			initialCanvas,
			initialContainer,
		}: {
			initialCanvas: fabric.Canvas;
			initialContainer: HTMLDivElement;
		}) => {
			// Chaning some basic controller settings in backpack!
			fabric.Object.prototype.set({
				cornerColor: '#ffffff',
				cornerStyle: 'circle',
				borderColor: '#3b82f6',
				borderScaleFactor: 1.5,
				transparentCorners: false,
				borderOpacityWhenMoving: 1,
				cornerStrokeColor: '#3b82f6',
			});

			// Basic Canvas
			const initialWorkspace = new fabric.Rect({
				width: 900,
				height: 1200,
				name: 'clip', // can use it autorize observerer
				fill: 'white',
				hasControls: false,
				selectable: false,
				shadow: new fabric.Shadow({
					color: 'rgba(0,0,0,.4)',
					blur: 5,
				}),
			});

			initialCanvas.setWidth(initialContainer.offsetWidth);
			initialCanvas.setHeight(initialContainer.offsetHeight);

			initialCanvas.add(initialWorkspace);
			initialCanvas.centerObject(initialWorkspace);
			initialCanvas.clipPath = initialWorkspace;

			setCanvas(initialCanvas);
			setContainer(initialContainer);

			const currentState = JSON.stringify(initialCanvas.toJSON(JSON_KEYS));

			canvasHistory.current = [currentState];
		},

		[canvasHistory],
	);

	return { init, editor };
};

// ^ Build Editor Function
function buildEditor({
	autoZoom,
	canvas,
	fillColor,
	setFillColor,
	strokeColor,
	setStrokeColor,
	strokeWidth,
	setStrokeWidth,
	selectedObjects,
	strokeDashArray,
	setStrokeDashArray,
	fontFamily,
	setFontFamily,
	copy,
	paste,
	save,
	canUndo,
	canRedo,
	undo,
	redo,
}: BuildEditorProps): Editor {
	const generateSaveOptions = () => {
		const { width, height, left, top } = getWorkspace() as fabric.Rect;

		return {
			name: 'Image',
			format: 'png',
			quality: 1,
			width,
			height,
			left,
			top,
		};
	};

	const savePng = () => {
		const options = generateSaveOptions();

		canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
		const dataUrl = canvas.toDataURL(options);

		downloadFile(dataUrl, 'png');
		autoZoom();
	};

	const saveSvg = () => {
		const options = generateSaveOptions();

		canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
		const dataUrl = canvas.toDataURL(options);

		downloadFile(dataUrl, 'svg');
		autoZoom();
	};

	const saveJpg = () => {
		const options = generateSaveOptions();

		canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
		const dataUrl = canvas.toDataURL(options);

		downloadFile(dataUrl, 'jpg');
		autoZoom();
	};

	const saveJson = async () => {
		const dataUrl = canvas.toJSON(JSON_KEYS);

		await transformText(dataUrl.objects);
		const fileString = `data:text/json;charset=utf-8,${encodeURIComponent(
			JSON.stringify(dataUrl, null, '\t'),
		)}`;
		downloadFile(fileString, 'json');
	};

	const loadJson = (json: string) => {
		const data = JSON.parse(json);

		canvas.loadFromJSON(data, () => {
			autoZoom();
		});
	};
	const getWorkspace = () => {
		return canvas.getObjects().find((obj) => obj.name === 'clip');
	};
	const center = (object: fabric.Object) => {
		const workspace = getWorkspace();
		const center = workspace?.getCenterPoint();

		if (!center) return;

		// @ts-ignore
		canvas._centerObject(object, center);
	};

	const addToCanvas = (object: fabric.Object) => {
		center(object);
		canvas.add(object);
		canvas.setActiveObject(object); // Select the object on adding
	};

	return {
		// ! Add Methods

		// Saving
		saveJpg,
		saveJson,
		savePng,
		saveSvg,
		loadJson,

		canUndo,
		canRedo,
		autoZoom,
		zoomIn: () => {
			let zoomRatio = canvas.getZoom();
			zoomRatio += 0.05;
			const center = canvas.getCenter();
			canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoomRatio);
		},
		zoomOut: () => {
			let zoomRatio = canvas.getZoom();
			zoomRatio -= 0.05;
			const center = canvas.getCenter();
			canvas.zoomToPoint(
				new fabric.Point(center.left, center.top),
				zoomRatio < 0.2 ? 0.2 : zoomRatio,
			);
		},
		// Zoom IN
		// Zoom Out

		// Get Workspace
		getWorkspace,
		// Size
		changeSize: (value: { width: number; height: number }) => {
			const worskpace = getWorkspace();
			worskpace?.set(value);
			autoZoom();
			save();
		},
		// Background
		changeBackground: (value: string) => {
			const workspace = getWorkspace();
			workspace?.set({ fill: value });
			canvas.renderAll();
			save();
		},
		// Drawing Mode
		enableDrawingMode: () => {
			canvas.discardActiveObject();
			canvas.renderAll();
			canvas.isDrawingMode = true;
			canvas.freeDrawingBrush.width = strokeWidth;
			canvas.freeDrawingBrush.color = strokeColor;
		},
		disableDrawingMode: () => {
			console.log('Disabling');

			canvas.isDrawingMode = false;
		},

		// Undo and Redo
		onUndo: () => undo(),
		onRedo: () => redo(),

		// Copy and Paste
		onCopy: () => copy(),
		onPaste: () => paste(),

		// Filter
		changeImageFilter: (value: string) => {
			const objects = canvas.getActiveObjects();
			objects.forEach((object) => {
				if (object.type === 'image') {
					const imageObject = object as fabric.Image;
					const effect = createFilter(value);
					imageObject.filters = effect ? [effect] : [];
					imageObject.set({});
					imageObject.applyFilters();
					canvas.renderAll();
				}
			});
		},

		// Add Image
		addImage: (url: string) => {
			fabric.Image.fromURL(
				url,
				(img) => {
					const workspace = getWorkspace();
					img.scaleToHeight(workspace?.height || 0);
					img.scaleToWidth(workspace?.width || 0);

					addToCanvas(img);
				},
				{
					crossOrigin: 'anonymous',
				},
			);
		},

		// Delete Selected Objects
		delete: () => {
			canvas.getActiveObjects().forEach((object) => {
				canvas.remove(object);
			});

			// clear on click delete or backspace btn

			canvas.discardActiveObject();
			canvas.renderAll();
		},
		// Fill Color
		changeFontFamily: (value: string) => {
			setFontFamily(value); //form useState
			canvas.getActiveObjects().forEach((object) => {
				if (isTextType(object.type)) {
					object._set('fontFamily', value); //TODO Maybe bug
				}
			});
		},

		addText: (value, options) => {
			const object = new fabric.Textbox(value, {
				...TEXT_OPTIONS,
				fill: fillColor,
				...options,
			});
			addToCanvas(object);
		},

		getActiveOpacity: () => {
			const selectedObject = selectedObjects[0];

			if (!selectedObject) return 1;

			const value = selectedObject.get('opacity') || 1;
			return value;
		},

		// Chaange FOnt Weight
		changeFontWeight: (value: number) => {
			canvas.getActiveObjects().forEach((object) => {
				if (isTextType(object.type)) {
					// @ts-ignore
					object.set({ fontWeight: value });
				}
			});
			canvas.renderAll();
		},

		changeFontStyle: (value: string) => {
			canvas.getActiveObjects().forEach((object) => {
				if (isTextType(object.type)) {
					// @ts-ignore
					object.set({ fontStyle: value });
				}
			});
			canvas.renderAll();
		},
		getActiveFontStyle: () => {
			const selectedObject = selectedObjects[0];
			if (!selectedObject) return 'normal';
			// @ts-ignore
			const value = selectedObject.get('fontStyle') || 'normal';
			return value;
		},
		changeFontLineThrough: (value: boolean) => {
			canvas.getActiveObjects().forEach((object) => {
				if (isTextType(object.type)) {
					// @ts-ignore
					object.set({ linethrough: value });
				}
			});
			canvas.renderAll();
		},
		getActiveFontLineThrough: () => {
			const selectedObject = selectedObjects[0];
			if (!selectedObject) return false;
			// @ts-ignore
			const value = selectedObject.get('linethrough') || false;
			return value;
		},
		changeFontUnderline: (value: boolean) => {
			canvas.getActiveObjects().forEach((object) => {
				if (isTextType(object.type)) {
					// @ts-ignore
					object.set({ underline: value });
				}
			});
			canvas.renderAll();
		},
		getActiveFontUnderline: () => {
			const selectedObject = selectedObjects[0];
			if (!selectedObject) return false;
			// @ts-ignore
			const value = selectedObject.get('underline') || false;
			return value;
		},

		/**
		 * Alginment
		 **/

		changeTextAlign: (value: ITextboxOptions['textAlign']) => {
			canvas.getActiveObjects().forEach((object) => {
				if (isTextType(object.type)) {
					// @ts-ignore
					object.set({ textAlign: value });
				}
			});
			canvas.renderAll();
		},
		getActiveTextAlign: () => {
			const selectedObject = selectedObjects[0];
			if (!selectedObject) return 'left';
			// @ts-ignore
			const value = selectedObject.get('textAlign') || 'left';
			return value;
		},
		/**
		 * Font Size
		 **/

		changeFontSize: (value: number) => {
			canvas.getActiveObjects().forEach((object) => {
				if (isTextType(object.type)) {
					// @ts-ignore
					object.set({ fontSize: value });
				}
			});
			canvas.renderAll();
		},
		getActiveFontSize: () => {
			const selectedObject = selectedObjects[0];
			if (!selectedObject) return FONT_SIZE;
			// @ts-ignore
			const value = selectedObject.get('fontSize') || FONT_SIZE;
			return value;
		},

		//  Change Opacity of Object, Stroke
		changeOpacity: (value: number) => {
			canvas.getActiveObjects().forEach((object) => {
				object.set({ opacity: value });
			});
			canvas.renderAll();
		},

		bringForward: () => {
			canvas.getActiveObjects().forEach((object) => {
				canvas.bringForward(object);
				canvas.renderAll();

				// Fix workspace overflow
				const workspace = getWorkspace();
				workspace?.sendToBack();
			});
		},
		sendBackward: () => {
			canvas.getActiveObjects().forEach((object) => {
				canvas.sendBackwards(object);
				canvas.renderAll();

				// Fix workspace overflow
				const workspace = getWorkspace();
				workspace?.sendToBack();
			});
		},

		// Fill Color
		changeFillColor: (value: string) => {
			setFillColor(value); //form useState
			canvas.getActiveObjects().forEach((object) => {
				object.set({ fill: value });
			});

			canvas.renderAll();
		},
		// Stroke Width
		changeStrokeWidth: (value: number) => {
			setStrokeWidth(value); //form useState
			canvas.getActiveObjects().forEach((object) => {
				object.set({ strokeWidth: value });
			});
			canvas.freeDrawingBrush.width = value;
			canvas.renderAll();
		},
		// Stroke Dash
		changeStrokeDashArray: (value: number[]) => {
			setStrokeDashArray(value); //form useState
			canvas.getActiveObjects().forEach((object) => {
				object.set({ strokeDashArray: value });
			});
			canvas.renderAll();
		},
		// Stroke Color
		changeStrokeColor: (value: string) => {
			setStrokeColor(value); //form useState
			canvas.getActiveObjects().forEach((object) => {
				if (isTextType(object.type)) {
					object.set({ fill: value });
					return;
				}
				object.set({ stroke: value });
			});

			canvas.freeDrawingBrush.color = value;

			canvas.renderAll();
		},

		// Circle
		addCircle: () => {
			const object = new fabric.Circle({
				...CIRCLE_OPTIONS,
				fill: fillColor,
				stroke: strokeColor,
				strokeWidth: strokeWidth,
				strokeDashArray: strokeDashArray,
			});
			addToCanvas(object);
		},
		// Rounded Rectangle
		addSoftRectangle: () => {
			const object = new fabric.Rect({
				...RECTANGLE_OPTIONS,
				rx: 50, //border-radius
				ry: 50, //border-radius
				fill: fillColor,
				stroke: strokeColor,
				strokeWidth: strokeWidth,
				strokeDashArray: strokeDashArray,
			});

			addToCanvas(object);
		},
		// Sharp Rectangle
		addRectangle: () => {
			const object = new fabric.Rect({
				...RECTANGLE_OPTIONS,
				fill: fillColor,
				stroke: strokeColor,
				strokeWidth: strokeWidth,
				strokeDashArray: strokeDashArray,
			});

			addToCanvas(object);
		},

		// Triangle
		addTriangle: () => {
			const object = new fabric.Triangle({
				...TRIANGLE_OPTIONS,
				fill: fillColor,
				stroke: strokeColor,
				strokeWidth: strokeWidth,
				strokeDashArray: strokeDashArray,
			});

			addToCanvas(object);
		},

		// Inverse Triangle
		addInverseTriangle: () => {
			const HEIGHT = TRIANGLE_OPTIONS.height;
			const WIDTH = TRIANGLE_OPTIONS.width;
			const object = new fabric.Polygon(
				[
					// Matrix of the triangle
					{ x: 0, y: 0 },
					{ x: WIDTH, y: 0 },
					{ x: WIDTH / 2, y: HEIGHT },
				],
				{
					...TRIANGLE_OPTIONS,
					fill: fillColor,
					stroke: strokeColor,
					strokeWidth: strokeWidth,
					strokeDashArray: strokeDashArray,
				},
			);

			addToCanvas(object);
		},
		addDiamond: () => {
			const HEIGHT = DIAMOND_OPTIONS.height;
			const WIDTH = DIAMOND_OPTIONS.width;
			const object = new fabric.Polygon(
				[
					// Matrix of the triangle
					{ x: WIDTH / 2, y: 0 },
					{ x: WIDTH, y: HEIGHT / 2 },
					{ x: WIDTH / 2, y: HEIGHT },
					{ x: 0, y: HEIGHT / 2 },
				],
				{
					...DIAMOND_OPTIONS,
					fill: fillColor,
					stroke: strokeColor,
					strokeWidth: strokeWidth,
					strokeDashArray: strokeDashArray,
				},
			);

			addToCanvas(object);
		},

		// fillColor,
		// get active Fill Color
		getActiveFillColor: () => {
			const selectedObject = selectedObjects[0];

			if (!selectedObject) return fillColor;
			const value = selectedObject.get('fill') || fillColor;

			// Currently gradient and pattern are not supported
			return value as string;
		},
		getActiveStrokeColor: () => {
			const selectedObject = selectedObjects[0];

			if (!selectedObject) return strokeColor;
			const value = selectedObject.get('stroke') || strokeColor;

			// Currently gradient and pattern are not supported
			return value;
		},

		// Active Font
		getActiveFontFamily: () => {
			const selectedObject = selectedObjects[0];

			if (!selectedObject) return fontFamily;
			// @ts-ignore
			const value = selectedObject.get('fontFamily') || fontFamily;

			// Currently gradient and pattern are not supported
			return value;
		},
		getActiveFontWeight: () => {
			const selectedObject = selectedObjects[0];

			if (!selectedObject) return FONT_WEIGHT;
			// @ts-ignore
			const value = selectedObject.get('fontWeight') || FONT_WEIGHT;

			// Currently gradient and pattern are not supported
			return value;
		},

		// Stroke Width
		getActiveStrokeWidth: () => {
			const selectedObject = selectedObjects[0];

			if (!selectedObject) return strokeWidth;
			const value = selectedObject.get('strokeWidth') || strokeWidth;

			// Currently gradient and pattern are not supported
			return value;
		},
		// Stroke Width
		getActiveStrokeDashArray: () => {
			const selectedObject = selectedObjects[0];

			if (!selectedObject) return strokeDashArray;
			const value = selectedObject.get('strokeDashArray') || strokeDashArray;

			// Currently gradient and pattern are not supported
			return value;
		},
		selectedObjects,
		canvas,
	};
}
