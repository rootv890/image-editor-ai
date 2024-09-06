'use client';

import { QueryProvider } from './query-provider';

interface ProviderProps {
	children: React.ReactNode;
}

export const Providers = ({ children }: ProviderProps) => {
	return <QueryProvider>{children}</QueryProvider>;
};
