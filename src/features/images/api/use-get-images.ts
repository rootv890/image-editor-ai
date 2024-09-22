import { useQuery } from '@tanstack/react-query';
import { AppType } from '@/app/api/[[...route]]/route';
import { client } from '@/lib/hono';

export const useGetImages = () =>
{
    const query = useQuery( {
        queryKey: [ 'images' ],
        queryFn: async () =>
        {
            const response = await client.api.images.$get();

            if ( !response.ok )
            {
                throw new Error( 'An error occurred to Fetch Images' );
            }
            const { data } = await response.json();
            return data;
        },
    } );

    return query;
};
