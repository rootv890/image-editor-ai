'use client';
import { useGetTemplates, ResponseType } from "@/features/projects/api/use-get-templates";
import { SectionHeader } from "./ProjectsSection";
import { Loader2Icon, TriangleAlertIcon } from "lucide-react";
import TemplateCard from "./TemplateCard";
import { useCreateProject } from "@/features/projects/api/use-create-project";
import { useRouter } from "next/navigation";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";

const TemplatesSection = () =>
{
    const { shouldBlock, triggerPaywall } = usePaywall();
    const mutation = useCreateProject();
    const router = useRouter();
    const { data, isLoading, isError } = useGetTemplates( { page: '1', limit: '4' } );

    const onClick = ( template: ResponseType[ 'data' ][ 0 ] ) =>
    {
        if ( template.isPro && shouldBlock )
        {
            triggerPaywall();
            return;
        }

        mutation.mutate( {
            name: `${template.name} project`,
            json: template.json,
            width: template.width,
            height: template.height
        },

            {
                onSuccess: ( { data } ) =>
                {
                    router.push( `/editor/${data.id}` );

                }
            }

        );
    };

    if ( isLoading )
    {
        return (
            <div className="space-y-4 flex items-center justify-center h-32 ">
                <Loader2Icon className="size-12 text-muted-foreground animate-spin" />
            </div>
        );
    };
    if ( isError ) return (
        <div className="space-y-4 flex flex-col  items-center justify-center h-32 ">
            <TriangleAlertIcon className="size-12 text-muted-foreground " />
            <p>
                Failed to Templates...
            </p>
        </div>
    );

    if ( !data?.length )
    {
        return null;
    }

    console.log( data );
    return (
        <div>
            <SectionHeader title="Templates" />

            <div className="grid grid-cols-2 md:grid-cols-4 mt-4 gap-4" >
                {data?.map( ( template ) => (
                    <TemplateCard
                        key={template.id}
                        title={template.name}
                        imageSrc={template.thumbnail || ''}
                        disabled={false}
                        onClick={() => onClick( template )}
                        description={`${template.width} x ${template.height}px`}
                        width={template.width}
                        height={template.height}
                        isPro={template.isPro}
                    />
                ) )}
            </div>
        </div>
    );
};

export default TemplatesSection;
