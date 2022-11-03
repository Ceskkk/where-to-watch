export function formatDate(date: string): string {
  const splittedDate = date.split("-")
  return splittedDate[2] + "/" + splittedDate[1] + "/" + splittedDate[0]
}

export function timeConverter(time: number): string {
  const hours = time / 60
  const roundedHours = Math.floor(hours)

  const minutes = (hours - roundedHours) * 60
  const roundedMinutes = Math.round(minutes)

  return roundedHours + "h " + roundedMinutes + "m"
}
