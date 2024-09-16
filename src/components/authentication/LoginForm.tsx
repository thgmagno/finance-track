'use client'

import * as React from 'react'

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
import { useRouter } from 'next/navigation'
import { useFormState } from 'react-dom'
import { login } from '@/actions/authentication/login'
import { ButtonFormSubmit } from '../common/Buttons'
import { DisplayFormStateError } from '../common/DisplayFormStateError'

export function LoginForm() {
  const [formState, action] = useFormState(login, { errors: {} })
  const { replace } = useRouter()

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
            onClick={() => replace('/create-account')}
            type="button"
            variant="link"
          >
            Create account
          </Button>
          <ButtonFormSubmit title="Login" className="min-w-[67.47px]" />
        </CardFooter>
      </form>
    </Card>
  )
}
