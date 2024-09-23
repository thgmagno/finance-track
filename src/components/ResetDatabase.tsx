'use client'

import { resetDatabase } from '@/actions/development'
import { toast } from '@/hooks/use-toast'

export function ResetDatabase() {
  const handleResetDB = async () => {
    const res = await resetDatabase()
    if (!res) {
      return toast({
        description: 'Failed',
        variant: 'destructive',
      })
    }

    return toast({
      description: 'Database reseted',
    })
  }
  return (
    <button
      onClick={handleResetDB}
      className="rounded-md bg-zinc-800 p-2 text-white"
    >
      Reset database
    </button>
  )
}
