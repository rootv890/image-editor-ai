import UserButton from "@/features/editor/components/user-button"

type Props = {}

export default function Navbar({}: Props) {
  return (
    <nav className="w-full flex items-center p-4 h-[68px] ">
        <div className="ml-auto">
            <UserButton/>
        </div>
    </nav>
  )
}
