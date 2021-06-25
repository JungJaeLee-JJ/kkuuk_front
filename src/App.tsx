import { useContext } from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Main from "./pages/main";
import Profile from "./pages/profile";
import NotFound from "./pages/notFound";

import {SellerContext, SellerContextProvider} from "./context/seller";

function App() {
  const {sellerInfo} = useContext<ISellerContext>(SellerContext);
  return (
    <SellerContextProvider>
    <HashRouter>
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/main" component={Main}/>
      <Route path="/profile" component={Profile}/>
      <Route component={NotFound}/>
    </Switch>
    </HashRouter>
    </SellerContextProvider>
  );
}

export default App;
