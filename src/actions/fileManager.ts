'use server'

import * as fs from 'fs'
import * as path from 'path'

import { FileManagerType } from '@/types/fileManager'
import { Months, MonthsType } from '@/types/months'
import { encryptStr } from '@/utils/crypto'

export async function save(
  data: object,
  config: {
    year: number
    type: FileManagerType
    month: MonthsType
  },
): Promise<boolean> {
  try {
    const encryptYear = encryptStr(String(config.year))
    const encryptType = encryptStr(config.type)
    const encryptMonth = encryptStr(Months[config.month])

    const dirPath = path.join('src', 'database', encryptYear, encryptType)
    const filePath = path.join(dirPath, `${encryptMonth}.json`)

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }

    await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2))

    return true
  } catch (err) {
    console.log(err)
    return false
  }
}
