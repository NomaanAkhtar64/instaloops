import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Layout from './layout'
import Error404 from './screens/Error404'
import Home from './screens/Home'
import InfluencerDetail from './screens/InfluencerDetail'
import Login from './screens/Login'
import Settings from './screens/Settings'
import Signup from './screens/Signup'
import { useAuth } from './store'

function App() {
  const auth = useAuth()
  return (
    <div className='App'>
      <BrowserRouter>
        <Layout>
          <Switch>
            {/* <Route exact path="/" */}
            <Route exact path='/' component={Home} />
            <Route exact path='/influencer/:id' component={InfluencerDetail} />
            {auth.state.isAuthenticated ? (
              <Route exact path='/settings/' component={Settings} />
            ) : (
              <>
                <Route exact path='/login/' component={Login} />
                <Route exact path='/signup/' component={Signup} />
              </>
            )}

            <Route exact path='/404/' component={Error404} />
            <Redirect path='*' to='/404/' />
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  )
}

export default App
