import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combine et merge les classes CSS avec tailwind-merge
 * @param inputs Les classes CSS à combiner
 * @returns Les classes CSS combinées et optimisées
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
