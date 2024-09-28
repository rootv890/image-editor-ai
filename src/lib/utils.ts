import { type ClassValue, clsx } from "clsx";

import { twMerge } from "tailwind-merge";

export function cn ( ...inputs: ClassValue[] )
{
    return twMerge( clsx( inputs ) );
}

export const getInitials = ( name: string ) =>
{
    return name.split( ' ' ).map( name => name[ 0 ].toUpperCase() ).join( '' );
};


export const formatter = new Intl.DateTimeFormat( 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
} );
