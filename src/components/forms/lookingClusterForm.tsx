'use client'

import { useSearchParams } from 'next/navigation'
import { InputCustom } from '@/components/input/inputCustom'
import { ButtonSubmit } from '@/components/button/submit'
import { ButtonDismiss } from '@/components/button/dismiss'
import { useFormState } from 'react-dom'
import { findClusterByName } from '@/actions/clusterActions'

export function LookingClusterForm() {
  const params = useSearchParams()

  const [formState, action] = useFormState(findClusterByName, {
    errors: {},
  })

  const open = params.get('looking') === 'cluster'

  return (
    <>
      {open && (
        <div className="fixed left-0 right-0 top-0 z-50 flex min-h-screen items-center justify-center bg-zinc-800/30 backdrop-blur">
          <form
            action={action}
            className="relative flex w-[90%] max-w-[384px] flex-col space-y-3 rounded-md bg-zinc-200 p-5 shadow md:-translate-y-32"
          >
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
            <ButtonDismiss title="Cancel" paramToDismiss="looking" />
          </form>
        </div>
      )}
    </>
  )
}
