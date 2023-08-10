import React, {  useState } from "react";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import { updateCustomer } from "utils/api";
const EditPage = () => {
  const data = useSelector((st) => st.view.data);

  const [formdata, setformdata] = useState(data);
  const prevtype = formdata?.loantype?.map((itm) => ({ value: itm, label: itm }));
  const [selectedOption, setSelectedOption] = useState(prevtype);
  const options = [
    { value: "PL", label: "PL" },
    { value: "BL", label: "BL" },
    { value: "LAP", label: "LAP" },
    { value: "HL", label: "HL" },
    { value: "AL", label: "AL" },
  ];
  const handleLoanType = (e) => {
    setSelectedOption(e);
    const opt = e?.map((itm) => itm.value);
    setformdata({ ...formdata, loantype: opt });
  };
  const handleaddnewCar = (e) => {
    e.preventDefault();
    const newCar = {
      carName: "",
      modelNumber: "",
      insuredBy: "",
      policyRenewalMonth: "",
      policy: "",
    };
    const updatedCardetails = formdata.cardetails.length === 0 ? [newCar] : [...formdata.cardetails, newCar];
  setformdata({ ...formdata, cardetails: updatedCardetails });
  };
  const handleCardelte = (i) => {
    formdata.cardetails.splice(i, 1);
    setformdata({ ...formdata, cardetails: formdata.cardetails });
  };
  const handleaddnewproperty = (e) => {
    e.preventDefault();
    const newproperty = {
      propertyName: "",
      propertyDetail: "",
      propertyType: "",
      propertyAddress: "",
    };
    const updatedCardetails = formdata.propertydeatils.length === 0 ? [newproperty] : [...formdata.propertydeatils, newproperty];
  setformdata({ ...formdata, propertydeatils: updatedCardetails });
  };
  const handlepropertydelte = (i) => {
    formdata.propertydeatils.splice(i, 1);
    setformdata({ ...formdata, propertydeatils: formdata.propertydeatils });
  };
  const buttonStyle = {
    position: "absolute",
    top: "78%",
    right: 0,
    border: "1px solid red",
    borderRadius: "22px",
    fontSize: "20px",
    cursor: "pointer",
    padding: "0px 7px",
  };
    const navigate = useNavigate()
   const handleUpdate = async(e) => {
    e.preventDefault();
    // console.log(formdata)
    try {
      const res = await updateCustomer(formdata);
      console.log(res)
      toast.success(res.message)
      navigate("/admin/index")
    } catch (error) {
      toast.error(error.response.data.error)
    }
  };
  return (
    <>
    <ToastContainer/>
      {formdata._id && <div className="col-12 p-4">
        <p
          className="text-xl col-12 text-center mb-0 pb-0"
          style={{ fontWeight: "500" }}
        >
          Edit Details of Customer
        </p>
        <hr className="m-0 mb-2" />
        <form className="bg-white p-4 border shadow">
          <div className="row">
            <div className="col-6 col-md-4 mb-2">
              <label className="mb-0"> Customer ID :</label>
              <input
                type="text"
                className="form-control"
                placeholder="Customer Id"
                value={formdata.customerid}
                readOnly
              />
            </div>
            <div className="col-6 col-md-4 mb-2">
              <label className="mb-0"> Customer Type :</label>
              <input
                type="text"
                className="form-control"
                placeholder="Customer Type"
                value={formdata.customertype}
                readOnly
              />
            </div>
            <div className="col-6 col-md-4 mb-2">
              <label className="mb-0">Customer handle By :</label>
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
            <div className="col-6 col-md-4 mb-2">
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
            <div className="col-6 col-md-4 mb-2">
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
            <div className="col-6 col-md-4 mb-2">
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
            <div className="col-6 col-md-4 mb-2">
              <label className="mb-0"> Type of Loan :</label>
              <Select
                isMulti
                defaultValue={selectedOption}
                onChange={handleLoanType}
                options={options}
              />
            </div>
            {/* person deatils columns */}
            <div className="col-12 mt-2 text-lg text-center bg-light border rounded text-black mb-2">
              {" "}
              Person Details
            </div>
            {formdata?.persondetails?.map((it, i) => (
              <div key={i} className="col-12 row border-bottom mb-2">
                <div className="col-6 col-md-4 mb-2">
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
                <div className="col-6 col-md-4 mb-2">
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
                <div className="col-6 col-md-4 mb-2">
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
                <div className="col-6 col-md-4 mb-2">
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
                <div className="col-6 col-md-4 mb-2">
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
                <div className="col-6 col-md-4 mb-2">
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
                <div className="col-6 col-md-4 mb-2">
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
                <div className="col-6 col-md-4 mb-2">
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
                <div className="col-6 col-md-4 mb-2">
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
                <div className="col-6 col-md-4 mb-2">
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
            {formdata?.firm[0]?.name &&
              formdata.firm?.map((it, i) => (
                <div key={i} className="col-12 row mb-2">
                  <div className="col-12 mt-2 text-lg text-center bg-light border rounded text-black mb-2">
                    {" "}
                    Firm Details
                  </div>
                  <div className="col-6 col-md-4 mb-2">
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
                  <div className="col-6 col-md-4 mb-2">
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
                  <div className="col-6 col-md-4 mb-2">
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
            {formdata.company[0]?.name &&
              formdata.company?.map((it, i) => (
                <div key={i} className="col-12 row mb-2">
                  <div className="col-12 mt-2 text-lg text-center bg-light border rounded text-black mb-2">
                    {" "}
                    Company Details
                  </div>
                  <div className="col-6 col-md-4 mb-2">
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
                  <div className="col-6 col-md-4 mb-2">
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
                  <div className="col-6 col-md-4 mb-2">
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
            {formdata.cardetails?.map((it, i) => (
              <div key={i} className="col-12 row mb-2">
                <div className="col-12 mt-2 text-lg text-center text-black mb-2">
                  {" "}
                  Car Details
                </div>

                <div className="col-6 col-md-4 mb-2">
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
                <div className="col-6 col-md-4 mb-2">
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
                <div className="col-6 col-md-4 mb-2">
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
                <div className="col-6 col-md-4 mb-2">
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
                <div className="col-6 col-md-4 mb-2">
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
                <div className="col-6 col-md-4 mb-2">
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
                <p style={buttonStyle} onClick={() => handleCardelte(i)}>
                  <MdDelete color="red" />
                </p>
              </div>
            ))}
            <button
              className="btn btn-outline-dark"
              style={{ marginLeft: 16 }}
              onClick={handleaddnewCar}
            >
              Add new car
            </button>
            {/* property deatils columns */}
            {formdata?.propertydeatils?.map((it, i) => (
              <div key={i} className="col-12 row mb-2">
                <p style={buttonStyle} onClick={handlepropertydelte}>
                  <MdDelete color="red" />
                </p>
                <div className="col-12 mt-2 text-lg text-center text-black mb-2">
                  {" "}
                  Property Details {i + 1}
                </div>
                <div className="col-6 col-md-4 mb-2">
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
                <div className="col-6 col-md-4 mb-2">
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
                <div className="col-6 col-md-4 mb-2">
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
                <div className="col-6 col-md-4 mb-2">
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
            <button
              className="btn btn-outline-dark"
              style={{ marginLeft: 16 }}
              onClick={handleaddnewproperty}
            >
              Add new property
            </button>

            <div className="col-12 mt-2 text-lg text-center bg-light border rounded text-black mb-2">
              {" "}
              Reference Details
            </div>
            <div className="col-6 col-md-4 mb-2">
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
            <div className="col-6 col-md-4 mb-2">
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
          <button onClick={handleUpdate} className="btn btn-primary col-12 mt-2">
            Update Customer Detail
          </button>
        </form>
        
      </div>}
    </>
  );
  
};

export default EditPage;
