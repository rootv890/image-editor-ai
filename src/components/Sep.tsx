import { Separator } from "./ui/separator"

const Sep = () => {
  return (
    <div className="flex w-full text-slate-300 justify-center items-center gap-3 overflow-hidden">
            <Separator className="!bg-slate-500" />
            or
            <Separator className="!bg-slate-500" />
</div>
  )
}

export default Sep
