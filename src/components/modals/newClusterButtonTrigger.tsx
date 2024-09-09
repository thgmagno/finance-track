'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { BackdropBlur } from '@/components/modals/backdropBlur'
import { InputCustom } from '@/components/input/inputCustom'
import { useFormState } from 'react-dom'
import { createCluster } from '@/actions/clusterActions'
import { ButtonSubmit } from '@/components/button/submit'
import { LookingClusterButtonTrigger } from '@/components/modals/lookingClusterButtonTrigger'
import { Card } from './card'
import { CardHeader } from './cardHeader'
import { CardBody } from './cardBody'

export function NewClusterButtonTrigger({ userId }: { userId: string }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const handleClick = () => {
    const params = new URLSearchParams(searchParams)
    params.set('create', 'cluster')
    replace(`${pathname}?${params.toString()}`)
  }

  const open = searchParams.get('create') === 'cluster'

  return (
    <>
      <button onClick={handleClick} className="text-xs text-sky-600">
        create cluster
      </button>
      {open && <ClusterForm userId={userId} />}
    </>
  )
}

function ClusterForm({ userId }: { userId: string }) {
  const [formState, action] = useFormState(createCluster, {
    errors: {},
  })

  return (
    <BackdropBlur>
      <Card>
        <CardHeader title="Create your cluster" />
        <CardBody>
          <form action={action}>
            <input type="hidden" name="userId" value={userId} />
            <InputCustom
              label="Choose a name for your cluster"
              name="name"
              placeholder="Cluster name"
              isInvalid={!!formState.errors?.name}
              errorMessage={formState.errors?.name}
            />
            {formState.errors?._form && (
              <span className="text-sm text-red-500">
                {formState.errors._form}
              </span>
            )}
            <ButtonSubmit title="Create" />
            <LookingClusterButtonTrigger />
          </form>
        </CardBody>
      </Card>
    </BackdropBlur>
  )
}
