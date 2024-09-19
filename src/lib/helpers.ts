import * as bcrypt from 'bcrypt'

export const capitalizeStr = (text: string) => {
  const splited = text.split(' ')
  return splited
    .map((split) =>
      String(split).charAt(0).toUpperCase().concat(String(split).slice(1)),
    )
    .join(' ')
    .trim()
}

export const secret = new TextEncoder().encode(process.env.AUTH_SECRET)

export const hashValue = (value: string) => {
  return bcrypt.hash(value, 10)
}

export const currentTimestamp = () => Math.floor(Date.now() / 1000)
