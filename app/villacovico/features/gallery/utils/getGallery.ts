/**
 * Helper type that extracts all property keys from nested objects as a union.
 *
 * @template T - Record where values are objects with string keys
 * @example
 * type Cards = {
 *   card1: { id: string; gallery: string[] }
 *   card2: { id: string; title: string }
 * }
 * type Props = UnionOfProperties<Cards> // 'id' | 'gallery' | 'title'
 */
type UnionOfProperties<T extends Record<string, Record<string, unknown>>> = {
  [K in keyof T]: keyof T[K]
}[keyof T]

/**
 * Extracts a specific property from each card in a content object and returns
 * a mapped object with the same keys.
 *
 * @template TLists - The cards object type (e.g., `VISUAL_ARCHIVE.cards`)
 * @template TGalleryKey - The property key to extract from each card (must exist in at least one card)
 *
 * @param lists - The cards object containing multiple card entries
 * @param galleryKey - The property name to extract from each card (e.g., 'gallery', 'images')
 *
 * @returns A record mapping each card ID to its corresponding property value
 *
 * @example
 * const VISUAL_ARCHIVE = {
 *   cards: {
 *     history: { id: 'history', gallery: ['img1.jpg', 'img2.jpg'] },
 *     culture: { id: 'culture', gallery: ['img3.jpg'] }
 *   }
 * }
 *
 * const galleries = getGallery(VISUAL_ARCHIVE.cards, 'gallery')
 * // Returns: { history: ['img1.jpg', 'img2.jpg'], culture: ['img3.jpg'] }
 */
export function getGallery<
  TLists extends Record<string, Record<string, unknown>>,
  TGalleryKey extends UnionOfProperties<TLists> & string,
>(
  lists: TLists,
  galleryKey: TGalleryKey
): {
  [K in keyof TLists]: TGalleryKey extends keyof TLists[K] ? TLists[K][TGalleryKey] : never
} {
  return Object.fromEntries(Object.entries(lists).map(([id, card]) => [id, card[galleryKey]])) as {
    [K in keyof TLists]: TGalleryKey extends keyof TLists[K] ? TLists[K][TGalleryKey] : never
  }
}
