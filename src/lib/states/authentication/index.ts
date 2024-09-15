export interface LoginFormState {
  errors: {
    email?: string[]
    password?: string[]
    _form?: string
  }
}

export interface RegisterFormState {
  errors: {
    name?: string[]
    email?: string[]
    password?: string[]
    _form?: string
  }
}
