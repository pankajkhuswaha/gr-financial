import React, { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import { useSelector } from "react-redux";

const ViewPage = () => {

  const data = useSelector((st) => st.view.data);

  const [doc, setdoc] = useState([])
  const [docs, setdocs] = useState([])
  useEffect(()=>{
      if(data.documents[0]){
        setdoc(Object.values(data.documents[0]))
        setdocs(Object.keys(data.documents[0]))
      }
  },[data.documents])
  return (
    <>
      <div className="col-12 d-flex align-items-center justify-content-center mt-5">
        <div className="border col-10 p-4 shadow">
          <h3 className="col-12">Customer ID : {data.customerid}</h3>
          <div className="d-flex justify-content-start align-items-center flex-wrap gap-4">
            <h5 className="col-12 col-xl-6">
              Customer Type : {data.customertype}
            </h5>
            <h5 className="col-12 col-xl-6">Handled By : {data.handleby}</h5>
            <h5 className="col-12 col-xl-6">Loan Type : {data.loantype}</h5>
            <h5 className="col-12 col-xl-6">
              Loan Amount : {data.loanAmount} rs.
            </h5>
            <h5 className="col-12 col-xl-6">
              Tennure Time : {data.tennuretime} Years
            </h5>
            <h5 className="col-12 col-xl-6">
              Date Of Disbursement : {data.dateOfDisburment}
            </h5>
            <h5 className="col-12 col-xl-6">
              Rate of Interest : {data.rateOfInterest} %
            </h5>
          </div>
          {data?.firm[0].name && (
            <div className="d-flex justify-content-start align-items-center flex-wrap">
              <h4 className="col-12 my-4">Firm Details</h4>
              <p className="col-12 col-xl-6">Firm Name : {data.firm[0].name}</p>
              <p className="col-12 col-xl-6">Firm Type : {data.firm[0].type}</p>
              <p className="col-12 col-xl-6">
                Firm Address : {data.firm[0].adress}
              </p>
            </div>
          )}
          {data.company[0].name && (
            <div className="d-flex justify-content-start align-items-center flex-wrap">
              <h4 className="col-12 my-4">Company Details</h4>
              <p className="col-12 col-xl-6">
                Company Name : {data.company[0].name}
              </p>
              <p className="col-12 col-xl-6">
                Company Type : {data.company[0].type}
              </p>
              <p className="col-12 col-xl-6">
                Company Address : {data.company[0].adress}
              </p>
            </div>
          )}
          <h3 className="col-12 mt-4">Person Details :</h3>
          <div className="col-12 row">
            {data?.persondetails?.map((it, i) => (
              <div key={i} className="col-12">
                <ul className=" list-unstyled px-4 py-2 border rounded shadow-sm">
                  <li>
                    <span>Name:</span> {it.name}
                  </li>
                  <li>
                    <span>Email:</span> {it.email}
                  </li>
                  <li>
                    <span>Mobile:</span> {it.mobile}
                  </li>
                  <li>
                    <span>City:</span> {it.city}
                  </li>
                  <li>
                    <span>Address:</span> {it.address}
                  </li>
                  <li>
                    <span>Mother Name:</span> {it.mother}
                  </li>
                  <li>
                    <span>Father Name:</span> {it.father}
                  </li>
                </ul>
              </div>
            ))}
          </div>
          <h3 className="col-12 mt-4">Assets Details :</h3>
          <div className="col-12 row">
            {data.cardetails.length !== 0 ? (
              data?.cardetails?.map((it, i) => (
                <div key={i} className="col-12">
                  <h3>Car Details</h3>
                  <ul className=" list-unstyled px-4 py-2 border rounded shadow-sm">
                    <li>
                      <span>Car Name:</span> {it.carName}
                    </li>
                    <li>
                      <span>Car Model:</span> {it.modelNumber}
                    </li>
                    <li>
                      <span>Car Detail:</span> {it.modelNumber}
                    </li>
                    <li>
                      <span>Car Type:</span> {it.insuredBy}
                    </li>
                    <li>
                      <span>Policy :</span> <a href={it.policy|| "https://grfinancial.in/admin/index"} target="blank" rel="noopener noreferrer"><FiEye style={{cursor:"pointer"}} color="blue" fontSize={20}/></a>
                    </li>
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-start col-12">
                <strong>Cars : </strong> Have not any Cars
              </p>
            )}
          </div>
          <div className="col-12 row">
            {data.propertydeatils.length !== 0 ? (
              data?.propertydeatils?.map((it, i) => (
                <div key={i} className="col-12">
                  <h3>Property Details :</h3>
                  <ul className="list-unstyled px-4 py-2 border rounded shadow-sm">
                    <li>
                      <span>Property Name:</span> {it.propertyName}
                    </li>
                    <li>
                      <span>Property Detail:</span> {it.propertyDetail}
                    </li>
                    <li>
                      <span>Property Type:</span> {it.propertyType}
                    </li>
                    <li>
                      <span>Property Address:</span> {it.propertyAddress}
                    </li>
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-start col-12">
                <strong>Property : </strong> Have not any Property
              </p>
            )}
          </div>
          <div className="col-12 row">
            <p className="col-12"> Provident Fund : {data.providentfund}rs</p>
            <p className="col-12"> Cash in Hand: {data.cashinhand}</p>
          </div>
          <div>
            <h3>Documents </h3>
            {docs.map((ele,i)=>{
              return <div key={i} className="d-flex justify-content-between"> 
                <h5>{ele} : </h5>
                <a href={doc[i]|| "https://grfinancial.in/admin/index"} target="blank" rel="noopener noreferrer"><FiEye style={{cursor:"pointer"}} color="blue" fontSize={20}/></a>
                {/* <p>{doc[i]}</p> */}
              </div>
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPage;
