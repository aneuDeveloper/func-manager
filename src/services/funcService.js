import axios from "axios";
import getApiBase from "../config";
import { toast } from "react-toastify";

export async function retryFunc(id) {
  console.log("Retry func=" + id);
  const baseApiUrl = getApiBase();
}

export async function submitFunction(func) {
  let url =
    getApiBase() +
    `submitFunction?source_topic=${func.source_topic}` +
    `&processName=${func.processName}` +
    `&processInstanceID=${func.processInstanceID}` +
    `&func=${func.func}` +
    `&func_type=${func.func_type}`;
  if (func.coming_from_id != null) {
    url += `&comingFromId=${func.coming_from_id}`;
  }
  try {
    const response = await axios.post(url, func.kafka_message, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    toast.error(error);
  }
}
