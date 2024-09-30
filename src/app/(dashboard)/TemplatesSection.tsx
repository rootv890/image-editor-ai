'use client';
import { useGetTemplates } from "@/features/projects/api/use-get-templates";
import { SectionHeader } from "./ProjectsSection";
import { Loader2Icon, TriangleAlertIcon } from "lucide-react";
import TemplateCard from "./TemplateCard";
import { useCreateProject } from "@/features/projects/api/use-create-project";
import { useRouter } from "next/navigation";

const TemplatesSection = () =>
{

    const mutation = useCreateProject();
    const router = useRouter();
    const { data, isLoading, isError } = useGetTemplates( { page: '1', limit: '4' } );

    const onClick = ( template ) =>
    {
        // TODO : Check if template is PRO

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

    if ( !data.length )
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
                        name={template.name}
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
