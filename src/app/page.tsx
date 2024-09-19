import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { protectServer } from '@/features/auth/utils';
import { auth } from '@/auth';
export default async function Home() {
	await protectServer();
	const session = await auth()
	return (
		<main className="">
			<Button>
				<Link href={'/editor/123'}>Editor 123</Link>
			</Button>

			<div>You are logged IN</div>
			<p>
			{JSON.stringify(session)}
			</p>
		</main>
	);
}
