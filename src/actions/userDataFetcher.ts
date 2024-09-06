'use server'

import { LoginSchema } from '@/lib/schemas'
import { LoginFormState } from '@/lib/states'
import { UserData } from '@/lib/types/users'
import { AuthService } from '@/services/authService'
import { kv } from '@vercel/kv'
import * as bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'

export async function fetchUser(username: string): Promise<UserData | null> {
  const user = await kv.hget<UserData>('user', username)
  return user ? JSON.parse(JSON.stringify(user)) : null
}

export async function fetchAllUsers(): Promise<UserData[]> {
  const usersRecord = await kv.hgetall<Record<string, UserData>>('user')
  const users = usersRecord ? Object.values(usersRecord) : []
  return users
}

export async function login(
  formState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const parsed = LoginSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const user = await fetchUser(parsed.data.username)

    if (!user) {
      return {
        errors: { username: ['Usuário inválido'] },
      }
    }

    const passwordMatch = await bcrypt.compare(
      parsed.data.password,
      user.password,
    )

    if (!passwordMatch) {
      return {
        errors: { password: ['Senha inválida'] },
      }
    }

    const payload = { username: parsed.data.username }

    await AuthService.createSessionToken(payload)
  } catch (err) {
    return {
      errors: {
        _form: 'Não foi possível estabeler uma conexão com o servidor',
      },
    }
  }

  redirect('/')
}
