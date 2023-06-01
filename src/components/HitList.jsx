import { defer, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { FunctionHit } from "src/model/FunctionHit";
import styled from "styled-components";
import { search } from "../Api";
import FunctionView from "./FunctionView";
const HitListDiv = styled.div`
  .hitlist-filter {
    margin: 5px;
  }
`;

export const hitListLoader = async ({ request, params}) => {
  console.log("Loader called with request=" + JSON.stringify(request.url) + " " + JSON.stringify(params));

  const url = new URL(request.url);
  const freetext = url.searchParams.get("q");
  let funcArr = [];

  try {
    const funcList = await search(freetext);
    for (let func of funcList) {
      let timeStamp = new Date(Number(func.time_stamp));
      func.time_stamp = timeStamp.toLocaleString();

      const functionHit = new FunctionHit();
      functionHit.data = func;
      functionHit.detailVisible = false;
      funcArr.push(functionHit);
    }

    console.info("Putting json="+JSON.stringify(funcArr))
  } catch (error) {
    toast.error(error);
  }
  return defer({"result": funcArr});
};

export default function HitList(props) {
  const functions = useLoaderData();

  const expand = async (funcId) => {
    let funcArr = [];
    for (let func of props.functions) {
      if (func.data.id === funcId) {
        func.detailVisible = !func.detailVisible;
        funcArr.push(func);
      } else {
        funcArr.push(func);
      }
    }
    props.setFunctions(funcArr);
  };

  return (
    <HitListDiv>
      <div className="hitlist-filter">
        <div className="rounded-button" title="Refresh">
          <span className="material-symbols-outlined">refresh</span>
        </div>
      </div>

      {functions.result?.map((func) => (
        <FunctionView func={func} expand={expand} />
      ))}
    </HitListDiv>
  );
}
