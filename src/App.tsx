import { useContext } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Main from "./pages/main";
import Profile from "./pages/profile";
import Client from "./pages/client";
import NotFound from "./pages/notFound";
import './App.css';
import {SellerContext, SellerContextProvider} from "./context/seller";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#FF7473',
      main: '#FF7473',
      dark: '#FF7473',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

function App() {
  const {sellerInfo} = useContext<ISellerContext>(SellerContext);
  return (
    <SellerContextProvider>
      <ThemeProvider theme={theme}>
    <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/main" component={Main}/>
      <Route path="/client/1" component={Client}/>
      <Route component={NotFound}/>
    </Switch>
    </BrowserRouter>
      </ThemeProvider>
    </SellerContextProvider>
  );
}

export default App;
