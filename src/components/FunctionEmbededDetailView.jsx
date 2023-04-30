import { FunctionHit } from "../model/FunctionHit"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { retryFunc } from "../services/funcService"

const FunctionDetailViewDiv = styled.div`
  padding: 10px;
  background-color: #FFFFFF;

  .left-col {
    display: inline-block;
    width: 200px;
  }

  .button-long {
    padding: 10px;
    width: 35px;
    height: 35px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    background-color: transparent;1
    border: none;
    border-radius: 15%;
    outline: none;
    &:hover {
      background-color: #00000015;
    }
  }
`

export default function FunctionEmbededDetailView(props) {
  const navigate = useNavigate()

  const back = (func) => {
    navigate("/", { replace: true })
  }

  const navigateToDetailView = (id) => {
    navigate("/function/" + id, { replace: true })
  }

  const retry = (id) => {
    retryFunc(id)
  }

  return (
    <FunctionDetailViewDiv>
      <h5>Details</h5>
      <div>
        <button type="button" onClick={() => retry(props.func.data.id)}>
          Retry
        </button>
        <span>&nbsp;&nbsp;</span>
        <button type="button" onClick={() => navigateToDetailView(props.func.data.id)}>
          Copy
        </button>
      </div>
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

      <div>
        <span>Message:</span>
        <button type="button">Format as JSON</button>
        <span>&nbsp;&nbsp;</span>
        <button type="button">Format as XML</button>
      </div>
      <div>{props.func.data.kafka_message}</div>
    </FunctionDetailViewDiv>
  )
}
