import axios from "axios"
import getApiBase from "./config"
import { getFromStorage } from "./utils/storage"

export async function newFunction(func) {
  const params = {
    process_name: func.process_name,
    process_instance_id: func.process_instance_id,
    to_topic: func.to_topic,
    func: func.func
  }
  if (func.type != null) {
    Object.assign(params, { type: func.type })
  }
  if (func.coming_from_id != null) {
    Object.assign(params, { coming_from_id: func.coming_from_id })
  }

  let url = getApiBase() + `functions?` + new URLSearchParams(params).toString()

  const response = await axios.post(url, func.kafka_message, {
    headers: {
      "Content-Type": "text/plain",
      authorization: "Bearer " + getFromStorage("token"),
    },
    timeout: 5000,
  })
  console.info("status was=" + response.status)
  if (response.status >= 400) {
    throw new Error("Error ocured")
  }
}

export async function getFunction(funcId) {
  const response = await axios.get(getApiBase() + "functions/" + funcId, {
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + getFromStorage("token"),
    },
  })
  console.info("got response " + JSON.stringify(response.data))
  const functionResponse = response.data
  return functionResponse
}

export async function search(freetext, processInstanceId) {
  const bearer = "Bearer " + getFromStorage("token")

  // let searchValues = new Map();
  let searchValues = {}
  if (freetext != null && freetext !== "") {
    searchValues["freetext"] = freetext
  }
  if (processInstanceId != null && processInstanceId !== "") {
    searchValues["processInstanceId"] = processInstanceId
  }
  const requestBody = JSON.stringify(searchValues)
  const response = await axios
    .post(getApiBase() + "functions/search", requestBody, {
      headers: {
        "Content-Type": "application/json",
        authorization: bearer,
      },
    })
    .catch(function (error) {
      console.log("cauth error " + JSON.stringify(error.toJSON()))
      window.location = "/login"
    })
  if (response == null) {
    return {}
  }
  const funcList = response.data.result
  return funcList
}
