'use client'

import { IonIcon } from '@ionic/react'
import { closeOutline } from 'ionicons/icons'
import { usePathname, useRouter } from 'next/navigation'

interface Props {
  title?: string
}

export function CardHeader({ title }: Props) {
  const pathname = usePathname()
  const { replace } = useRouter()

  return (
    <div className="relative flex">
      {title && (
        <h1 className="max-w-[90%] flex-1 text-lg font-medium">{title}</h1>
      )}
      <IonIcon
        onClick={() => replace(pathname)}
        icon={closeOutline}
        className="absolute right-0 top-0 h-6 w-6 -translate-y-2 translate-x-2 cursor-pointer rounded-md p-1 hover:bg-zinc-100"
      />
    </div>
  )
}
