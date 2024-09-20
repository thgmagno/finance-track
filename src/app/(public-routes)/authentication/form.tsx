'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from 'react-dom'
import { DisplayFormStateError } from '@/components/common/DisplayFormStateError'
import { ButtonFormSubmit } from '@/components/common/Buttons'
import { register } from '@/actions/authentication/register'
import { login } from '@/actions/authentication/login'

type AuthenticationModes = 'login' | 'register'

export function AuthenticationForm() {
  const [mode, setMode] = useState<AuthenticationModes>('login')
  const onRegister = mode === 'register'

  if (onRegister) {
    return <RegisterForm setMode={setMode} />
  }

  return <LoginForm setMode={setMode} />
}

function RegisterForm({
  setMode,
}: {
  setMode: (mode: AuthenticationModes) => void
}) {
  const [formState, action] = useFormState(register, { errors: {} })

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>
          Start Your Journey to Financial Freedom Today!
        </CardDescription>
      </CardHeader>
      <form action={action}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Enter your name" />
              <DisplayFormStateError message={formState.errors?.name} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your e-mail address"
              />
              <DisplayFormStateError message={formState.errors?.email} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
              />
              <DisplayFormStateError message={formState.errors?.password} />
            </div>
          </div>
          <DisplayFormStateError message={formState.errors?._form} />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={() => setMode('login')}
            type="button"
            variant="link"
            className="p-0"
          >
            Return to login
          </Button>
          <ButtonFormSubmit title="Register" className="min-w-[83.52px]" />
        </CardFooter>
      </form>
    </Card>
  )
}

function LoginForm({
  setMode,
}: {
  setMode: (mode: AuthenticationModes) => void
}) {
  const [formState, action] = useFormState(login, { errors: {} })

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Finance Track</CardTitle>
        <CardDescription>
          Your Path to Smarter Financial Management.
        </CardDescription>
      </CardHeader>
      <form action={action}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your e-mail address"
              />
              <DisplayFormStateError message={formState.errors?.email} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
              />
              <DisplayFormStateError message={formState.errors?.password} />
            </div>
          </div>
          <DisplayFormStateError message={formState.errors?._form} />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={() => setMode('register')}
            type="button"
            variant="link"
            className="p-0"
          >
            Create account
          </Button>
          <ButtonFormSubmit title="Login" className="min-w-[67.47px]" />
        </CardFooter>
      </form>
    </Card>
  )
}
