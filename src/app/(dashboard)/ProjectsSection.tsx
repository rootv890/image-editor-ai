'use client';

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useDeleteProject } from "@/features/projects/api/use-delete-project";
import { useDuplicateProject } from "@/features/projects/api/use-duplicate-project";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import useConfirm from "@/hooks/useConfirm";
import { formatter } from "@/lib/utils";
import { formatDistance, formatDistanceToNow } from 'date-fns';
import { AlertTriangleIcon, CopySlashIcon, FileIcon, Loader2Icon, MoreHorizontal, Search, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

const ProjectsSection = () =>
{
    const [ ConfirmationDialog, confirm ] = useConfirm(
        'Are your sure?',
        "You're are about to delete the project!!"
    );
    const duplicateMutation = useDuplicateProject();
    const removeMutation = useDeleteProject();
    const router = useRouter();

    const onCopy = ( id: string ) =>
    {
        duplicateMutation.mutate( { id } );
    };
    const onDelete = async ( id: string ) =>
    {
        const ok = await confirm();
        if ( ok ) < Dialog />;
        removeMutation.mutate( { id } );
    };

    const {
        data, status, fetchNextPage, isFetchingNextPage, hasNextPage
    } = useGetProjects();
    if ( status === 'error' )
    {
        return (
            <div>
                <SectionHeader />
                <div className="flex flex-col justify-center items-center gap-y-4 h-32">
                    <AlertTriangleIcon className="size-6 text-muted-foreground" />
                    <p className="text-muted-foreground text-sm">
                        Failed to Load Project!
                    </p>
                </div>
            </div>
        );
    }
    if ( status === 'pending' )
    {
        return (
            <div>
                <SectionHeader />
                <div className="flex flex-col justify-center items-center gap-y-4 h-32">
                    <Loader2Icon className="size-6 text-muted-foreground animate-spin" />
                    <p className="text-muted-foreground text-sm">
                        Loading your projects! Please Wait...
                    </p>
                </div>
            </div>
        );
    }
    if ( !data.pages.length || !data.pages[ 0 ].data.length )
    {
        return (
            <div>
                <SectionHeader />
                <div className="flex flex-col justify-center items-center gap-y-4 h-32">
                    <Search className="size-6 text-muted-foreground" />
                    <p className="text-muted-foreground text-sm">
                        No Projects Found!
                    </p>
                </div>
            </div>
        );
    }
    return (
        <div>
            <SectionHeader title="Recent Projects" />
            <ConfirmationDialog />
            <Table>
                <TableBody>
                    {data.pages.map( ( group, i ) => (
                        <Fragment key={i}>
                            {group.data.map( ( project ) => (
                                <TableRow
                                    key={project.id}
                                    className="flex justify-between">
                                    <TableCell
                                        onClick={() => router.push( `/editor/${project.id}` )}
                                        className="font-medium flex items-center gap-x-2 cursor-pointer ">
                                        <FileIcon className="size-6" />
                                        {project.name}
                                    </TableCell>
                                    <TableCell
                                        onClick={() => router.push( `/editor/${project.id}` )}
                                        className=" hidden md:table-cell font-medium  items-center gap-x-2 cursor-pointer ">
                                        {project.width}x{project.height}
                                    </TableCell>
                                    <TableCell
                                        onClick={() => router.push( `/editor/${project.id}` )}
                                        className=" hidden md:table-cell font-medium  items-center gap-x-2 cursor-pointer ">
                                        {
                                            formatDistanceToNow( project.updatedAt, {
                                                addSuffix: true
                                            } )
                                        }
                                    </TableCell>
                                    <TableCell
                                        className="font-medium  items-center justify-end gap-x-2 cursor-pointer ">
                                        <DropdownMenu modal={false}>
                                            <DropdownMenuTrigger asChild>
                                                <Button size={'icon'} variant={'ghost'}
                                                    disabled={false}
                                                >
                                                    <MoreHorizontal className="size-6" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-60">
                                                <DropdownMenuItem className="h-10 cursor-pointer"
                                                    disabled={duplicateMutation.isPending}
                                                    onClick={() => onCopy( project.id )}
                                                >
                                                    <CopySlashIcon className="size-4 mr-2" />
                                                    Make a Copy
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="h-10 cursor-pointer"
                                                    disabled={removeMutation.isPending}
                                                    onClick={() => onDelete( project.id )}
                                                >
                                                    <Trash2Icon className="size-4 mr-2" />
                                                    Delete
                                                </DropdownMenuItem>

                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ) )}
                        </Fragment>
                    ) )}
                </TableBody>
            </Table>
            {hasNextPage && (
                <div className="w-full flex items-center justify-center p-4">
                    <Button
                        variant={'ghost'}
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                    >
                        Load More
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ProjectsSection;


export const SectionHeader = ( { title }: { title: string; } ) => (
    <>
        <h3 className="font-semibold text-lg"> {title}</h3>
        <Separator className="mt-4" />


    </>
);
