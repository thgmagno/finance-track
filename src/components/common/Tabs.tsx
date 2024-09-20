import {
  Tabs as TabsContainer,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { ReactNode } from 'react'

interface Props {
  defaultValue: string
  triggers: {
    value: string
    label: string
  }[]
  contents: {
    value: string
    children: ReactNode
  }[]
}

export function Tabs({ defaultValue, triggers, contents }: Props) {
  return (
    <TabsContainer defaultValue={defaultValue} className="flex flex-col">
      <TabsList className="my-5">
        {triggers.map((trigger) => (
          <TabsTrigger
            key={trigger.value}
            value={trigger.value}
            className="flex flex-1"
          >
            {trigger.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {contents.map((content) => (
        <TabsContent key={content.value} value={content.value}>
          {content.children}
        </TabsContent>
      ))}
    </TabsContainer>
  )
}
