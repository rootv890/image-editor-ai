import { fabric } from 'fabric';
import { ITextboxOptions } from 'fabric/fabric-impl';

import * as material from 'material-colors';

export const JSON_KEYS = [
    'name',
    'gradientAngle',
    'selectable',
    'hasControls',
    'linkData',
    'editable',
    'extensionType',
    'extension',
];

export const fonts = [
    'Arial',
    'Arial Black',
    'Verdana',
    'Helvetica',
    'Tahoma',
    'Trebuchet MS',
    'Times New Roman',
    'Georgia',
    'Garamond',
    'Courier New',
    'Brush Script MT',
    'Palatino',
    'Bookman',
    'Comic Sans MS',
    'Impact',
    'Lucida Sans Unicode',
    'Geneva',
    'Lucida Console',
];

export const filters = [
    'none',
    'polaroid',
    'sepia',
    'kodachrome',
    'contrast',
    'brightness',
    'greyscale',
    'brownie',
    'vintage',
    'technicolor',
    'pixelate',
    'invert',
    'blur',
    'sharpen',
    'emboss',
    'removecolor',
    'blacknwhite',
    'vibrance',
    'blendcolor',
    'huerotate',
    'resize',
    'saturation',
    'gamma',
];

export const selectionDependentTools = [
    'fill',
    'font',
    'stroke-color',
    'stroke-width',
    'opacity',
    'filter',
    'remove-bg',
];

export type ActiveTool =
    | 'select'
    | 'shapes'
    | 'text'
    | 'images'
    | 'draw'
    | 'fill'
    | 'stroke-color'
    | 'stroke-width'
    | 'font'
    | 'opacity'
    | 'filter'
    | 'settings'
    | 'ai'
    | 'remove-bg'
    | 'templates';

export const FILL_COLOR = 'rgba(0, 0, 0, 1)';
export const STROKE_COLOR = 'rgba(0, 0, 0, 1)';
export const STROKE_WIDTH = 2;
export const STROKE_DASH_ARRAY = [];
export const FONT_FAMILY = 'Arial';
export const FONT_WEIGHT = 400;
export const FONT_SIZE = 32;

export const TEXT_OPTIONS = {
    type: 'textbox',
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    fontSize: FONT_SIZE,
    fontFamily: FONT_FAMILY,
};

export const CIRCLE_OPTIONS = {
    radius: 225,
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
};

export const RECTANGLE_OPTIONS = {
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
    width: 400,
    height: 400,
    angle: 0,
};

export const TRIANGLE_OPTIONS = {
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
    width: 400,
    height: 400,
    angle: 0,
};

export const DIAMOND_OPTIONS = {
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
    width: 600,
    height: 600,
    angle: 0,
};

export type BuildEditorProps = {
    canvas: fabric.Canvas;
    fillColor: string;
    setFillColor: ( color: string ) => void;
    strokeColor: string;
    setStrokeColor: ( color: string ) => void;
    strokeWidth: number;
    setStrokeWidth: ( width: number ) => void;
    selectedObjects: fabric.Object[];
    strokeDashArray: number[];
    setStrokeDashArray: ( value: number[] ) => void;
    fontFamily: string;
    setFontFamily: ( value: string ) => void;
    copy: () => void;
    paste: () => void;
    autoZoom: () => void;
    save: ( skip?: boolean ) => void;
    undo: () => void;
    redo: () => void;
    canUndo: () => boolean;
    canRedo: () => boolean;
};

// ^ EDITOR
export interface Editor
{
    addCircle: () => void;
    addSoftRectangle: () => void;
    addRectangle: () => void;
    addTriangle: () => void;
    addInverseTriangle: () => void;
    addDiamond: () => void;

    // Save and load
    saveJpg: () => void;
    saveJson: () => void;
    savePng: () => void;
    saveSvg: () => void;
    loadJson: ( json: string ) => void;

    onCopy: () => void;
    onPaste: () => void;

    onUndo: () => void;
    onRedo: () => void;
    canUndo: () => boolean;
    canRedo: () => boolean;

    enableDrawingMode: () => void;
    disableDrawingMode: () => void;

    changeFillColor: ( value: string ) => void;
    changeStrokeColor: ( value: string ) => void;
    changeStrokeWidth: ( value: number ) => void;
    changeStrokeDashArray: ( value: number[] ) => void;
    changeFontWeight: ( value: number ) => void;
    changeFontStyle: ( value: string ) => void;
    changeFontLineThrough: ( value: boolean ) => void;
    changeFontUnderline: ( value: boolean ) => void;
    changeTextAlign: ( value: ITextboxOptions[ 'textAlign' ] ) => void;
    changeFontSize: ( value: number ) => void;
    changeImageFilter: ( value: string ) => void;
    changeSize: ( value: { width: number; height: number; } ) => void;
    changeBackground: ( value: string ) => void;

    // fillColor: string;
    getActiveFillColor: () => string;
    getActiveStrokeColor: () => string;
    getActiveStrokeWidth: () => number;
    getActiveStrokeDashArray: () => number[];
    getActiveFontFamily: () => string;
    getActiveFontWeight: () => number;
    getActiveFontStyle: () => string;
    getActiveFontLineThrough: () => void;
    getActiveFontUnderline: () => void;
    getActiveTextAlign: () => ITextboxOptions[ 'textAlign' ];
    getActiveFontSize: () => number;

    getWorkspace: () => fabric.Object | undefined;

    delete: () => void;
    addImage: ( url: string ) => void;

    canvas: fabric.Canvas;
    selectedObjects: fabric.Object[];

    // Zooming
    zoomIn: () => void;
    zoomOut: () => void;
    autoZoom: () => void;

    // Layering
    bringForward: () => void;
    sendBackward: () => void;

    // Opacity
    changeOpacity: ( value: number ) => void;
    getActiveOpacity: () => void;

    // Text
    addText: ( value: string, options?: ITextboxOptions ) => void;
    changeFontFamily: ( value: string ) => void;
}
export const colors = [
    material.red[ '500' ],
    material.pink[ '500' ],
    material.purple[ '500' ],
    material.deepPurple[ '500' ],
    material.indigo[ '500' ],
    material.blue[ '500' ],
    material.lightBlue[ '500' ],
    material.cyan[ '500' ],
    material.teal[ '500' ],
    material.green[ '500' ],
    material.lightGreen[ '500' ],
    material.lime[ '500' ],
    material.yellow[ '500' ],
    material.amber[ '500' ],
    material.orange[ '500' ],
    material.deepOrange[ '500' ],
    material.brown[ '500' ],
    material.blueGrey[ '500' ],
    'transparent',
];

export interface EditorHookProps
{
    defaultState?: string;
    defaultWidth?: number;
    defaultHeight?: number;
    clearSelectionCallback?: () => void;
    saveCallback?: ( values: {
        json: string;
        height: number;
        width: number;
    } ) => void;
}
