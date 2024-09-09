'use client'

import { createCluster } from '@/actions/clusterActions'
import { useFormState } from 'react-dom'
import { InputCustom } from '../input/inputCustom'
import { ButtonSubmit } from '../button/submit'
import { useSearchParams } from 'next/navigation'
import { ButtonDismiss } from '../button/dismiss'
import { LookingClusterButtonTrigger } from '../button/lookingClusterButtonTrigger'

export function ClusterForm({ userId }: { userId: string }) {
  const params = useSearchParams()

  const [formState, action] = useFormState(createCluster, {
    errors: {},
  })

  const open = params.get('create') === 'cluster'

  return (
    <>
      {open && (
        <div className="fixed left-0 right-0 top-0 z-50 flex min-h-screen items-center justify-center bg-zinc-800/30 backdrop-blur">
          <form
            action={action}
            className="relative flex w-[90%] max-w-[384px] flex-col space-y-3 rounded-md bg-zinc-200 p-5 shadow md:-translate-y-32"
          >
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
            <ButtonDismiss title="Cancel" paramToDismiss="create" />
            <LookingClusterButtonTrigger />
          </form>
        </div>
      )}
    </>
  )
}
