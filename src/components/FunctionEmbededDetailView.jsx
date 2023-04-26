import { FunctionHit } from "../model/FunctionHit";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { retryFunc } from "../services/funcService";

const FunctionDetailViewDiv = styled.div`
  padding: 10px;
  background-color: #dce0e6;

  .left-col {
    display: inline-block;
    width: 200px;
  }
`;

export default function FunctionEmbededDetailView(props) {
  const navigate = useNavigate();

  const back = (func) => {
    navigate("/", { replace: true });
  };

  const retry = (id) => {
    retryFunc(id);
  };

  return (
    <FunctionDetailViewDiv>
      <h5>Details</h5>
      <div>
        <span className="left-col">Func ID</span>
        <span>{props.func.data.id}</span>
      </div>
      <div>
        <span className="left-col">Function</span>
        <span>{props.func.data.func}</span>
      </div>
      <div>
        <span className="left-col">Process name</span>
        <span>{props.func.data.process_name}</span>
      </div>
      <div>
        <span className="left-col">Process Instance Id</span>
        <span>{props.func.data.process_instanceid}</span>
      </div>
      <div>
        <span className="left-col">Function Type</span>
        <span>{props.func.data.func_type}</span>
      </div>
      <div>
        <span className="left-col">Time</span>
        <span>{props.func.data.time_stamp}</span>
      </div>

      <div className="rounded-button" onClick={() => retry(props.func.data.id)} title="Retry this function">
        <span className="material-symbols-outlined">repeat</span>
      </div>
      <div>Message:</div>
      <div>{props.func.data.kafka_message}</div>
    </FunctionDetailViewDiv>
  );
}
