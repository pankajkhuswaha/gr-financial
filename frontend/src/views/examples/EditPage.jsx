import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Select from "react-select";
const EditPage = () => {
  const atview = useLocation().pathname.includes("edit");
  if (atview) {
    if (document.getElementById("navbar-main")) {
      document.getElementById("navbar-main").style.display = "none !important";
    }
    // document.getElementById("navbar-main").style.display = "none";
  }
  const handleUpdate = () => {
    console.log(formdata);
  };
  const data = {
    _id: "64c9135e366bc3d22554245b",
    handleby: "admin",
    customertype: "Individual",
    customerid: "GRFinancial002",
    persondetails: [
      {
        name: "Pankaj Kumar Shukla",
        email: "dryishercs@gmail.com",
        city: "NIT",
        address: "5E-12BP, 2nd Floor, NIT",
        pincode: "121001",
        state: "Delhi",
        mobile: "07982658211",
        dob: "2023-08-03",
        mother: "nskf",
        father: "sdfsdfsd",
      },
      {
        name: "Manoj Kumar Shukla",
        email: "pankaj@gmail.com",
        city: "NIT",
        address: "5E-12BP, 2nd Floor, NIT",
        pincode: "121001",
        state: "Delhi",
        mobile: "07982658211",
        dob: "2023-08-03",
        mother: "nskf",
        father: "sdfsdfsd",
      },
    ],
    ref1: "fsdfsdf",
    ref2: "sfsdf",
    loantype: ["PL", "BL"],
    loanAmount: "80000",
    rateOfInterest: "10",
    tennuretime: "15",
    dateOfDisburment: "2023-08-02",
    providentfund: "12",
    documents: [{}],
    cardetails: [
      {
        carName: "dfdfg",
        modelNumber: "gfdgdfg",
        insuredBy: "gdfgfd",
        cardetails: "dffggdf",
        policyRenewalMonth: "fdgdf",
        policy: "454545",
      },
    ],
    propertydeatils: [
      {
        propertyName: "fgdg",
        propertyDetail: "dfgdfg",
        propertyType: "dfgdfg",
        propertyAddress: "dfgdfgdfg",
      },
    ],
    firm: [
      {
        name: "fdf",
        type: "fd",
        adress: "ffdf",
      },
    ],
    company: [
      {
        name: "company name",
        type: "compny type",
        adress: "adererer",
      },
    ],
    cashinhand: "ddfd",
    date: "2023-08-01T14:14:54.000Z",
    createdAt: "2023-08-01T14:14:54.867Z",
    updatedAt: "2023-08-01T14:14:54.867Z",
    __v: 0,
  };
  const [formdata, setformdata] = useState(data);
  const prevtype = formdata.loantype.map((itm) => ({ value: itm, label: itm }));
  const [selectedOption, setSelectedOption] = useState(prevtype);
  const options = [
    { value: "PL", label: "PL" },
    { value: "BL", label: "BL" },
    { value: "LAP", label: "LAP" },
    { value: "HL", label: "HL" },
    { value: "AL", label: "AL" },
  ];

  return (
    <>
      <div className="col-12 p-4">
        <p
          className="text-xl col-12 text-center mb-0 pb-0"
          style={{ fontWeight: "500" }}
        >
          Edit Details of Customer
        </p>
        <hr className="m-0 mb-2" />
        <form className="bg-white p-4 border shadow">
          <div className="row">
            <div className="col-4 mb-2">
              <label className="mb-0"> Customer ID :</label>
              <input
                type="text"
                className="form-control"
                placeholder="Customer Id"
                value={formdata.customerid}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="mb-0"> Customer Type :</label>
              <input
                type="text"
                className="form-control"
                placeholder="Customer Type"
                value={formdata.customertype}
                readOnly
              />
            </div>
            <div className="col-4 mb-2">
              <label className="mb-0"> Customer Handled By :</label>
              <input
                type="text"
                className="form-control"
                placeholder="Customer Handle by"
                value={formdata.handleby}
                readOnly
              />
            </div>
            <div className="col-12 mt-2 text-lg text-center bg-light border rounded text-black mb-2">
              {" "}
              Loan Details
            </div>
            <div className="col-4 mb-2">
              <label className="mb-0"> Loan Ammount :</label>
              <input
                type="number"
                placeholder="Enter Loan Ammount"
                className="form-control"
                value={formdata.loanAmount}
                onChange={(e) =>
                    setformdata({ ...formdata, loanAmount: e.target.value })
                  }
              />
            </div>
            <div className="col-4 mb-2">
              <label className="mb-0"> Rate of Interest :</label>
              <input
                type="number"
                placeholder="Enter Rate of Interest"
                className="form-control"
                value={formdata.rateOfInterest}
                onChange={(e) =>
                  setformdata({ ...formdata, rateOfInterest: e.target.value })
                }
              />
            </div>
            <div className="col-4 mb-2">
              <label className="mb-0"> Date of Disbursement :</label>
              <input
                type="date"
                placeholder="Enter Date of Disbursement"
                className="form-control"
                value={formdata.dateOfDisburment}
                onChange={(e) =>
                  setformdata({ ...formdata, dateOfDisburment: e.target.value })
                }
              />
            </div>
            <div className="col-4 mb-2">
              <label className="mb-0"> Type of Loan :</label>
              <Select
                isMulti
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
              />
            </div>
            {/* person deatils columns */}
            <div className="col-12 mt-2 text-lg text-center bg-light border rounded text-black mb-2">
              {" "}
              Person Details
            </div>
            {data.persondetails?.map((it, i) => (
              <div className="col-12 row border-bottom mb-2">
                <div className="col-4 mb-2">
                  <label className="mb-0"> Name :</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    value={formdata.persondetails[i].name}
                    onChange={(e) => {
                      let updatedpersonal = [...formdata.persondetails];
                      updatedpersonal[i] = {
                        ...updatedpersonal[i],
                        name: e.target.value,
                      };
                      setformdata({
                        ...formdata,
                        persondetails: updatedpersonal,
                      });
                    }}
                  />
                </div>
                <div className="col-4 mb-2">
                  <label className="mb-0"> Email :</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={formdata.persondetails[i].email}
                    onChange={(e) => {
                      let updatedpersonal = [...formdata.persondetails];
                      updatedpersonal[i] = {
                        ...updatedpersonal[i],
                        email: e.target.value,
                      };
                      setformdata({
                        ...formdata,
                        persondetails: updatedpersonal,
                      });
                    }}
                  />
                </div>
                <div className="col-4 mb-2">
                  <label className="mb-0"> Mobile Number :</label>
                  <input
                    type="text"
                    placeholder="Enter Mobile Number"
                    className="form-control"
                    value={formdata.persondetails[i].mobile}
                    onChange={(e) => {
                      let updatedpersonal = [...formdata.persondetails];
                      updatedpersonal[i] = {
                        ...updatedpersonal[i],
                        mobile: e.target.value,
                      };
                      setformdata({
                        ...formdata,
                        persondetails: updatedpersonal,
                      });
                    }}
                  />
                </div>
                <div className="col-4 mb-2">
                  <label className="mb-0"> Date of Birth :</label>
                  <input
                    type="date"
                    placeholder="Enter date of birth"
                    className="form-control"
                    value={formdata.persondetails[i].dob}
                    onChange={(e) => {
                      let updatedpersonal = [...formdata.persondetails];
                      updatedpersonal[i] = {
                        ...updatedpersonal[i],
                        dob: e.target.value,
                      };
                      setformdata({
                        ...formdata,
                        persondetails: updatedpersonal,
                      });
                    }}
                  />
                </div>
                <div className="col-4 mb-2">
                  <label className="mb-0"> Mother Name :</label>
                  <input
                    type="text"
                    placeholder="Enter Mother Name"
                    className="form-control"
                    value={formdata.persondetails[i].mother}
                    onChange={(e) => {
                      let updatedpersonal = [...formdata.persondetails];
                      updatedpersonal[i] = {
                        ...updatedpersonal[i],
                        mother: e.target.value,
                      };
                      setformdata({
                        ...formdata,
                        persondetails: updatedpersonal,
                      });
                    }}
                  />
                </div>
                <div className="col-4 mb-2">
                  <label className="mb-0"> Father Name :</label>
                  <input
                    type="text"
                    placeholder="Enter Father Name"
                    className="form-control"
                    value={formdata.persondetails[i].father}
                    onChange={(e) => {
                      let updatedpersonal = [...formdata.persondetails];
                      updatedpersonal[i] = {
                        ...updatedpersonal[i],
                        father: e.target.value,
                      };
                      setformdata({
                        ...formdata,
                        persondetails: updatedpersonal,
                      });
                    }}
                  />
                </div>
                <div className="col-4 mb-2">
                  <label className="mb-0"> Address :</label>
                  <input
                    type="text"
                    placeholder="Enter Address"
                    className="form-control"
                    value={formdata.persondetails[i].address}
                    onChange={(e) => {
                      let updatedpersonal = [...formdata.persondetails];
                      updatedpersonal[i] = {
                        ...updatedpersonal[i],
                        address: e.target.value,
                      };
                      setformdata({
                        ...formdata,
                        persondetails: updatedpersonal,
                      });
                    }}
                  />
                </div>
                <div className="col-4 mb-2">
                  <label className="mb-0"> State :</label>
                  <input
                    type="text"
                    placeholder="Enter State"
                    className="form-control"
                    value={formdata.persondetails[i].state}
                    onChange={(e) => {
                      let updatedpersonal = [...formdata.persondetails];
                      updatedpersonal[i] = {
                        ...updatedpersonal[i],
                        state: e.target.value,
                      };
                      setformdata({
                        ...formdata,
                        persondetails: updatedpersonal,
                      });
                    }}
                  />
                </div>
                <div className="col-4 mb-2">
                  <label className="mb-0"> City :</label>
                  <input
                    type="text"
                    placeholder="Enter City"
                    className="form-control"
                    value={formdata.persondetails[i].city}
                    onChange={(e) => {
                      let updatedpersonal = [...formdata.persondetails];
                      updatedpersonal[i] = {
                        ...updatedpersonal[i],
                        city: e.target.value,
                      };
                      setformdata({
                        ...formdata,
                        persondetails: updatedpersonal,
                      });
                    }}
                  />
                </div>
                <div className="col-4 mb-2">
                  <label className="mb-0"> Pincode :</label>
                  <input
                    type="text"
                    placeholder="Enter City"
                    className="form-control"
                    value={formdata.persondetails[i].pincode}
                    onChange={(e) => {
                      let updatedpersonal = [...formdata.persondetails];
                      updatedpersonal[i] = {
                        ...updatedpersonal[i],
                        pincode: e.target.value,
                      };
                      setformdata({
                        ...formdata,
                        persondetails: updatedpersonal,
                      });
                    }}
                  />
                </div>
              </div>
            ))}
            {/* firmdetails deatils columns */}
            {data.firm[0]?.name &&
              data.firm?.map((it, i) => (
                <div className="col-12 row mb-2">
                  <div className="col-12 mt-2 text-lg text-center bg-light border rounded text-black mb-2">
                    {" "}
                    Firm Details
                  </div>
                  <div className="col-4 mb-2">
                    <label className="mb-0"> Firm Name :</label>
                    <input
                      type="text"
                      placeholder="Enter Firm Name"
                      className="form-control"
                      value={formdata.firm[0].name}
                      onChange={(e) => {
                        let firmdetails = [...formdata.firm];
                        firmdetails[i] = {
                          ...firmdetails[i],
                          name: e.target.value,
                        };
                        setformdata({
                          ...formdata,
                          firm: firmdetails,
                        });
                      }}
                    />
                  </div>
                  <div className="col-4 mb-2">
                    <label className="mb-0"> Firm type :</label>
                    <input
                      type="text"
                      placeholder="Enter Firm type"
                      className="form-control"
                      value={formdata.firm[0].type}
                      onChange={(e) => {
                        let firmdetails = [...formdata.firm];
                        firmdetails[i] = {
                          ...firmdetails[i],
                          type: e.target.value,
                        };
                        setformdata({
                          ...formdata,
                          firm: firmdetails,
                        });
                      }}
                    />
                  </div>
                  <div className="col-4 mb-2">
                    <label className="mb-0"> Firm address :</label>
                    <input
                      type="text"
                      placeholder="Enter Firm address"
                      className="form-control"
                      value={formdata.firm[0].adress}
                      onChange={(e) => {
                        let firmdetails = [...formdata.firm];
                        firmdetails[i] = {
                          ...firmdetails[i],
                          adress: e.target.value,
                        };
                        setformdata({
                          ...formdata,
                          firm: firmdetails,
                        });
                      }}
                    />
                  </div>
                </div>
              ))}
            {/* Company deatils columns */}
            {data.company[0]?.name &&
              data.company?.map((it, i) => (
                <div className="col-12 row mb-2">
                  <div className="col-12 mt-2 text-lg text-center bg-light border rounded text-black mb-2">
                    {" "}
                    Company Details
                  </div>
                  <div className="col-4 mb-2">
                    <label className="mb-0"> Company Name :</label>
                    <input
                      type="text"
                      placeholder="Enter Company Name"
                      className="form-control"
                      value={formdata.company[0].name}
                      onChange={(e) => {
                        let companydetails = [...formdata.company];
                        companydetails[i] = {
                          ...companydetails[i],
                          name: e.target.value,
                        };
                        setformdata({
                          ...formdata,
                          company: companydetails,
                        });
                      }}
                    />
                  </div>
                  <div className="col-4 mb-2">
                    <label className="mb-0"> Company type :</label>
                    <input
                      type="text"
                      placeholder="Enter Company type"
                      className="form-control"
                      value={formdata.company[0].type}
                      onChange={(e) => {
                        let companydetails = [...formdata.company];
                        companydetails[i] = {
                          ...companydetails[i],
                          type: e.target.value,
                        };
                        setformdata({
                          ...formdata,
                          company: companydetails,
                        });
                      }}
                    />
                  </div>
                  <div className="col-4 mb-2">
                    <label className="mb-0"> Company address :</label>
                    <input
                      type="text"
                      placeholder="Enter Company address"
                      className="form-control"
                      value={formdata.company[0].adress}
                      onChange={(e) => {
                        let companydetails = [...formdata.company];
                        companydetails[i] = {
                          ...companydetails[i],
                          adress: e.target.value,
                        };
                        setformdata({
                          ...formdata,
                          company: companydetails,
                        });
                      }}
                    />
                  </div>
                </div>
              ))}
            {/* asset deatils columns */}
            <div className="col-12 mt-2 text-lg text-center bg-light border rounded text-black mb-2">
              {" "}
              Asset Details
            </div>
            <div className="col-6 mb-2">
              <label className="mb-0"> Provident Fund :</label>
              <input
                type="text"
                placeholder="Enter Provident Fund"
                className="form-control"
                value={formdata.providentfund}
                onChange={(e) =>
                  setformdata({ ...formdata, providentfund: e.target.value })
                }
              />
            </div>
            <div className="col-6 mb-2">
              <label className="mb-0"> Cash in Hand :</label>
              <input
                type="text"
                placeholder="Enter Cash in Hand"
                className="form-control"
                value={formdata.cashinhand}
                onChange={(e) =>
                  setformdata({ ...formdata, cashinhand: e.target.value })
                }
              />
            </div>
            {/* car deatils columns */}
            {data.cardetails?.map((it, i) => (
              <div className="col-12 row mb-2">
                <div className="col-12 mt-2 text-lg text-center text-black mb-2">
                  {" "}
                  Car Details
                </div>
                <div className="col-4 mb-2">
                  <label className="mb-0"> Car Name :</label>
                  <input
                    type="text"
                    placeholder="Enter Car Name"
                    className="form-control"
                    value={formdata.cardetails[i].carName}
                    onChange={(e) => {
                      let updatedCardetails = [...formdata.cardetails];
                      updatedCardetails[i] = {
                        ...updatedCardetails[i],
                        carName: e.target.value,
                      };
                      setformdata({
                        ...formdata,
                        cardetails: updatedCardetails,
                      });
                    }}
                  />
                </div>
                <div className="col-4 mb-2">
                  <label className="mb-0"> Model Number :</label>
                  <input
                    type="text"
                    placeholder="Enter Model Number"
                    className="form-control"
                    value={formdata.cardetails[i].modelNumber}
                    onChange={(e) => {
                      let updatedCardetails = [...formdata.cardetails];
                      updatedCardetails[i] = {
                        ...updatedCardetails[i],
                        modelNumber: e.target.value,
                      };
                      setformdata({
                        ...formdata,
                        cardetails: updatedCardetails,
                      });
                    }}
                  />
                </div>
                <div className="col-4 mb-2">
                  <label className="mb-0"> Insured By :</label>
                  <input
                    type="text"
                    placeholder="Enter Insured By"
                    className="form-control"
                    value={formdata.cardetails[i].insuredBy}
                    onChange={(e) => {
                      let updatedCardetails = [...formdata.cardetails];
                      updatedCardetails[i] = {
                        ...updatedCardetails[i],
                        insuredBy: e.target.value,
                      };
                      setformdata({
                        ...formdata,
                        cardetails: updatedCardetails,
                      });
                    }}
                  />
                </div>
                <div className="col-4 mb-2">
                  <label className="mb-0"> Car Details :</label>
                  <input
                    type="text"
                    placeholder="Enter Car Details"
                    className="form-control"
                    value={formdata.cardetails[i].cardetails}
                    onChange={(e) => {
                      let updatedCardetails = [...formdata.cardetails];
                      updatedCardetails[i] = {
                        ...updatedCardetails[i],
                        cardetails: e.target.value,
                      };
                      setformdata({
                        ...formdata,
                        cardetails: updatedCardetails,
                      });
                    }}
                  />
                </div>
                <div className="col-4 mb-2">
                  <label className="mb-0"> Policy Renewal Date :</label>
                  <input
                    type="text"
                    placeholder="Enter Policy Renewal Date"
                    className="form-control"
                    value={formdata.cardetails[i].policyRenewalMonth}
                    onChange={(e) => {
                      let updatedCardetails = [...formdata.cardetails];
                      updatedCardetails[i] = {
                        ...updatedCardetails[i],
                        policyRenewalMonth: e.target.value,
                      };
                      setformdata({
                        ...formdata,
                        cardetails: updatedCardetails,
                      });
                    }}
                  />
                </div>
                <div className="col-4 mb-2">
                  <label className="mb-0"> Policy :</label>
                  <input
                    type="text"
                    placeholder="Enter Policy"
                    className="form-control"
                    value={formdata.cardetails[i].policy}
                    onChange={(e) => {
                      let updatedCardetails = [...formdata.cardetails];
                      updatedCardetails[i] = {
                        ...updatedCardetails[i],
                        policy: e.target.value,
                      };
                      setformdata({
                        ...formdata,
                        cardetails: updatedCardetails,
                      });
                    }}
                  />
                </div>
              </div>
            ))}
            {/* property deatils columns */}
            {data.propertydeatils?.map((it, i) => (
              <div className="col-12 row mb-2">
                <div className="col-12 mt-2 text-lg text-center text-black mb-2">
                  {" "}
                  Property Details
                </div>
                <div className="col-4 mb-2">
                  <label className="mb-0"> Property Name :</label>
                  <input
                    type="text"
                    placeholder="Enter Property Name"
                    className="form-control"
                    value={formdata.propertydeatils[i].propertyName}
                    onChange={(e) => {
                      let updatedProperty = [...formdata.propertydeatils];
                      updatedProperty[i] = {
                        ...updatedProperty[i],
                        propertyName: e.target.value,
                      };
                      setformdata({
                        ...formdata,
                        propertydeatils: updatedProperty,
                      });
                    }}
                  />
                </div>
                <div className="col-4 mb-2">
                  <label className="mb-0"> Propert Details :</label>
                  <input
                    type="text"
                    placeholder="Enter Propert Details"
                    className="form-control"
                    value={formdata.propertydeatils[i].propertyDetail}
                    onChange={(e) => {
                      let updatedProperty = [...formdata.propertydeatils];
                      updatedProperty[i] = {
                        ...updatedProperty[i],
                        propertyDetail: e.target.value,
                      };
                      setformdata({
                        ...formdata,
                        propertydeatils: updatedProperty,
                      });
                    }}
                  />
                </div>
                <div className="col-4 mb-2">
                  <label className="mb-0"> Property Type :</label>
                  <input
                    type="text"
                    placeholder="Enter Property Type"
                    className="form-control"
                    value={formdata.propertydeatils[i].propertyType}
                    onChange={(e) => {
                      let updatedProperty = [...formdata.propertydeatils];
                      updatedProperty[i] = {
                        ...updatedProperty[i],
                        propertyType: e.target.value,
                      };
                      setformdata({
                        ...formdata,
                        propertydeatils: updatedProperty,
                      });
                    }}
                  />
                </div>
                <div className="col-4 mb-2">
                  <label className="mb-0"> Property Address :</label>
                  <input
                    type="text"
                    placeholder="Enter Property Address"
                    className="form-control"
                    value={formdata.propertydeatils[i].propertyAddress}
                    onChange={(e) => {
                      let updatedProperty = [...formdata.propertydeatils];
                      updatedProperty[i] = {
                        ...updatedProperty[i],
                        propertyAddress: e.target.value,
                      };
                      setformdata({
                        ...formdata,
                        propertydeatils: updatedProperty,
                      });
                    }}
                  />
                </div>
              </div>
            ))}
            <div className="col-12 mt-2 text-lg text-center bg-light border rounded text-black mb-2">
              {" "}
              Reference Details
            </div>
            <div className="col-4 mb-2">
              <label className="mb-0"> Reference name 1 :</label>
              <input
                type="text"
                placeholder="Enter Reference name 1"
                className="form-control"
                value={formdata.ref1}
                onChange={(e) =>
                  setformdata({ ...formdata, ref2: e.target.value })
                }
              />
            </div>
            <div className="col-4 mb-2">
              <label className="mb-0"> Reference name 2 :</label>
              <input
                type="text"
                placeholder="Enter Reference name 1"
                className="form-control"
                value={formdata.ref2}
                onChange={(e) =>
                  setformdata({ ...formdata, ref2: e.target.value })
                }
              />
            </div>
          </div>
        </form>
        <div className="col-12 border">
          <button onClick={handleUpdate} className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default EditPage;
