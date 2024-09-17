import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
import Discord from 'next-auth/providers/discord';
import Google from 'next-auth/providers/google';
import { DrizzleAdapter } from '@auth/drizzle-adapter';

import { db } from '@/db/drizzle';
import { users } from 'unsplash-js/dist/internals';

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: DrizzleAdapter(db),
	providers: [Github, Discord, Google],
	pages: {
		signIn: '/sign-in',
		error: '/sign-in',
	},
});
