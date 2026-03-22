import { useRef, useState } from "react";
import { getFromStorage, saveToStorage } from "../utils/storage";
import getApiBase from "../config";
import axios from "axios";
import styled from "styled-components";
import { useAppContext } from "src/AppContext";

const LoginDiv = styled.div`
  padding: 10px;
  margin: auto;
  width: 50%;

  .logo {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  label {
    display: block;
    margin-top: 1rem;
  }
`;

export default function Login(props) {
  const { setAccessToken } = useAppContext();

  const exeLogin = async () => {

    setAccessToken("test");

  };
  
  return (
    <LoginDiv>
      <div className="logo">
        <img src="/assets/logo.png" alt="Functions Logo" />
      </div>
      <br />
      <div>
        <button className="btn btn-outline-primary" type="button" onClick={exeLogin}>
          SSO Login
        </button>
      </div>
    </LoginDiv>
  );
}
