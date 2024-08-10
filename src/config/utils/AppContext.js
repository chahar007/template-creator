import React from "react";

const APP_CONSTANTS = {
  lang: "",
  params: {},
  token: {},
  user: {},
  jwt: ""
};

const AppContext = React.createContext(APP_CONSTANTS);

export { AppContext, APP_CONSTANTS };
