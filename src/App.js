import './App.css';
import {BrowserRouter, Route, Switch, useHistory} from "react-router-dom";
import {ThemeProvider} from "@material-ui/core";
import Theme from './Component/Theme'
import LoginPage from "./Page/LoginPage";
import SingUpPage from "./Page/SingUpPage";
import MainPage from "./Page/MainPage";
import HomePage from "./Page/HomePage";

function App() {
  let history = useHistory();
  return (
      <ThemeProvider theme={Theme}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/signup" component={SingUpPage} />
            <Route path="/main" component={MainPage}/>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
