import * as bcrypt from 'bcrypt'

export const capitalizeStr = (value: string) =>
  value.charAt(0).toUpperCase().concat(value.slice(1)).trim()

export const secret = new TextEncoder().encode(process.env.AUTH_SECRET)

export const hashValue = (value: string) => {
  return bcrypt.hash(value, 10)
}

export const currentTimestamp = () => Math.floor(Date.now() / 1000)
