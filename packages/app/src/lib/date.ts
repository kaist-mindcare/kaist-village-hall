type DateUnits = {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
}

const getDeltaDateUnits = (start: Date, end: Date): DateUnits => {
  const delta = end.getTime() - start.getTime()

  if (delta < 0)
    return {
      year: 0,
      month: 0,
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
    }

  const second = Math.floor(delta / 1000)
  const minute = Math.floor(second / 60)
  const hour = Math.floor(minute / 60)
  const day = Math.floor(hour / 24)
  const month = Math.floor(day / 30)
  const year = Math.floor(month / 12)
  return { year, month, day, hour, minute, second }
}

export const relativeDateString = (date: Date) => {
  const now = new Date()
  const delta = getDeltaDateUnits(date, now)

  if (delta.year) return `${delta.year}년 전`
  if (delta.month) return `${delta.month}달 전`
  if (delta.day >= 7) return `${Math.floor(delta.day / 7)}주 전`
  if (delta.day) return `${delta.day}일 전`
  if (delta.hour) return `${delta.hour}시간 전`
  if (delta.minute) return `${delta.minute}분 전`
  if (delta.second) return `${delta.second}초 전`
  return '방금 전'
}
