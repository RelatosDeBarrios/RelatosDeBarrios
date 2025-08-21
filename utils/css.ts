/**
 * CSS and styling utility functions
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines clsx and tailwind-merge for optimal class name handling
 *
 * This utility function:
 * - Uses clsx for conditional class names
 * - Uses tailwind-merge to merge conflicting Tailwind classes intelligently
 *
 * @example
 * ```tsx
 * // Basic usage
 * cn('px-4 py-2', 'bg-blue-500', 'text-white')
 * // "px-4 py-2 bg-blue-500 text-white"
 *
 * // Conditional classes
 * cn('px-4 py-2', isActive && 'bg-blue-500', !isActive && 'bg-gray-500')
 *
 * // Merges conflicting Tailwind classes (last one wins)
 * cn('px-4 px-6', 'py-2 py-4')
 * // "px-6 py-4"
 *
 * // Works with objects and arrays
 * cn(['px-4', 'py-2'], { 'bg-blue-500': isActive }, undefined, null)
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
