import FunctionView from "./FunctionView";
import styled from "styled-components";

const HitListDiv = styled.div`
  .hitlist-filter {
    margin: 5px;
  }
`;

export default function HitList(props) {
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

      {props.functions?.map((func) => (
        <FunctionView func={func} expand={expand} />
      ))}
    </HitListDiv>
  );
}
