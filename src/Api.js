import axios from "axios";
import getApiBase from "./config";
import { getFromStorage } from "./utils/storage";

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
      authorization: "Bearer " + getFromStorage("token"),
    },
    timeout: 5000,
  });
  console.info("status was=" + response.status);
  if (response.status >= 400) {
    throw new Error("Error ocured");
  }
}

export async function getFunction(funcId) {
  const response = await axios.get(getApiBase() + "functions/" + funcId, {
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + getFromStorage("token"),
    },
  });
  const functionResponse = response.data.result;
  return functionResponse;
}

export async function search(freetext) {
  const bearer = "Bearer " + getFromStorage("token");
  console.info("bearer " + bearer);
  const response = await axios
    .post(getApiBase() + "functions/search", JSON.stringify({ freetext: freetext }), {
      headers: {
        "Content-Type": "application/json",
        authorization: bearer,
      },
    })
    .catch(function (error) {
      console.log("cauth error " + JSON.stringify(error.toJSON()));
      window.location = "/login";
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
