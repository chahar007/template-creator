import { APP_CONSTANTS } from "./AppContext";
import { error, log } from "./logger";

import PubSub from "pubsub-js";
import { getOS } from "./utils";
import axios from "axios";

export const launchBrowser = (url) => {
  externalCall(
    btoa(
      JSON.stringify({
        type: "launchbrowser",
        value: url,
      })
    )
  );
};

export const sendLoadComplete = () => {
  externalCall(
    btoa(
      JSON.stringify({
        type: "loadingCompleted",
      })
    )
  );
};

export const openSToreRating = () => {
  let value = getOS() === "ios" ? "rating" : "rating";
  externalCall(
    btoa(
      JSON.stringify({
        type: value,
      })
    )
  );
};

export const sendNativeBackControl = (data) => {
  externalCall(
    btoa(
      JSON.stringify({
        type: "handleWebviewBack",
        value: data,
      })
    )
  );
};

export const requestJWT = () => {
  externalCall(
    btoa(
      JSON.stringify({
        type: "jwt",
      })
    )
  );
};

export const close = () => {
  externalCall(
    btoa(
      JSON.stringify({
        type: "close",
      })
    )
  );
};

export const requestAdParams = () => {
  externalCall(
    btoa(
      JSON.stringify({
        type: "adparams",
      })
    )
  );
};
export const requestToUpdateEngagePoints = () => {
  externalCall(
    btoa(
      JSON.stringify({
        type: "updateEngagePoints",
      })
    )
  );
};
const externalCall = (data) => {
  try {
    if (window.android && window.android.__externalCall) {
      window.android.__externalCall(data);
    }
    if (window.__externalCall) {
      window.__externalCall(data);
    }
    window.webkit.messageHandlers.callback.postMessage(data);
  } catch (e) {
    error("external call failed");
  }
};

window.sendJwt = (jwt) => {
  let appContext = APP_CONSTANTS;
  appContext.token.jwt = jwt;
};

window.handleBackKey = () => {
  PubSub.publish("header", {});
};

window.sendAdParams = (params) => {
  // params will have latitude, longitude, Adid, OS
  var adParams;

  try {
    if (typeof params === "string") {
      adParams = JSON.parse(params);
    } else {
      adParams = params;
    }
  } catch (error) {
    console.log(error);
  }
  let payload = { location_content: adParams };

  axios
    .post(process.env.REACT_APP_API_HOST + "/my_profile", payload)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
  window.JioAds.setConfiguration({
    ifa: adParams.Adid,
    reqType: "prod", //stg, prod
    ai: "com.jio.mq",
    logLevel: 1,
    adRequestTimeout: 6000,
    adRenderingTimeout: 5000,
    la: adParams.latitude,
    lo: adParams.longitude,
    platform: getOS() === "ios" ? "io" : "an",
    os: getOS() === "ios" ? 2 : 1,
    acc: 0,
    gts: 0,
    clkSelf: 1,
    globalMetaData: {
      origin: "MYJIO",
    },
  });

  window.AD_USER = {
    userIfa: adParams.Adid,
    city: "",
  };

  window.AD_INFO = {
    lat: adParams.latitude,
    lng: adParams.longitude,
  };

  log(
    "Adid passed to JioAds " +
    JSON.stringify({ ...window.AD_USER, ...window.AD_INFO })
  );
};
// window.sendAdParams = params => {
//     console.log("Params from sendAdParams for Adid" + JSON.stringify(params));

//     this.appService.setLOcationCords(adParams.latitude, adParams.longitude);
//     this.appService.setParamsData(adParams);
//     // }

//   };

if (window.ADSDKEXT) {
  window.ADSDKEXT = {};
  window.ADSDKEXT.click_handler = (url) => launchBrowser(url);
}
