import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
	return (
		<main className="">
			<Button>
				<Link href={'/editor/123'}>Editor 123</Link>
			</Button>
		</main>
	);
}
