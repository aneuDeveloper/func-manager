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

  label {
    display: block;
    margin-top: 1rem;
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
    if (response.status >= 400) {
      throw new Error("Error ocured");
    }
    const token = response.data.token;
    saveToStorage("token", token);
    window.location = "/filter"
  };

  return (
    <LoginDiv>
      <div className="logo">
        <img src="/assets/logo.png" alt="Functions Logo" />
      </div>
      <label htmlFor="usernameField">Username</label>
      <input placeholder="" ref={usenameInput} onKeyDown={onLogin} id="usernameField" name="username" />
      <label htmlFor="passwordField">Password</label>
      <input type="password" placeholder="" ref={passwordInput} onKeyDown={onLogin} id="passwordField" name="password" required/>
      <br />
      <br />
      <div>
        <button onClick={exeLogin} type="button">
          Login
        </button>
      </div>
    </LoginDiv>
  );
}
