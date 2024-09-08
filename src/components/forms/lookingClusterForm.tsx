'use client'

import { useSearchParams } from 'next/navigation'
import { InputCustom } from '../input/inputCustom'
import { ButtonSubmit } from '../button/submit'
import { ButtonDismiss } from '../button/dismiss'

export function LookingClusterForm() {
  const params = useSearchParams()

  // const [formState, action] = useFormState(createCluster, {
  //   errors: {},
  // })

  const open = params.get('looking') === 'cluster'

  return (
    <>
      {open && (
        <div className="fixed left-0 right-0 top-0 z-50 flex min-h-screen items-center justify-center bg-zinc-800/30 backdrop-blur">
          <form
            // action={action}
            className="relative flex w-[90%] max-w-[384px] flex-col space-y-3 rounded-md bg-zinc-200 p-5 shadow md:-translate-y-32"
          >
            <InputCustom
              label="Choose a cluster by name"
              name="name"
              placeholder="Cluster name"
              // isInvalid={!!formState.errors?.name}
              // errorMessage={formState.errors?.name}
            />
            <ButtonSubmit title="Search" />
            <ButtonDismiss title="Cancel" paramToDismiss="looking" />
          </form>
        </div>
      )}
    </>
  )
}
