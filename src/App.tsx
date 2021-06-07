import React from 'react';
import { HashRouter, Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import SignUp from "./components/signup";
import Main from "./components/main";

function App() {
  return (
    <HashRouter>
      <Route path="/"  exact={true} component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/main" component={Main}/>
    </HashRouter>
  );
}

export default App;
