import { useRef, useState } from "react";
import { getFromStorage, saveToStorage } from "../utils/storage";
import getApiBase from "../config";
import axios from "axios";
import styled from "styled-components";

const LoginDiv = styled.div`
  padding: 10px;
  margin: auto;
  width: 50%;

  .logo {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

export default function Login(props) {
  const usenameInput = useRef(null);
  const passwordInput = useRef(null);

  const onLogin = (event) => {
    if (event.keyCode === 13) {
      exeLogin();
    }
  };

  const exeLogin = async () => {
    let url = getApiBase() + `login`;
    const response = await axios.post(
      url,
      {
        username: usenameInput.current.value,
        password: passwordInput.current.value,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 5000,
      }
    );
    console.info("status was=" + response.status);
    if (response.status >= 400) {
      throw new Error("Error ocured");
    }
    const token = response.data.token;
    console.info("token was " + token);
    saveToStorage("token", token);
  };

  return (
    <LoginDiv>
      <div className="logo">
        <img src="/assets/logo.png" alt="Functions Logo" />
      </div>
      <label>Username</label>
      <div>
        <input placeholder="" ref={usenameInput} onKeyDown={onLogin} />
      </div>
      <br />
      <label>Password</label>
      <div>
        <input type="password" placeholder="" ref={passwordInput} onKeyDown={onLogin} />
      </div>
      <br />
      <div>
        <button onClick={exeLogin} type="button">
          Login
        </button>
      </div>
    </LoginDiv>
  );
}
