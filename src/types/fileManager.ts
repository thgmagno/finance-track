import { MonthsType } from './months'

export type FileManagerType = 'receipt' | 'expense' | 'saving'

export type ConfigType = {
  year: number
  type: FileManagerType
  month: MonthsType
}
