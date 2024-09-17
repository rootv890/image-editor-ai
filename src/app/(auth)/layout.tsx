interface AuthLayoutProps {
	children: React.ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
	return <div className="w-full items-center justify-center h-screen">{children}</div>;
}

export default AuthLayout;
