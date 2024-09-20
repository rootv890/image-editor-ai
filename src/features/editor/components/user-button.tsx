'use client'
import { Avatar,AvatarImage,AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu } from "@/components/ui/dropdown-menu"
import { getInitials } from "@/lib/utils"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CreditCard, Loader, LogOut } from "lucide-react"
import { useSession,signOut } from "next-auth/react"

function UserButton() {
    const session = useSession()
    if (session.status === 'loading') {
        return <Loader className="size-4 animate-spin text-muted-foreground" />
    }

    if (session.status === 'unauthenticated' || !session.data) {
        return null
    }
    const name =  session.data.user?.name!
    const imageUrl = session.data.user?.image
    return (
        <DropdownMenu modal={false} >
            <DropdownMenuTrigger>
                {/* TODO: Crown for Premium User */}
                <Avatar className="size-10 hover:opacity-75 transition" >
                    <AvatarImage alt={name} src={imageUrl || ''} />
                    <AvatarFallback className="bg-blue-500 h-full w-full flex justify-center items-center font-medium text-white ">
                        {getInitials(name)}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end"
            className="w-60 z-50
            ">
                <DropdownMenuItem
                disabled={false}
                onClick={()=>{}}
                className="h-10">
                <CreditCard className="size-4 mr-2"/>
                Billing
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                 <DropdownMenuItem
                disabled={false}
                onClick={()=>signOut()}
                className="h-10">
                <LogOut className="size-4 mr-2"/>
                Logout
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserButton
