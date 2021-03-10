
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Profile from "./Component/Profile";
import Signin from "./Component/Signin";
import Signup from "./Component/Signup";
//import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Switch>

        <Route exact path='/' component={Signup} />
        <Route exact path='/login' component={Signin} />
        <Route exact path='/profile' component={Profile} />

      </Switch>
    </BrowserRouter>
  );


};

export default App;
