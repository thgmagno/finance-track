import crypto from 'crypto'

const algorithm = 'aes-256-cbc'

const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex')
const iv = Buffer.from(process.env.ENCRYPTION_IV!, 'hex')

export const encryptJson = (jsonData: object): string => {
  const jsonStr = JSON.stringify(jsonData)
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  let encrypted = cipher.update(jsonStr, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

export const decryptJson = (encryptedData: string): object => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv)
  let decrypted = decipher.update(encryptedData, 'hex', 'utf-8')
  decrypted += decipher.final('utf-8')
  return JSON.parse(decrypted)
}

export const encryptStr = (strData: string): string => {
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  let encrypted = cipher.update(strData, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

export const decryptStr = (encryptedStr: string): string => {
  const cipher = crypto.createDecipheriv(algorithm, key, iv)
  let decrypted = cipher.update(encryptedStr, 'hex', 'utf-8')
  decrypted += cipher.final('utf-8')
  return decrypted
}
