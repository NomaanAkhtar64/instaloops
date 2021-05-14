/// <reference types="react-scripts" />

interface StoreItem<S, A, E> {
  state: S
  action: A
  error: E
}

interface AuthState {
  isAuthenticated: boolean
  token: string | null
}
interface LoginFields {
  email: string
  password: string
}
interface SignUpFields {
  email: string
  password1: string
  password2: string
}
interface AuthActions {
  login: (f: LoginFields) => void
  logout: () => void
  signup: (f: SignUpFields) => Promise<void>
}
interface AuthError {
  login: {
    authentication?: string
  }
  signup: {
    authentication?: string
  }
}
interface UserState extends User {
  pk: number
  username: string
  email: string
  hasLoaded: boolean
}
interface UserActions {
  fetch: () => void
}

interface Store {
  auth: StoreItem<AuthState, AuthActions, AuthError>
  user: StoreItem<UserState, UserActions, {}>
}
