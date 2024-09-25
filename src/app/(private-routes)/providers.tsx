'use client'

import { ToastAction } from '@/components/ui/toast'
import { Toaster } from '@/components/ui/toaster'
import { toast } from '@/hooks/use-toast'
import { keepSessionUpdated } from '@/server/actions/session'
import { useEffect } from 'react'

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      <Toaster />
      <KeepUserSessionUpdated />
    </>
  )
}

export function KeepUserSessionUpdated() {
  const currentTimestamp = () => Math.ceil(new Date().getTime() / 1000)

  useEffect(() => {
    const interval = 3600 // 1 hour

    const updateSession = async () => {
      try {
        await keepSessionUpdated()
        localStorage.setItem('lastSessionUpdated', String(currentTimestamp()))
      } catch (error) {
        toast({
          title: 'Cannot connect to the server',
          description: 'Please reload the page',
          variant: 'destructive',
          action: (
            <ToastAction onClick={updateSession} altText="Try again">
              Try again
            </ToastAction>
          ),
        })
      }
    }

    const lastExecution = localStorage.getItem('lastSessionUpdated')
    const now = currentTimestamp()

    if (!lastExecution || now - parseInt(lastExecution) > interval) {
      updateSession()
    }
  }, [])
  return null
}
