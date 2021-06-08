import React from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Main from "./pages/main";
import Profile from "./pages/profile";
import NotFound from "./pages/notFound";

function App() {
  return (
    <HashRouter>
    <Switch>
      <Route exact path="/"  component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/main" component={Main}/>
      <Route path="/profile" component={Profile}/>
      <Route component={NotFound}/>
    </Switch>
    </HashRouter>
  );
}

export default App;
