import axios from "axios";
import getApiBase from "../config";

export async function retryFunc(id) {
  console.log("Retry func=" + id);
  const baseApiUrl = getApiBase();
}
