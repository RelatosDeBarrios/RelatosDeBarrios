/**
 * Format utility functions
 */

/**
 * Formats bytes to human readable format
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'kb', 'mb', 'gb', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i]
}

/**
 * Formats a duration to a human readable format based on provided properties.
 *
 * @param {Object} params - The duration parameters.
 * @param {number} [params.milliseconds=0] - The number of milliseconds.
 * @param {number} [params.seconds=0] - The number of seconds.
 * @param {number} [params.minutes=0] - The number of minutes.
 * @param {number} [params.hours=0] - The number of hours.
 * @returns {string} The formatted duration string (e.g., '1d 2h 3m', '4h 5m', '6m 7s', or '8s').
 */
export function formatDuration({
  milliseconds = 0,
  seconds = 0,
  minutes = 0,
  hours = 0,
}: {
  milliseconds?: number
  seconds?: number
  minutes?: number
  hours?: number
}): string {
  // Convert all to milliseconds
  let totalMilliseconds = 0
  totalMilliseconds += milliseconds
  totalMilliseconds += seconds * 1000
  totalMilliseconds += minutes * 60 * 1000
  totalMilliseconds += hours * 60 * 60 * 1000

  const totalSeconds = Math.floor(totalMilliseconds / 1000)
  const totalMinutes = Math.floor(totalSeconds / 60)
  const totalHours = Math.floor(totalMinutes / 60)
  const days = Math.floor(totalHours / 24)

  if (days > 0) {
    return `${days}d ${totalHours % 24}h ${totalMinutes % 60}m`
  } else if (totalHours > 0) {
    return `${totalHours}h ${totalMinutes % 60}m`
  } else if (totalMinutes > 0) {
    return `${totalMinutes}m ${totalSeconds % 60}s`
  } else {
    return `${totalSeconds}s`
  }
}
