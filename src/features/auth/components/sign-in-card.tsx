'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { FaDiscord, FaGithub } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';
function SignInCard() {
	const onProviderSignIn = (provider: 'google' | 'github' | 'discord') => {
		signIn(provider, { callbackUrl: '/' });
	};

	return (
		<section className="flex items-center justify-center h-screen ">
			<div
				className="absolute inset-0"
				style={{
					// zIndex: -3,
					// backgroundColor: 'black',
					// opacity: 0.3,
					background: 'linear-gradient(180deg, rgba(0,0,0,0.8), rgba(0,0,0,0.4),rgba(0,0,0,0.8))',
				}}
			/>
			<div
				className="absolute inset-0"
				style={{
					backgroundImage: `url('/signin.jpeg')`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',

					// filter: 'blur(6px)',
					zIndex: -4,
				}}
			/>
			<Card
				className="p-8 border-none shadow-lg max-md:mb-40   mx-auto flex justify-center flex-col items-center lg:h-fit   "
				style={{
					background: 'rgba(244,244,244, 0.8)',
					backdropFilter: 'blur(14px)',
				}}
			>
				<CardHeader className="px-0 pt-0 text-center flex items-center justify-center flex-col  ">
					<CardTitle>Login to Continue</CardTitle>
					<CardDescription>Use your emaill or another service to continue</CardDescription>
				</CardHeader>

				<CardContent className="space-y-5 px-0 pb-0">
					<div className="space-y-2.5 flex flex-col w-fit">
						<Button
							onClick={() => onProviderSignIn('github')}
							className="flex gap-3 items-center justify-center  text-sm px-8 py-6 rounded-full shadow-inner"
							variant={'outline'}
						>
							<FaGithub size={24} className="text-[#24292e]" /> Continue with Github
						</Button>
						<Button
							className="flex gap-3 items-center justify-center text-sm px-8 py-6 rounded-full  shadow-inner "
							variant={'outline'}
							onClick={() => onProviderSignIn('discord')}
						>
							<FaDiscord className="text-[#7289da]" size={24} /> Continue with Discord
						</Button>
						<Button
							className="flex gap-3 items-center justify-center text-sm px-8 py-6 rounded-full shadow-inner "
							variant={'outline'}
							onClick={() => onProviderSignIn('google')}
						>
							<FcGoogle size={24} /> Continue with Google
						</Button>
					</div>
					<div className="flex items-center justify-center">
						<p className="text-sm text-muted-foreground">Don&apos;t have an Account?</p>
						<Link href="/sign-up">
							<span className="text-blue-500 hover:underline">Sign Up</span>
						</Link>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}

export default SignInCard;
