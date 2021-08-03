import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./components/auth/auth";
import { theme } from './theme/theme'
import { ThemeProvider } from "@material-ui/styles";

import Dashboard from "./components/Dashboard";
import Login from "./components/auth/Login";

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Dashboard}></Route>
            <Route exact path="/login" component={Login}></Route>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
