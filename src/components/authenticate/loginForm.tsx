'use client'

import { useFormState } from 'react-dom'
import { ButtonSubmit } from '../button/submit'
import { login } from '@/actions/userDataFetcher'

export function LoginForm() {
  const [formState, action] = useFormState(login, {
    errors: {},
  })

  return (
    <form
      action={action}
      className="my-5 flex w-[96%] max-w-xs flex-col space-y-2.5 rounded-lg border p-5 shadow"
    >
      <div className="flex flex-col space-y-2">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
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
      <ButtonSubmit title="Login" />
    </form>
  )
}
