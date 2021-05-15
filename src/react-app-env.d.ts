/// <reference types="react-scripts" />

interface StoreItemWithError<S, A, E> {
  state: S
  action: A
  error: E
}
interface StoreItem<S, A> {
  state: S
  action: A
}
type withLoad<T> = T & {
  hasLoaded: boolean
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

interface User {
  pk: number
  username: string
  email: string
}
type UserState = withLoad<User>
interface UserActions {
  fetch: () => void
}

interface Banner {
  id: number
  image: string
  link: string
}
type BannerState = withLoad<{ data: Banner[] }>
interface BannerActions {
  fetch: () => void
}

interface Consumer {
  id: number
  user: number
  pic: string
}
type ConsumerState = withLoad<Consumer>
interface ConsumerActions {
  fetch: () => void
}

interface Reviews {
  id: number
  consumer: number | null
  influencer: number | null
  title: string
  text: string
  is_public: boolean
}

interface Influencer {
  id: number
  user: number
  min_budget: number
  max_budget: number
  niche: string
  pic: string
  banner: string
  bio: string
  about: string
  rating: number
  review_count: number
  reviews: Reviews[]
}

interface Store {
  auth: StoreItemWithError<AuthState, AuthActions, AuthError>
  user: StoreItem<UserState, UserActions>
  banner: StoreItem<BannerState, BannerActions>
  consumer: StoreItem<ConsumerState, ConsumerActions>
}
