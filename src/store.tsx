import axios from 'axios'
import React, { useContext, useState } from 'react'
import { API_URL } from './const'
import { loadCache } from './utils'

const storeContext = React.createContext<Store | null>(null)

const df = {
  authToken: loadCache<string>('token', null),
  authError: {
    login: {},
    signup: {},
  },
}

const StoreProvider: React.FC = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(df.authToken)
  const [authError, setAuthError] = useState<AuthError>(df.authError)

  const [user, setUser] = useState<UserState>({
    pk: 0,
    email: '',
    username: '',
    hasLoaded: false,
  })
  const [banner, setBanner] = useState<BannerState>({
    data: [],
    hasLoaded: false,
  })
  const [consumer, setConsumer] = useState<ConsumerState>({
    hasLoaded: false,
    id: 0,
    pic: '',
    user: 0,
  })

  const authLogin = async (f: LoginFields) => {
    try {
      const res = await axios.post<{ key: string }>(
        `${API_URL}/rest-auth/login/`
      )
      setAuthToken(res.data.key)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data) {
          let authenticationErrors: { [s: string]: string } = {
            'Unable to log in with provided credentials.':
              'The provided email or password is incorrect',
            'User account is disabled.': 'This account is blocked',
            'E-mail is not verified.': 'Account is not verified',
          }
          let msg = err.response.data
          if (typeof msg === 'string') {
            if (authenticationErrors.hasOwnProperty(msg)) {
              setAuthError({
                ...authError,
                login: { authentication: authenticationErrors[msg] },
              })
            }
          }
        }
      }
    }
  }

  const authSignup = async (f: SignUpFields) => {
    try {
      await axios.post(`${API_URL}/rest-auth/registration/`)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        let msg = err.response?.data
        if (msg === 'A user is already registered with this e-mail address.') {
          setAuthError({
            ...authError,
            signup: { authentication: 'Account Already exists.' },
          })
        }
      }
    }
    return
  }

  const authLogout = async () => {
    return await axios.post(`${API_URL}/rest-auth/logout/`)
  }

  const userFetch = async () => {
    const res = await axios.get<{
      pk: number
      username: string
      email: string
    }>(`${API_URL}/rest-auth/user/`)
    setUser({ ...res.data, hasLoaded: true })
  }

  const bannerFetch = async () => {
    const res = await axios.get<Banner[]>(`${API_URL}/api/site/banner/`)
    setBanner({ data: res.data, hasLoaded: true })
  }

  const consumerFetch = async () => {
    const res = await axios.get<Consumer>(`${API_URL}/api/social/consumer/`)
    setConsumer({ ...res.data, hasLoaded: true })
  }

  return (
    <storeContext.Provider
      value={{
        auth: {
          state: {
            token: authToken,
            isAuthenticated: authToken !== null,
          },
          action: {
            login: authLogin,
            signup: authSignup,
            logout: authLogout,
          },
          error: authError,
        },
        user: {
          state: user,
          action: {
            fetch: userFetch,
          },
        },
        banner: {
          state: banner,
          action: { fetch: bannerFetch },
        },
        consumer: {
          state: consumer,
          action: { fetch: consumerFetch },
        },
      }}
    >
      {children}
    </storeContext.Provider>
  )
}

const useAuth = () => useContext(storeContext)?.auth

export { StoreProvider }
