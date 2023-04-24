import { FunctionHit } from "../model/FunctionHit";
import styled from "styled-components";

const FunctionDiv = styled.header`
  padding: 15px 0 10px;
  display: flex;

`;

export default function Function(props) {
  return <FunctionDiv>bla {props.func.data.id}</FunctionDiv>;
}
