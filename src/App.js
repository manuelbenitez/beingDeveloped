import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './components/auth/auth';
import Login from './components/auth/Login';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Dashboard}></Route>
          <Route exact path='/login' component={Login}></Route>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
