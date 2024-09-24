export const generateKey = (params: {
  type: string
  clusterId: string
  year?: number
  month?: number
}) => {
  const { type, clusterId, year, month } = params

  if (year && month) {
    return `${type}:${clusterId}:${year}:${month}`
  } else {
    return `${type}:${clusterId}`
  }
}
