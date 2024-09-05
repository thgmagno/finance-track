'use server'

import * as fs from 'fs'
import * as path from 'path'

import { ConfigType } from '@/types/fileManager'
import { Months } from '@/types/months'
import { decryptJson, encryptJson, encryptStr } from '@/utils/crypto'

export async function saveFile(
  data: object,
  config: ConfigType,
): Promise<boolean> {
  try {
    const encryptYear = encryptStr(String(config.year))
    const encryptType = encryptStr(config.type)
    const encryptMonth = encryptStr(Months[config.month])
    const encryptData = encryptJson(data)

    const jsonData = JSON.stringify({
      hash: encryptData,
    })

    const dirPath = path.join('src', 'database', encryptYear, encryptType)
    const filePath = path.join(dirPath, `${encryptMonth}.json`)

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }

    await fs.promises.writeFile(filePath, jsonData)

    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

export async function getFile(config: ConfigType): Promise<object> {
  try {
    const encryptYear = encryptStr(String(config.year))
    const encryptType = encryptStr(config.type)
    const encryptMonth = encryptStr(Months[config.month])

    const dirPath = path.join('src', 'database', encryptYear, encryptType)
    const filePath = path.join(dirPath, `${encryptMonth}.json`)

    const raw = await fs.promises.readFile(filePath, 'utf-8')

    const jsonData = JSON.parse(raw)

    return decryptJson(jsonData.hash)
  } catch (err) {
    console.log(err)
    return {}
  }
}
