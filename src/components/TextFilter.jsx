import styled from "styled-components";
import { useSearchParams } from "react-router-dom";

const Filter = styled.div`
  padding: 5px;
  margin-top: 0px;
  margin-bottom: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  border-radius: 5px;
  background-color: #f3f3f3;

  justify-content: space-around;
  display: flex;
  flex-flow: row wrap;

  .filter-btn {
    padding-top: 0px;
    width: 25px;
    height: 25px;
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

  .align-right {
    text-align: right;
    margin-left: auto;
    margin-right: 0;
  }

  .txt-content {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 150px;
  }
`;

export default function TextFilter(params) {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterValue = searchParams.get(params.searchParamKey);
  
  const removeFilter = (event) => {
    setSearchParams(params.searchParamKey, "");
  };

  if (filterValue == null || filterValue === "") {
    return null;
  } else {
    return (
      <Filter>
        {params.caption}:<div className="txt-content">{filterValue}</div>
        <div className="align-right">
          <div className="filter-btn" title="Remove" onClick={removeFilter}>
            <span className="material-symbols-outlined">close</span>
          </div>
        </div>
      </Filter>
    );
  }
}
