import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ReactNode } from 'react'

export function PageContainer({ children }: { children: ReactNode }) {
  return <div className="px-5">{children}</div>
}

export function PageInsertButton({
  children,
  tooltip,
}: {
  children: ReactNode
  tooltip: string
}) {
  return (
    <div className="fixed bottom-5 right-5">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent side="left">
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
