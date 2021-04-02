import { BrowserRouter, Route } from 'react-router-dom';
import Profile from './Component/Profile';
import Signin from './Component/Signin';
import Signup from './Component/signup';
import Admin from './Component/Admin';

//import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Preferences from './Component/Preferences';

function App() {
  const options = {
    timeout: 5000,
    position: positions.BOTTOM_CENTER,
  };
  return (
    <BrowserRouter>
      <AlertProvider template={AlertTemplate} {...options}>
        <Route exact path='/' component={Signup} />
        <Route exact path='/login' component={Signin} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/admin' component={Admin} />
        <Route exact path='/preferences' component={Preferences} />
      </AlertProvider>
    </BrowserRouter>
  );
}

export default App;
