import { FunctionHit } from "../model/FunctionHit"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { retryFunc } from "../services/funcService"

const FunctionDetailViewDiv = styled.div`
  padding: 10px;
  background-color: #dce0e6;

  .left-col {
    display: inline-block;
    width: 200px;
  }

  .button-long {
    padding-top: 6px;
    width: 35px;
    height: 35px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    background-color: transparent;
    border: none;
    border-radius: 50%;
    outline: none;
    &:hover {
      background-color: #00000015;
    }
  }
`

export default function FuncEditView(props) {
  const navigate = useNavigate()

  const back = () => {
    navigate("/", { replace: true })
  }

  const retry = (id) => {
    retryFunc(id)
  }

  return (
    <FunctionDetailViewDiv>
      <div className="rounded-button" onClick={back} title="Back">
        <span className="material-symbols-outlined">arrow_back</span>
      </div>

      <h5>Modify and Retry</h5>
      <div>
        <span className="left-col">Func ID</span>
        <span>
          <input type="text" id="fname" name="fname" value="{props.func.data.id}" />
        </span>
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
  )
}
