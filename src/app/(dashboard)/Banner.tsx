'use client';
import { Button } from "@/components/ui/button";
import { useCreateProjects } from "@/features/projects/api/use-create-project";
import { ArrowRight, Sparkle, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";



type Props = {};

export default function Banner ( { }: Props )
{
    const router = useRouter();
    const mutation = useCreateProjects();

    const onClick = () =>
    {
        console.log( 'This is working' );
        mutation.mutate( {
            name: 'Untitled Project',
            json: '',
            width: 900,
            height: 1200
        }, {
            onSuccess: ( { data } ) =>
            {
                console.log( 'Success ', data.id );

                router.push( `/editor/${data.id}` );
            },
            onError: ( err ) =>
            {
                console.log( 'Something Error', err );
            }
        },

        );
    };

    return (
        <div className="aspect-[5/1] min-h-[248px] flex gap-x-6 items-center p-6 rounded-xl bg-gradient-to-r from-[#2e62cb] via-[#0073ff] to-[#31aff5]">
            <div className="rounded-full size-28 lg:flex items-center justify-center bg-white/50  hidden md:flex">
                <div className="rounded-full size-20 flex items-center justify-center bg-white">
                    <Sparkles size={32} className="h-20 text-[#0073ff] fill-[#0073ff]" />
                </div>
            </div>
            <div className="flex flex-col gap-y-3 text-white">
                <h1 className="text-xl md:text-4xl font-semibold">
                    Visualize your ideas with AI
                </h1>
                <p className=" text-xs  md:text-sm mb-2">
                    Turn inspiration into design in no time!.
                </p>
                <Button
                    disabled={mutation.isPending}
                    onClick={onClick}
                    variant={'secondary'} className="w-[160px]">
                    Start Creating <ArrowRight className="size-4 ml-2" />
                </Button>

            </div>
        </div>
    );
}
