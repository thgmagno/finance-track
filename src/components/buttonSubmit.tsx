'use client'

import { saveFile } from '@/actions/fileManager'
import { ConfigType } from '@/types/fileManager'
import { useState } from 'react'

export function ButtonSubmit({
  data,
  config,
}: {
  data: object
  config: ConfigType
}) {
  const [res, setRes] = useState('')

  const save = async () => {
    const response = await saveFile(data, config)
    setRes(response ? 'ok' : 'not ok')
  }

  return (
    <button
      onClick={save}
      className="mt-3 w-full rounded-md border bg-slate-100 px-2 py-1"
    >
      {res || 'Submit'}
    </button>
  )
}
