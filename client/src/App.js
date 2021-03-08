
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./Component/signup";

function App() {
  return (
    <BrowserRouter>
      <Switch>

        <Route path='/' component={Signup} />
        <Route path='/login' component={Signup} />

      </Switch>
    </BrowserRouter>
  );


};

export default App;
