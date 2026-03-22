import axios from "axios";
import getApiBase from "./config";
import { getFromStorage } from "./utils/storage";

let isRefreshing = false;
let refreshQueue: Array<(newToken: string) => void> = [];
let accessToken: string = "";
let refreshToken: string = "";
let showLoginScreen: () => void;

export function setShowLoginPage(aShowLoginPage: () => void) {
  showLoginScreen = aShowLoginPage;
}

const api = axios.create({
  baseURL: getApiBase(),
});
export default api;

export function doLogout() {
  accessToken = "";
  refreshToken = "";
  showLoginScreen();
}

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const res = await api.post("/auth/refresh", {
            refreshToken,
          });
          accessToken = res.data.accessToken;
          refreshToken = res.data.refreshToken;
          refreshQueue.forEach((cb) => cb(res.data.accessToken));
          refreshQueue = [];
          isRefreshing = false;
          originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
          return api(originalRequest);
        } catch (err) {
          isRefreshing = false;
          refreshQueue = [];
          doLogout();
          return Promise.reject(err);
        }
      }

      return new Promise((resolve) => {
        refreshQueue.push((newAccessToken: string) => {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          resolve(api(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  },
);

export async function retryFunc(id: string) {
  console.log("Retry func=" + id);
  const baseApiUrl = getApiBase();
}

export async function submitFunction(func: any) {
  let url =
    getApiBase() +
    `functions?source_topic=${func.source_topic}` +
    `&processName=${func.processName}` +
    `&processInstanceID=${func.processInstanceID}` +
    `&func=${func.func}` +
    `&func_type=${func.func_type}`;
  if (func.coming_from_id != null) {
    url += `&comingFromId=${func.coming_from_id}`;
  }
  const response = await axios.post(url, func.kafka_message, {
    headers: {
      "Content-Type": "text/plain",
      authorization: "Bearer " + getFromStorage("token"),
    },
    timeout: 5000,
  });
  console.info("status was=" + response.status);
  if (response.status >= 400) {
    throw new Error("Error ocured");
  }
}

export async function getFunction(funcId: string) {
  const response = await axios.get(getApiBase() + "functions/" + funcId, {
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + getFromStorage("token"),
    },
  });
  console.info("got response " + JSON.stringify(response.data));
  const functionResponse = response.data;
  return functionResponse;
}

export async function search(freetext: string, processInstanceId: string) {
  const bearer = "Bearer " + getFromStorage("token");

  // let searchValues = new Map();
  let searchValues: { [key: string]: any } = {};
  if (freetext != null && freetext !== "") {
    searchValues["freetext"] = freetext;
  }
  if (processInstanceId != null && processInstanceId !== "") {
    searchValues["processInstanceId"] = processInstanceId;
  }
  const requestBody = JSON.stringify(searchValues);
  const response = await axios
    .post(getApiBase() + "functions/search", requestBody, {
      headers: {
        "Content-Type": "application/json",
        authorization: bearer,
      },
    })
    .catch(function (error) {
      console.log("cauth error " + JSON.stringify(error.toJSON()));
    });
  if (response == null) {
    return {};
  }
  const funcList = response.data.result;
  return funcList;
}
// console.log("onOpenWorkflow called " + functionHit.data.id);
//     const response = await axios.get(getApiBase() + "workflow/" + functionHit.data.process_instanceid + "/functions");
//     functionHit.workflowFunctions = response.data.result;
//     for (let func of functionHit.workflowFunctions) {
//       let timeStamp = new Date(Number(func.time_stamp));
//       func.time_stamp = timeStamp.toLocaleString();
//     }
