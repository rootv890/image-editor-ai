import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { auth } from '@/auth';
export default async function Home() {
	const session = await auth();
	return (
		<main className="">
			<Button>
				<Link href={'/editor/123'}>Editor 123</Link>
			</Button>

			<div>{JSON.stringify(session)}</div>
		</main>
	);
}
