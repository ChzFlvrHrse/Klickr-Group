import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import configureStore from "./store";
import { ModalProvider } from "./context/Modal";
import { ModalExploreProvider } from "./context/ModalExplore";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalExploreProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </ModalExploreProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
