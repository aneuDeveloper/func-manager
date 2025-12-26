import { defer, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { FunctionHit } from "./../model/FunctionHit";
import styled from "styled-components";
import { search } from "../Api2";
// import FunctionView from "./FunctionView";
import { useState } from "react";
import { getSearchParam } from "../UrlParams";

const HitListDiv = styled.div`
  .hitlist-filter {
    margin: 5px;
  }
`;

export const hitListLoader = async ({ request, params }) => {
  const freetext = getSearchParam(request.url, "q");
  const processInstanceId = getSearchParam(request.url, "processInstanceId");
  let funcArr = [];

  try {
    const funcList = await search(freetext, processInstanceId);
    for (let func of funcList) {
      let timeStamp = new Date(Number(func.time_stamp));
      func.time_stamp = timeStamp.toLocaleString();

      const functionHit = new FunctionHit();
      functionHit.data = func;
      // functionHit.detailVisible = false;
      funcArr.push(functionHit);
    }

    console.info("Putting json=" + JSON.stringify(funcArr));
  } catch (error) {
    toast.error(error);
  }
  return defer({ result: funcArr });
};

export default function HitList() {
  const functions = useLoaderData();
  const [expandedIds, setExpandedIds] = useState([]);

  const expand = async (funcId) => {
    console.info("expand executed with id =" + funcId);
    let newList = [];
    if (expandedIds.indexOf("" + funcId) >= 0) {
      newList = expandedIds.filter((element, index, array) => {
        return element != funcId;
      });
    } else {
      expandedIds.forEach(function (value) {
        newList.push(value);
      });
      newList.push(funcId);
    }
    setExpandedIds(newList);
  };

  return (
    <HitListDiv>
      <div className="hitlist-filter">
        <div className="rounded-button" title="Refresh">
          <span className="material-symbols-outlined">refresh</span>
        </div>
      </div>

      {functions.result?.map((func) => (
        <div></div>
        // <FunctionView func={func} expand={expand} detailVisible={expandedIds.indexOf(func.data.id) >= 0} />
      ))}
    </HitListDiv>
  );
}
