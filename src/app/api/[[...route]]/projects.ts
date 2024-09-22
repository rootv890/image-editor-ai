import { db } from "@/db/drizzle";
import { projects, projectsInsertSchema } from "@/db/schema";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

const app = new Hono().post(
    '/',
    verifyAuth(),
    zValidator( 'json',
        projectsInsertSchema.pick( {
            name: true,
            json: true,
            width: true,
            height: true
        } )
    ),
    async ( c ) =>
    {
        const auth = c.get( 'authUser' );
        const { name, json, height, width } = c.req.valid( "json" );

        if ( !auth.token?.id )
        {
            return c.json( {
                error: 'Unauthorized'
            }, 401 );
        }
        const data = await db.insert( projects )
            .values(
                {
                    name,
                    json,
                    width,
                    height,
                    userId: auth.token.id,
                    createdAt: new Date(),
                    updatedAt: new Date()
                } ).returning();
        if ( !data[ 0 ] )
        {
            return c.json( {
                error: "Something went Wrong"
            }, 400 );
        }
        return c.json( {
            data: data[ 0 ]
        } );
    }
);



export default app;
