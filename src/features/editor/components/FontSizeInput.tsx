import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';

interface FontSizeInputProps {
	value: number;
	onChange: (value: number) => void;
}

function FontSizeInput({ value, onChange }: FontSizeInputProps) {
	const incrment = () => {
		onChange(value + 1);
	};
	const decrement = () => {
		onChange(value - 1);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value, 10);
		onChange(value);
	};

	return (
		<div className="flex items-center justify-center">
			<Button variant={'outline'} className="  p-2 rounded-r-none border-r-0">
				<Minus className="size-4" onClick={decrement} />
			</Button>
			<Input
				onChange={handleChange}
				value={value}
				type="number"
				className="w-[50px] h-8 focus-visible:ring-offset-0 focus-visible:ring-0 resize-none"
			/>
			<Button variant={'outline'} className="  p-2 rounded-l-none border-l-0">
				<Plus className="size-4" onClick={incrment} />
			</Button>
		</div>
	);
}

export default FontSizeInput;
