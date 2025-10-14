/**
 * Circular array indexing utilities
 * Useful for carousels, galleries, pagination, and any UI that needs wraparound behavior
 */

/**
 * Get the next index in a circular array
 * @param current - Current index
 * @param length - Array length
 * @returns Next index (wraps to 0 if at end)
 */
export const getNextIndex = (current: number, length: number): number => {
  return (current + 1) % length
}

/**
 * Get the previous index in a circular array
 * @param current - Current index
 * @param length - Array length
 * @returns Previous index (wraps to end if at start)
 */
export const getPrevIndex = (current: number, length: number): number => {
  return (current - 1 + length) % length
}
