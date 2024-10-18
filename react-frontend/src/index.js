import ReactDOM from "react-dom";

import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";

import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import "./index.css";

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 3000,
  transition: transitions.FADE,
};

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById("root")
);
