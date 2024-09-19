'use client'

import { keepSessionUpdated } from '@/actions/authentication/session'
import { ToastAction } from '@/components/ui/toast'
import { Toaster } from '@/components/ui/toaster'
import { toast } from '@/hooks/use-toast'
import { useEffect } from 'react'

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useEffect(() => {
    const interval = 600000 // 10 minutes

    const updateSession = async () => {
      try {
        await keepSessionUpdated()
        localStorage.setItem('lastSessionUpdated', String(Date.now()))
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
    const now = Date.now()

    if (!lastExecution || now - parseInt(lastExecution) > interval) {
      updateSession()
    }
  }, [])

  return (
    <>
      {children}
      <Toaster />
    </>
  )
}
