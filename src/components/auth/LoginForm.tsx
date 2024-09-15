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

export function LoginForm() {
  const { replace } = useRouter()

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Finance Track</CardTitle>
        <CardDescription>
          Your Path to Smarter Financial Management.
        </CardDescription>
      </CardHeader>
      <form>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter your e-mail address"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={() => replace('/create-account')}
            type="button"
            variant="link"
          >
            Create account
          </Button>
          <Button type="submit">Login</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
