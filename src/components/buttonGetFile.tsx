'use client'

import { getFile } from '@/actions/fileManager'
import { ConfigType } from '@/types/fileManager'
import { useState } from 'react'

export function ButtonGetFile() {
  const config: ConfigType = { year: 2024, type: 'receipt', month: 8 }

  const [res, setRes] = useState({})

  const save = async () => {
    const response = await getFile(config)
    setRes(response)
  }

  return (
    <>
      <button
        onClick={save}
        className="mt-3 w-full rounded-md border bg-slate-100 px-2 py-1"
      >
        Get file
      </button>
      <pre>{JSON.stringify(res, null, 2)}</pre>
    </>
  )
}
