import { BrowserRouter, Route } from "react-router-dom";
import Profile from "./Component/Profile";
import Signin from "./Component/Signin";
import Signup from "./Component/Signup";
//import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import { positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

function App() {
  const options = {
    timeout: 5000,
    position: positions.BOTTOM_CENTER
  };
  return (
    <BrowserRouter>


      <AlertProvider template={AlertTemplate} {...options} >
        <Route exact path='/' component={Signup} />
        <Route exact path='/login' component={Signin} />
        <Route exact path='/profile' component={Profile} />

      </AlertProvider>


    </BrowserRouter>
  );


};

export default App;
