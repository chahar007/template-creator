import './App.scss';
import React, { useEffect, useCallback } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AppContext, APP_CONSTANTS } from "./config/utils/AppContext";
import { Provider } from 'react-redux';
import store from './config/redux/store';

import AppRoute from './config/routes/route';

function App() {

  useEffect(() => {
    let token = getParameterByName('jwt');
    APP_CONSTANTS.token.jwt = token
  }, []);


  const getParameterByName = useCallback((name, url) => {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    const results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return "";
    }
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }, []);



  return (
    <React.Fragment>
      <Provider store={store}>
        <AppContext.Provider value={APP_CONSTANTS}>
          <AppRoute />
          <ToastContainer />
        </AppContext.Provider>
      </Provider>
    </React.Fragment>
  );
}

export default App;
