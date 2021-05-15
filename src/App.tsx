import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Layout from './layout'
import Home from './screens/Home'
import Login from './screens/Login'
import Signup from './screens/Signup'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Layout>
          <Route exact path='/' component={Home} />
          <Route exact path='/login/' component={Login} />
          <Route exact path='/signup/' component={Signup} />
        </Layout>
      </BrowserRouter>
    </div>
  )
}

export default App
