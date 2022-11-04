/**
 * Format date from YYYY-MM-DD to dd/mm/yyyy
 * Ex: 2022-24-01 -> 01/24/2022
 */
export function formatDate(date: string): string {
  const splittedDate = date.split("-")
  return splittedDate[2] + "/" + splittedDate[1] + "/" + splittedDate[0]
}

/**
 * Convert time from minutes to hours
 * Ex: 100 -> 1h 40m
 * Ex: 60 -> 1h
 * Ex: 20 -> 20m
 */
export function timeConverter(time: number): string {
  const hours = time / 60
  const roundedHours = Math.floor(hours)

  const minutes = (hours - roundedHours) * 60
  const roundedMinutes = Math.round(minutes)

  return (
    (roundedHours !== 0 ? roundedHours + "h" : "") +
    (roundedMinutes !== 0 ? roundedMinutes + "m" : "")
  )
}

/**
 * Calculate average episode runtime
 */
export function averageRuntime(runtime: number[] | null): number {
  let average: number = 0

  if (!runtime) {
  } else if (runtime.length === 1) {
    return runtime[0]
  } else {
    runtime.forEach((episodeRuntime: number) => {
      average += episodeRuntime
    })
    average /= runtime.length
  }

  return average
}
