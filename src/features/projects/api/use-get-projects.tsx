import { InferResponseType } from "hono";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export type ResponseType = InferResponseType<typeof client.api.projects[ "$get" ], 200>;

export const useGetProjects = () =>
{
    const query = useInfiniteQuery<ResponseType, Error>( {
        initialPageParam: 1,
        queryKey: [ "projects" ], //projects
        getNextPageParam: ( lastPage ) => lastPage.nextPage,
        queryFn: async ( { pageParam } ) =>
        {
            console.log( 'API', client );

            const response = await client.api.projects.$get( {
                query: {
                    page: ( pageParam as number ).toString(),
                    limit: '5'

                },
            } );

            if ( !response.ok )
            {
                throw new Error( "Failed to fetch projects" );
            }

            return response.json();
        },
    } );

    return query;
};
