import { ChromePicker, CirclePicker } from 'react-color';
import { colors } from '../types';
import { rgbaObjecttToString } from '../utils';

interface ColorPickerProps {
	value: string;
	onChange: (value: string) => void;
}

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
	return (
		<div className="w-full space-y-4">
			<ChromePicker
				color={value}
				className="border rounded-lg"
				onChange={(color) => {
					const formattedValue = rgbaObjecttToString(color.rgb);
					onChange(formattedValue);
				}}
			/>
			<CirclePicker
				color={value}
				colors={colors}
				onChange={(color) => {
					const formattedValue = rgbaObjecttToString(color.rgb);
					onChange(formattedValue);
				}}
			/>
		</div>
	);
};
