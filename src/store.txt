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
    const res = await axios.get<{ username: string; email: string }>(
      '/rest-auth/user/'
    )
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
          action: {},
          error: {},
        },
      }}
    >
      {children}
    </storeContext.Provider>
  )
}

const useAuth = () => useContext(storeContext)?.auth

export { StoreProvider }
