'use client'

import { useFormState } from 'react-dom'
import { ButtonSubmit } from '../button/submit'
import { authenticate } from '@/actions/authActions'

export function LoginForm() {
  const [formState, action] = useFormState(authenticate, {
    errors: {},
  })

  return (
    <form
      action={action}
      className="my-5 flex w-[96%] max-w-xs flex-col space-y-2.5 rounded-lg border p-5 shadow"
    >
      <div className="flex flex-col space-y-2">
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          className="rounded-md border p-2 outline-none"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          placeholder="Password"
          className="rounded-md border p-2 outline-none"
        />
      </div>
      {formState?.errors.email && <span>{formState.errors.email}</span>}
      {formState?.errors.password && <span>{formState.errors.password}</span>}
      {formState?.errors._form && <span>{formState.errors._form}</span>}
      <ButtonSubmit title="Login" />
    </form>
  )
}
