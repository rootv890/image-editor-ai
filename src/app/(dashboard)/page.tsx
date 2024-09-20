import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { protectServer } from '@/features/auth/utils';
import { auth } from '@/auth';
import Banner from './Banner';
export default async function Home() {
	await protectServer();
	const session = await auth()
	return (
		<main className="flex flex-col space-y-6 max-w-screen-xl mx-auto pb-10">
            <Banner/>
		</main>
	);
}
