import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
// ReactDOM.render(<App />, document.getElementById("root"));
