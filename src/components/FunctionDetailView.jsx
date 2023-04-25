import { FunctionHit } from "../model/FunctionHit";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FunctionDetailViewDiv = styled.div`
  padding: 6px 0 6px;
`;

export default function FunctionDetailView(props) {
  const navigate = useNavigate();

  const back = (func) => {
    navigate("/", { replace: true });
  };

  return (
    <FunctionDetailViewDiv>
      <div>
        <img src="/assets/back.png" alt="back" onClick={back}/>
      </div>
      <div></div>
    </FunctionDetailViewDiv>
  );
}
