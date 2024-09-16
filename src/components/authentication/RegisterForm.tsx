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
import { register } from '@/actions/authentication/register'
import { ButtonFormSubmit } from '../common/Buttons'
import { DisplayFormStateError } from '../common/DisplayFormStateError'

export function RegisterForm() {
  const [formState, action] = useFormState(register, { errors: {} })
  const { replace } = useRouter()

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
            onClick={() => replace('/login')}
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
