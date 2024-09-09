'use client'

import { useFormState } from 'react-dom'
import { ButtonSubmit } from '../button/submit'
import { createAccountAndSessionToken } from '@/actions/authActions'
import { InputCustom } from '@/components/input/inputCustom'
import Link from 'next/link'

export function CreateAccountForm() {
  const [formState, action] = useFormState(createAccountAndSessionToken, {
    errors: {},
  })

  return (
    <form
      action={action}
      className="my-5 flex w-[96%] max-w-xs flex-col space-y-2.5 rounded-lg border bg-zinc-100 p-5 shadow"
    >
      <InputCustom
        label="Name"
        name="name"
        placeholder="Name"
        isInvalid={!!formState.errors?.name}
        errorMessage={formState.errors?.name}
      />
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
      <ButtonSubmit title="Create account" />
      <span className="relative top-1.5 mx-auto text-sm">
        Already have an account?{' '}
        <Link href="/login" className="font-medium hover:underline">
          Sign-in
        </Link>
      </span>
    </form>
  )
}
