'use client'

import { IonIcon } from '@ionic/react'
import clsx from 'clsx'
import {
  caretDownOutline,
  statsChart,
  walletSharp,
  settingsSharp,
  logOut,
} from 'ionicons/icons'
import Link from 'next/link'
import { LinkHTMLAttributes, useEffect, useRef, useState } from 'react'

interface NavbarItemProps extends LinkHTMLAttributes<HTMLLinkElement> {
  icon: string
  title: string
  href?: string
  onClick?: () => void
}

export function Navbar({ name }: { name: string }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handlePressItem = ({
    href,
    onClick,
  }: {
    href?: string
    onClick?: () => void
  }) => {
    setOpen(false)
    onClick && onClick()
  }

  const NavbarItem = ({
    icon,
    title,
    href,
    className,
    onClick,
  }: NavbarItemProps) => (
    <button
      onClick={() => handlePressItem({ href, onClick })}
      className={clsx(
        `flex items-center gap-2 px-3 py-1 hover:bg-zinc-200 ${className}`,
      )}
    >
      <IonIcon icon={icon} />
      {title}
    </button>
  )

  return (
    <nav className="relative flex items-center justify-between py-5">
      <Link href="/">Finance Track</Link>
      <div className="flex">
        <div className="mr-2 flex flex-col items-end">
          <h1>{name}</h1>
          <b className="flex items-baseline gap-1 text-xs text-sky-600">
            <div className="h-[6px] w-[6px] animate-pulse rounded-full bg-sky-500" />
            [cluster]
          </b>
        </div>
        <IonIcon
          icon={caretDownOutline}
          onClick={() => setOpen(!open)}
          className={clsx(
            `z-10 cursor-pointer rounded-md p-2 hover:bg-zinc-100 hover:shadow`,
            {
              'bg-zinc-100 hover:shadow-none': open,
            },
          )}
        />
      </div>
      <div
        ref={menuRef}
        className={clsx(
          'absolute right-0 top-12 flex flex-col rounded-b-md rounded-tl-md bg-zinc-100 py-2 shadow',
          {
            hidden: open === false,
          },
        )}
      >
        <NavbarItem icon={statsChart} title="Dashboard" href="/" />
        <NavbarItem icon={walletSharp} title="Finance" href="finance" />
        <NavbarItem icon={settingsSharp} title="Settings" href="settings" />
        <NavbarItem
          icon={logOut}
          title="Logout"
          onClick={() => alert('implement')}
          className="text-red-500"
        />
      </div>
    </nav>
  )
}
