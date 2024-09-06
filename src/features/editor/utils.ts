import { RGBColor } from 'react-color';

export function isTextType(type: string | undefined): boolean {
	return type === 'text' || type === 'i-text' || type === 'textbox';
}

export function rgbaObjecttToString(rgba: RGBColor | 'transparent') {
	if (rgba === 'transparent') return 'rgba(0,0,0,0)';
	const alpha = rgba.a === undefined ? 1 : rgba.a;
	return `rgba(${rgba.r},${rgba.g},${rgba.b},${alpha})`;
}
