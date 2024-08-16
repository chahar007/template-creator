import './App.scss';
import React, { useEffect, useCallback } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AppContext, APP_CONSTANTS } from "./config/utils/AppContext";
import { Provider } from 'react-redux';
import store from './config/redux/store';

import AppRoute from './config/routes/route';

function App() {

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
