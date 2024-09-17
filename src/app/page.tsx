import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { protectServer } from '@/features/auth/utils';
export default async function Home() {
	await protectServer();
	return (
		<main className="">
			<Button>
				<Link href={'/editor/123'}>Editor 123</Link>
			</Button>

			<div>You are logged IN</div>
		</main>
	);
}
