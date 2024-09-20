import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkle, Sparkles } from "lucide-react"

type Props = {}

export default function Banner({}: Props) {
  return (
    <div className="aspect-[5/1] min-h-[248px] flex gap-x-6 items-center p-6 rounded-xl bg-gradient-to-r from-[#2e62cb] via-[#0073ff] to-[#31aff5]">
        <div className="rounded-full size-28 lg:flex items-center justify-center bg-white/50  hidden md:flex">
            <div className="rounded-full size-20 flex items-center justify-center bg-white">
                <Sparkles  size={32} className="h-20 text-[#0073ff] fill-[#0073ff]"/>
            </div>
        </div>
        <div className="flex flex-col gap-y-3 text-white">
                <h1 className="text-xl md:text-4xl font-semibold">
                    Visualize your ideas with AI
                </h1>
                <p className=" text-xs  md:text-sm mb-2">
                    Turn inspiration into design in no time!.
                </p>
                <Button variant={'secondary' } className="w-[160px]">
                    Start Creating <ArrowRight className="size-4 ml-2"/>
                </Button>

        </div>
    </div>
  )
}
