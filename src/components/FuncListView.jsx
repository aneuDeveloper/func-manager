import FunctionView from "./FunctionView";
import { useState } from "react";

export default function FuncListView(props) {
  const [functions, setFunctions] = useState([]);

  return (
    <div>
      <div>
        <div className="rounded-button" title="Refresh">
          <span className="material-symbols-outlined">refresh</span>
        </div>
      </div>

      {functions?.map((func) => (
        <FunctionView func={func} />
      ))}
    </div>
  );
}
