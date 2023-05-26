import axios from "axios";
import getApiBase from "../config";
import { getFromStorage, saveToStorage } from "../utils/storage";

export async function retryFunc(id) {
  console.log("Retry func=" + id);
  const baseApiUrl = getApiBase();
}

export async function submitFunction(func) {
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
      Authorization: "Bearer " + getFromStorage("token"),
    },
    timeout: 5000,
  });
  console.info("status was=" + response.status);
  if (response.status >= 400) {
    throw new Error("Error ocured");
  }
}
