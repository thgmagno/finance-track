'use client'

import { IonIcon } from '@ionic/react'
import clsx from 'clsx'
import {
  walletOutline,
  arrowUpCircle,
  arrowDownCircle,
  diamond,
} from 'ionicons/icons'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export function RegistrationButtonTrigger() {
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)

  const handleToggle = () => {
    if (open) {
      setClosing(true)
      setTimeout(() => {
        setOpen(false)
        setClosing(false)
      }, 600)
    } else {
      setOpen(true)
    }
  }

  const ButtonItem = ({
    title,
    param,
    icon,
    delay,
  }: {
    title: string
    param: string
    icon: string
    delay: number
  }) => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { replace } = useRouter()

    const handleClick = () => {
      const params = new URLSearchParams(searchParams)
      params.set('register', param)
      setOpen(false)
      handleToggle()
      replace(`${pathname}?${params.toString()}`, { scroll: false })
    }

    return (
      <button
        onClick={handleClick}
        style={{ animationDelay: `${delay}ms` }}
        className={clsx(
          'mb-2.5 flex items-center gap-2 rounded-md border bg-zinc-200 px-4 py-2 text-sm',
          {
            'animate-fadeInUp translate-y-4 opacity-0': open,
            'animate-fadeOutDown': closing,
          },
        )}
      >
        <IonIcon icon={icon} /> {title}
      </button>
    )
  }

  return (
    <>
      <button
        onClick={handleToggle}
        className="fixed bottom-6 right-6 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-sky-600/50 p-2 text-zinc-200 ring backdrop-blur hover:bg-sky-700/60"
      >
        <IonIcon icon={walletOutline} size="large" />
      </button>
      {(open || closing) && (
        <div className="fixed bottom-[90px] right-6 flex flex-col">
          <ButtonItem
            title="Saving"
            param="save"
            icon={diamond}
            delay={closing ? 0 : 400}
          />
          <ButtonItem
            title="Expense"
            param="expense"
            icon={arrowUpCircle}
            delay={closing ? 200 : 200}
          />
          <ButtonItem
            title="Receipt"
            param="receipt"
            icon={arrowDownCircle}
            delay={closing ? 400 : 0}
          />
        </div>
      )}
    </>
  )
}
