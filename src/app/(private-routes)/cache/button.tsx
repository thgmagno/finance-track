'use client'

import { Button } from '@/components/ui/button'
import {
  getCacheTest,
  resetCacheTest,
  setCacheTest,
} from '@/server/cache/testCache'
import { ArrowDown, ArrowUp, RefreshCcw } from 'lucide-react'
import { useState } from 'react'

export function ClientButton() {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState('-')

  const handleGet = async () => {
    try {
      setLoading(true)
      const res = await getCacheTest()
      setResponse(res)
    } finally {
      setLoading(false)
    }
  }

  const handleSet = async () => {
    try {
      setLoading(true)
      const res = await setCacheTest()
      setResponse(res)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = async () => {
    try {
      setLoading(true)
      const res = await resetCacheTest()
      setResponse(res)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col space-y-2">
      {loading ? (
        <div>
          <h1 className="-translate-y-6 animate-pulse text-center text-xl font-medium text-muted-foreground">
            loading...
          </h1>
        </div>
      ) : (
        <div>
          <h1 className="-translate-y-6 text-center text-xl font-medium uppercase">
            {response}
          </h1>
        </div>
      )}
      <div className="flex space-x-5">
        <Button onClick={handleGet} disabled={loading} className="min-w-32">
          <ArrowDown className="mr-2 h-5 w-5" /> Get
        </Button>
        <Button onClick={handleSet} disabled={loading} className="min-w-32">
          <ArrowUp className="mr-2 h-5 w-5" /> Set
        </Button>
      </div>
      <Button
        onClick={handleReset}
        disabled={loading}
        className="min-w-32"
        variant="outline"
      >
        <RefreshCcw className="mr-2 h-5 w-5" />
        Reset
      </Button>
    </div>
  )
}
