import React from "react";

const APP_CONSTANTS = {
  token: {
    jwt: '',
  },
  lang: "",
  params: {},
};

const AppContext = React.createContext(APP_CONSTANTS);

export { AppContext, APP_CONSTANTS };
