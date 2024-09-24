import * as bcrypt from 'bcrypt'

export const capitalizeStr = (value: string) => {
  const trimmedValue = value.trim()
  return trimmedValue.charAt(0).toUpperCase().concat(trimmedValue.slice(1))
}

export const secret = new TextEncoder().encode(process.env.AUTH_SECRET)

export const hashValue = (value: string) => {
  return bcrypt.hash(value, 10)
}

export const currentTimestamp = () => Math.floor(Date.now() / 1000)
