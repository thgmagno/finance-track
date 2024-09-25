export const generateKey = (params: {
  type: string
  id: string
  year?: number
  month?: number
}) => {
  const { type, id, year, month } = params

  if (year && month) {
    return `${type}:${id}:${year}:${month}`
  } else {
    return `${type}:${id}`
  }
}
