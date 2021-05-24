import React, { useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Spinner from "./components/Spinner";
import Layout from "./layout";
import ChatRoom from "./screens/ChatRoom";
import Error404 from "./screens/Error404";
import Home from "./screens/Home";
import InfluencerDetail from "./screens/InfluencerDetail";
import Login from "./screens/Login";
import Settings from "./screens/Settings";
import Signup from "./screens/Signup";
import { useAuth, useUser } from "./store";

function App() {
  const auth = useAuth();
  const user = useUser();
  useEffect(() => {
    if (auth.state.isAuthenticated) {
      user.actions.fetch();
    }
  }, [auth.state.isAuthenticated]);
  
  const routes = (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/influencer/:id" component={InfluencerDetail} />
      {auth.state.isAuthenticated ? (
        <>
        <Route exact path="/settings/" component={Settings} />
        <Route exact path="/direct/" component={ChatRoom} />
        </>
      ) : (
        <>
          <Route exact path="/login/" component={Login} />
          <Route exact path="/signup/" component={Signup} />
        </>
      )}

      <Route exact path="/404/" component={Error404} />
      <Redirect path="*" to="/404/" />
    </Switch>
  );
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          {auth.state.isAuthenticated ? (
            user.state.hasLoaded ? (
              routes
            ) : (
              <Spinner />
            )
          ) : (
            routes
          )}
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
