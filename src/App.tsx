import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./screens/Home";
import InfluencerDetail from "./screens/InfluencerDetail";
import Login from "./screens/Login";
import Settings from "./screens/Settings";
import Signup from "./screens/Signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route exact path="/influencer/:id" component={InfluencerDetail} />
          <Route exact path="/login/" component={Login} />
          <Route exact path="/signup/" component={Signup} />
          <Route exact path="/settings/" component={Settings} />
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
