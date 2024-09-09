'use client'

import { useSearchParams } from 'next/navigation'
import { InputCustom } from '@/components/input/inputCustom'
import { ButtonSubmit } from '@/components/button/submit'
import { ButtonDismiss } from '@/components/button/dismiss'
import { useFormState } from 'react-dom'
import { findClusterByName } from '@/actions/clusterActions'
import { BackdropBlur } from '../modals/backdropBlur'
import { Card } from '../modals/card'
import { CardHeader } from '../modals/cardHeader'
import { CardBody } from '../modals/cardBody'

export function LookingClusterForm() {
  const params = useSearchParams()

  const [formState, action] = useFormState(findClusterByName, {
    errors: {},
  })

  const open = params.get('looking') === 'cluster'

  return (
    <>
      {open && (
        <BackdropBlur>
          <Card>
            <CardHeader title="Search cluster" />
            <CardBody>
              <form action={action}>
                <InputCustom
                  label="Choose a cluster by name"
                  name="name"
                  placeholder="Cluster name"
                  isInvalid={!!formState.errors?.name}
                  errorMessage={formState.errors?.name}
                />
                {formState?.clusters &&
                  formState.clusters?.map((cluster) => (
                    <span
                      key={cluster.id}
                      className="flex justify-between rounded-md border bg-zinc-50 pl-2"
                    >
                      {cluster.name}
                      <button
                        type="button"
                        className="rounded-md bg-emerald-400 px-2 py-1 text-sm text-zinc-50"
                      >
                        request to join
                      </button>
                    </span>
                  ))}
                {formState.errors?._form && (
                  <span className="text-sm text-red-500">
                    {formState.errors._form}
                  </span>
                )}
                <ButtonSubmit title="Search" />
                <ButtonDismiss
                  title="Cancel"
                  paramToDismiss="looking"
                  callback={{ name: 'create', value: 'cluster' }}
                />
              </form>
            </CardBody>
          </Card>
        </BackdropBlur>
      )}
    </>
  )
}
