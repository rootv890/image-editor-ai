import Logo from "./Logo";
import SidebarRoutes from "./SidebarRoutes";

type Props = {};

export default function Sidebar ( { }: Props )
{
    return (
        <aside className="hidden lg:flex fixed flex-col w-[300px] left-0 shrink-0 h-full">
            <Logo />
            <SidebarRoutes />
        </aside>
    );
}
