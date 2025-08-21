/**
 * DOM utility functions (for client-side use)
 */

/**
 * Checks if we're in a browser environment
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

/**
 * Options for scrollTo function.
 */
interface scrollToOptions {
  /**
   * Whether to use smooth scrolling (default: true)
   */
  smooth?: boolean
  /**
   * Vertical alignment after scrolling (default: 'start')
   */
  block?: 'start' | 'center' | 'end' | 'nearest'
}

/**
 * Scrolls the window to the top or scrolls an element into view.
 *
 * @param to - CSS selector for the element to scroll to, or 'top' to scroll to the top of the page.
 * @param options - Optional scroll options (smooth scrolling, block alignment).
 */
export function scrollTo(
  to: string | 'top',
  { smooth = true }: scrollToOptions = {}
): void {
  if (!to || !isBrowser()) return
  const behavior = smooth ? 'smooth' : 'auto'
  if (to === 'top') {
    window.scrollTo({ top: 0, behavior })
  } else {
    document.querySelector(to)?.scrollIntoView({
      behavior,
      block: 'start',
    })
  }
}
