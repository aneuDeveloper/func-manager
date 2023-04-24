import { FunctionHit } from "../model/FunctionHit";
import styled from "styled-components";

const FunctionDiv = styled.header`
  padding: 10px 0 10px;
  display: flex;
  background-color: #C9CDD3;
  border-color: #BDC3CB;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  &:hover {
    border-color: #9FA5AC;
    cursor: pointer;
  }
`;

export default function Function(props) {
  return <FunctionDiv>bla {props.func.data.id}</FunctionDiv>;
}
