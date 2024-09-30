import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { client } from '@/lib/hono';
import { toast } from 'sonner';
import { projects } from '@/db/schema';

type ResponseType = InferResponseType<
    ( typeof client.api.projects )[ '$post' ], 200
>;

type RequestType = InferRequestType<
    ( typeof client.api.projects )[ '$post' ]
>[ 'json' ];

export const useCreateProject = () =>
{
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>( {
        mutationFn: async ( json ) =>
        {
            const response = await client.api.projects.$post( { json } );
            if ( !response.ok )
            {
                throw new Error( "Something went Wrong" );
            }
            return await response.json();
        },
        onSuccess: () =>
        {
            toast.success( "Project Created!" );
            queryClient.invalidateQueries( { queryKey: [ 'projects' ] } );
        },

        onError: () =>
        {
            toast.error( "Failed to create project" );
        }
    } );

    return mutation;
};
