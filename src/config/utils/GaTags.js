import { error } from "./logger";
import { getOS } from "./utils";
const device = JSON.parse(process.env.REACT_APP_DEVICE);
const platform = getOS();
const environment = process.env.REACT_APP_ENVIRONMENT;
const appName = process.env.REACT_APP_GA_NAME;

export const pageLoad = (pageTitle) => {
  let pageData = {};
  try {
    pageData = {
      event: "pageload",
      // virtualPageURL: window.location.pathname,
      page_title: pageTitle,
      app_name: appName,
      env: environment,
      platform: platform == 'browser' ? "browser" : "tira",
      brand: platform,
      // ...device,
    };

    window.dataLayer.push(pageData);
  } catch (e) {
    error("Error while tracking GA Page ", e);
  }
};

export const eventClick = (event, pageTitle, params) => {
  let eventData = {};
  try {
    if (params) {
      eventData = {
        event: event,
        page_title: pageTitle,
        app_name: appName,
        env: environment,
        platform: platform == 'browser' ? "browser" : "tira",
        brand: platform,
        ...params,
        // ...device,
      };
    } else {
      eventData = {
        event: event,
        page_title: pageTitle,
        app_name: appName,
        env: environment,
        platform: platform == 'browser' ? "browser" : "tira",
        brand: platform,
        // ...device,
      };
    }
    window.dataLayer.push(eventData);
  } catch (e) {
    error("Error while tracking Event ", e);
  }
};

export const eventTrack = (event, pageTitle, params) => {
  let eventData = {};
  try {
    if (params) {
      eventData = {
        event: event,
        page_title: pageTitle,
        app_name: appName,
        env: environment,
        platform: platform == 'browser' ? "browser" : "tira",
        brand: platform,
        ...params,
        // ...device,
      };
    } else {
      eventData = {
        event: event,
        page_title: pageTitle,
        app_name: appName,
        env: environment,
        platform: platform == 'browser' ? "browser" : "tira",
        brand: platform,
        // ...device,
      };
    }
    window.dataLayer.push(eventData);
  } catch (e) {
    error("Error while tracking Event ", e);
  }
};

export const eventClickCoins = (action, params) => {
  let eventData = {};
  try {
    if (params) {
      eventData = {
        event: "engageCoins",
        new_Category: "Engage Points",
        new_Action: action,
        new_Label: "Engage | Points",
        ...params,
      };
    }
    window.dataLayer.push(eventData);
  } catch (e) {
    error("Error while tracking Event ", e);
  }
};
