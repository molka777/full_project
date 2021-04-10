import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./JS/store";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/plugins/nucleo/css/nucleo.css";
import "./assets/css/argon-dashboard-react.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
