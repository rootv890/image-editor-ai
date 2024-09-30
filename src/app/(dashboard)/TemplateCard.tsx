import { cn } from "@/lib/utils";
import { CrownIcon } from "lucide-react";
import Image from "next/image";
import { string } from "zod";

interface TemplateCardProps
{
    imageSrc: string;
    title: string;
    onClick: () => void;
    disabled?: boolean;
    description: string;
    width: number;
    height: number;
    isPro: boolean | null;

}
const TemplateCard = ( { imageSrc, title, onClick, disabled, description, height, width, isPro }: TemplateCardProps ) =>
{
    return (
        <button onClick={onClick} disabled={disabled}
            className={cn( 'space-y-2 group text-left transition flex flex-col', disabled ? 'cursor-not-allowed opacity-75' : 'cursor-pointer' )}
        >
            <div
                style={{
                    aspectRatio: `${width}/${height}`
                }}

                className="relative rounded-xl   h-64">
                <Image className="object-cover transition transform group-hover:scale-105 rounded-xl" fill src={imageSrc} alt={`${title}`} />
                {isPro && (
                    <div className="absolute top-2 right-2 w-10 h-10  flex items-center justify-center bg-black/50 rounded-full -z[10]">
                        <CrownIcon className="size-5 from-yellow-500 text-yellow-500" />

                    </div>


                )}
                <div className="opacity-0 group-hover:opacity-100 transition inset-0 absolute bg-black/50 rounded-xl justify-center items-center backdrop-filter backdrop-blur-sm w-full group-hover:scale-105 h-full">
                    <p className="text-white font-medium"> Open in Editor</p>
                </div>
            </div>

            <div className="space-y-1 ">
                <p className="text-sm font-medium "
                >{title}</p>

                <p className="text-muted-foreground text-xs opacity-0 group-hover:opacity-75 transition">{description}</p>
            </div>
        </button>
    );
};

export default TemplateCard;
