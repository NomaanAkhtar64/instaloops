import axios from 'axios'
import React, { useCallback, useContext, useMemo, useState } from 'react'
import { useHistory } from 'react-router'
import { API_URL } from './const'
import { loadCache } from './utils'

const df = {
  authToken: loadCache<string>('token', null),
  authError: {
    login: {},
    signup: {},
  },
  user: {
    pk: 0,
    email: '',
    username: '',
    hasLoaded: false,
    status: 'uncreated',
  },
  list: {
    data: [],
    hasLoaded: false,
  },
  consumer: {
    hasLoaded: false,
    id: 0,
    pic: '',
    user: 0,
  },
  niche: {
    hasLoaded: false,
    id: 0,
    name: '',
  },
  influencer: {
    hasLoaded: false,
    id: 0,
    user: 0,
    min_budget: 0,
    max_budget: 0,
    niche: '',
    pic: '',
    bio: '',
    about: '',
    rating: 0,
    review_count: 0,
    banner: '',
    reviews: [],
  },
  influencers: {},
}
// @ts-ignore
const storeContext = React.createContext<Store>(null)

const StoreProvider: React.FC = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(df.authToken)
  const [authError, setAuthError] = useState<AuthError>(df.authError)

  const history = useHistory()

  const [user, setUser] = useState<UserState>(df.user)
  const [banner, setBanner] = useState<BannerState>(df.list)
  const [consumer, setConsumer] = useState<ConsumerState>(df.consumer)
  const [niche, setNiche] = useState<NicheState>(df.list)
  const [influencer, setInfluencer] = useState<InfluencerState>(df.influencer)
  const [influencerList, setInfluencerList] = useState<InfluencerListState>(
    df.list
  )
  const headers = useMemo(
    () => ({
      Authorization: `Token ${authToken}`,
    }),
    [authToken]
  )
  const authLogin = useCallback(
    async (f: LoginFields) => {
      try {
        const res = await axios.post<{ key: string }>(
          `${API_URL}/rest-auth/login/`,
          f
        )
        localStorage['Token'] = res.data.key
        setAuthToken(res.data.key)
        history.push('/')
        return true
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.data) {
            let authenticationErrors: { [s: string]: string } = {
              'Unable to log in with provided credentials.':
                'The provided email or password is incorrect',
              'User account is disabled.': 'This account is blocked',
              'E-mail is not verified.': 'Account is not verified',
            }
            if ('non_field_errors' in err.response.data) {
              let msg = err.response.data['non_field_errors'][0]
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
        return false
      }
    },
    [authError, history]
  )

  const authSignup = useCallback(
    async (f: SignUpFields) => {
      try {
        await axios
          .post(`${API_URL}/rest-auth/registration/`, f)
          .then(() => history.push('/login/'))
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (
            err.response?.data.email[0] ===
              'A user is already registered with this e-mail address.' ||
            err.response?.data.username[0] ===
              'A user with that username already exists.'
          ) {
            setAuthError({
              ...authError,
              signup: { authentication: 'Account Already exists.' },
            })
          }
        }
      }
      return
    },
    [authError, history]
  )

  const authLogout = useCallback(async () => {
    localStorage.removeItem('token')
    await axios.post(`${API_URL}/rest-auth/logout/`, {}, { headers })
    setAuthToken(null)
    return
  }, [headers])

  const userFetch = useCallback(async () => {
    const res = await axios.get<User>(`${API_URL}/rest-auth/user/`, {
      headers,
    })
    setUser({ ...res.data, hasLoaded: true })
  }, [headers])

  const bannerFetch = useCallback(async () => {
    const res = await axios.get<Banner[]>(`${API_URL}/api/site/banner/`, {
      headers,
    })
    setBanner({ data: res.data, hasLoaded: true })
  }, [headers])

  const consumerFetch = useCallback(async () => {
    const res = await axios.get<Consumer>(`${API_URL}/api/social/consumer/`, {
      headers,
    })
    setConsumer({ ...res.data, hasLoaded: true })
  }, [headers])

  const nicheFetch = useCallback(async () => {
    const res = await axios.get<Niche[]>(`${API_URL}/api/social/niche/`)
    setNiche({ data: res.data, hasLoaded: true })
  }, [])

  const influencerFetch = useCallback(async () => {
    const res = await axios.get<Influencer>(
      `${API_URL}/api/social/influencer/`,
      { headers }
    )
    setInfluencer({ ...res.data, hasLoaded: true })
  }, [headers])

  const influencerListFetch = useCallback(
    async (params: InfluencerListFilterParams) => {
      const res = await axios.get<Influencer[]>(
        `${API_URL}/api/social/influencers/?${
          params.niches
            ? `niche=${params.niches.map((n) => encodeURI(n)).join(',')}`
            : ''
        }${params.search ? `search=${encodeURI(params.search)}` : ''}`
      )
      setInfluencerList({ data: res.data, hasLoaded: true })
    },
    []
  )

  const influencerRetrieveFetch = useCallback(async (id: number) => {
    const res = await axios.get<Influencer>(
      `${API_URL}/api/social/influencers/${id}/`
    )
    setInfluencerList({ data: [res.data], hasLoaded: true })
  }, [])

  return (
    <storeContext.Provider
      value={{
        auth: {
          state: {
            token: authToken,
            isAuthenticated: authToken !== null,
          },
          actions: {
            login: authLogin,
            signup: authSignup,
            logout: authLogout,
          },
          error: authError,
        },
        user: {
          state: user,
          actions: {
            fetch: userFetch,
          },
        },
        banner: {
          state: banner,
          actions: { fetch: bannerFetch },
        },
        consumer: {
          state: consumer,
          actions: { fetch: consumerFetch },
        },
        niche: {
          state: niche,
          actions: { fetch: nicheFetch },
        },
        influencer: {
          state: influencer,
          actions: { fetch: influencerFetch },
        },
        influencers: {
          state: influencerList,
          actions: {
            list: influencerListFetch,
            retrieve: influencerRetrieveFetch,
          },
        },
      }}
    >
      {children}
    </storeContext.Provider>
  )
}

const useAuth = () => useContext(storeContext)?.auth
const useUser = () => useContext(storeContext)?.user
const useBanners = () => useContext(storeContext)?.banner
const useConsumer = () => useContext(storeContext)?.consumer
const useNiche = () => useContext(storeContext)?.niche
const useInfluencer = () => useContext(storeContext)?.influencer
const useInfluencerList = () => useContext(storeContext)?.influencers

export {
  StoreProvider,
  useAuth,
  useBanners,
  useConsumer,
  useNiche,
  useUser,
  useInfluencer,
  useInfluencerList,
}
