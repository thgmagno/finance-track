export interface AuthFormState {
  errors: {
    email?: string[]
    password?: string[]
    _form?: string
  }
}

export interface CreateAccountFormState {
  errors: {
    name?: string[]
    email?: string[]
    password?: string[]
    _form?: string
  }
}
