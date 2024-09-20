import { type ClassValue, clsx } from "clsx"

import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getInitials = (name: string)=> {
    return  name.split(' ').map(name=>name[0].toUpperCase()).join('')
}
