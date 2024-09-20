type Props = {}
import { Space_Grotesk } from "next/font/google"
import {cn} from '@/lib/utils'
import Image from "next/image"

const font = Space_Grotesk({
    weight:['500'],
    subsets: ['latin']

})

export default function Logo({}: Props) {
  return (
    <div className="flex  items-center gap-x-2 hover:opacity-75 transition h-[68px] px-4 cursor-pointer">
        <div className="size-8 relative">
            <Image src='./logo.svg' alt='Canva Clone' fill className="object-center"/>
        </div>
        <h1>Canva Clone</h1>
    </div>
  )
}
