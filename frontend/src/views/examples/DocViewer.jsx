import React from "react";
import { useLocation } from "react-router-dom";

const DocViewer = () => {
  const data = useLocation().state;
  console.log(data);
  return (
    <div>
      <h1 className="col-12 text-center mt-5 mb-2">{data.title}</h1>
      <div className="row justify-content-center align-items-center">
      {data.docs.map((ele, i) => {
        return (
          <div key={i} className="col-11 my-2">
            <div className="card">
              {ele.includes("pdf") ? (
                <iframe title={i} height={"800px"} src={ele}></iframe>
              ) : (
                <img src={ele} alt="" />
              )}
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default DocViewer;
