import styled from "styled-components";
import { useParams } from "react-router-dom";
import getApiBase from "../config"
import axios from "axios"
import {  defer } from "react-router-dom"

export const hitlistLoader = async ({ params }) => {
    console.log("Get function with json=" + JSON.stringify(params))
    const baseApiUrl = getApiBase()
    const response = await axios.get(baseApiUrl + "functions/" + params.funcId, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    console.log("Got result json=" + JSON.stringify(response))
    return defer(response)
  }

export default function HitListFilter() {
  const { processInstanceId, datefrom } = useParams();

  return (
    <span>
      <span className="rounded-button" title="Refresh">
        <span className="material-symbols-outlined">refresh</span>
      </span>
      ProcessIntandeId={processInstanceId}
      datefrom={datefrom}
    </span>
  );
}
