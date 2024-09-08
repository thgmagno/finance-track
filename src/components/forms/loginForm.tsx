'use client'

import { useFormState } from 'react-dom'
import { ButtonSubmit } from '../button/submit'
import { authenticate } from '@/actions/authActions'
import { InputCustom } from '@/components/input/inputCustom'

export function LoginForm() {
  const [formState, action] = useFormState(authenticate, {
    errors: {},
  })

  return (
    <form
      action={action}
      className="my-5 flex w-[96%] max-w-xs flex-col space-y-2.5 rounded-lg border bg-zinc-100 p-5 shadow"
    >
      <InputCustom
        label="E-mail"
        type="email"
        name="email"
        placeholder="E-mail"
        isInvalid={!!formState.errors?.email}
        errorMessage={formState.errors?.email}
      />
      <InputCustom
        label="Password"
        type="password"
        name="password"
        placeholder="Password"
        isInvalid={!!formState.errors?.password}
        errorMessage={formState.errors?.password}
      />
      <ButtonSubmit title="Login" />
    </form>
  )
}
