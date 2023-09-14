import { toggleLoading } from "features/loading/loadingSlice";
import { getallnotification } from "features/loan/loanSlice";
import { getallCustomerData } from "features/loan/loanSlice";
import { useFormik } from "formik";
import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete, MdDiversity3 } from "react-icons/md";
import { TbMapPinCode } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  Button,
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";
import { uploadManyDoc } from "utils/api";
import { uploadDoc } from "utils/api";
import { updateCustomer } from "utils/api";
const EditPage = () => {
  const data = useSelector((st) => st.view.data);
  console.log(data)
  const [showKYC, setShowKYC] = useState(false);
  const [ShowITR, setShowITR] = useState(false);
  const [otherdoc, setOtherdoc] = useState(false);
  const [formdata, setformdata] = useState(data);
  const prevtype = formdata?.loantype?.map((itm) => ({
    value: itm,
    label: itm,
  }));
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
    const updatedCardetails =
      formdata.cardetails.length === 0
        ? [newCar]
        : [...formdata.cardetails, newCar];
    setformdata({ ...formdata, cardetails: updatedCardetails });
  };
  const handleCardelte = (i) => {
    const updatedCardetails = [...formdata.cardetails];
    updatedCardetails.splice(i, 1);
    setformdata({ ...formdata, cardetails: updatedCardetails });
  };
  const handleaddnewproperty = (e) => {
    e.preventDefault();
    const newproperty = {
      propertyName: "",
      propertyDetail: "",
      propertyType: "",
      propertyAddress: "",
    };
    const updatedCardetails =
      formdata.propertydeatils.length === 0
        ? [newproperty]
        : [...formdata.propertydeatils, newproperty];
    setformdata({ ...formdata, propertydeatils: updatedCardetails });
  };
  const handlepropertydelte = (i) => {
    const updatedPropertyDetails = [...formdata.propertydeatils];
    updatedPropertyDetails.splice(i, 1);
    setformdata({ ...formdata, propertydeatils: updatedPropertyDetails });
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleUpdate = async (e) => {
    e.preventDefault();
    // console.log(formdata)
    try {
      const res = await updateCustomer(formdata);
      toast.success(res.message);
      dispatch(getallCustomerData());
      dispatch(getallnotification());
      navigate("/admin/index");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  const handlecarPolicy = async (e, i) => {
    dispatch(toggleLoading(true));
    const url = await uploadDoc(e.target.files[0]);
    let updatedCardetails = [...formdata.cardetails];
    updatedCardetails[i] = {
      ...updatedCardetails[i],
      policy: url,
    };
    setformdata({
      ...formdata,
      cardetails: updatedCardetails,
    });
    dispatch(toggleLoading(false));
  };
  const [showFP, setShowFP] = useState(false)
  const {
    values: personalDetailsVal,
    handleSubmit: personalDetailsSubmit,
    handleChange: personalDetailchange,
    resetForm: personalDetailsReset,
    setFieldValue: setPersonal,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      city: "",
      address: "",
      pincode: "",
      state: "",
      mobile: "",
      dob: "",
      mother: "",
      father: "",
      adhaarcard: "",
      panCard: "",
      salarySlip: "",
      AY_First_Year: [],
      AY_Second_Year: [],
      AY_Third_Year: [],
      Loan_Schedule: [],
      Property_Papers: [],
      Banking: [],
      Form_16: [],
    },
    onSubmit: (values) => {
      console.log(values);
      const updatedPersonDetails = [...formdata.persondetails, values]
      console.log(updatedPersonDetails)
      setformdata({
        ...formdata,
        persondetails: updatedPersonDetails,
      });
      setShowFP(false)
      personalDetailsReset();
    },
  });
  const handleDocUpload = async (e, field) => {
    e.preventDefault();
    let url;
    const file = e.target.files[0];
    dispatch(toggleLoading(true));
    try {
      url = await uploadDoc(file);
      if (url.includes("http")) {
        switch (field) {
          case "adr":
            setPersonal("adhaarcard", url);
            break;
          case "pan":
            setPersonal("panCard", url);
            break;
          case "salary":
            setPersonal("salarySlip", url);
            break;
          default:
            break;
        }
      }
    } catch (error) {}
    dispatch(toggleLoading(false));
  };

  const handleDocUploads = async (e, field) => {
    e.preventDefault();
    dispatch(toggleLoading(true));
    let url;
    try {
      url = await uploadManyDoc(e.target.files);
      switch (field) {
        case "ayfirst":
          setPersonal("AY_First_Year", url);
          break;
        case "aysecond":
          setPersonal("AY_Second_Year", url);
          break;
        case "aythird":
          setPersonal("AY_Third_Year", url);
          break;
        case "loan":
          setPersonal("Loan_Schedule", url);
          break;
        case "propaper":
          setPersonal("Property_Papers", url);
          break;
        case "banking":
          setPersonal("Banking", url);
          break;
        case "form16":
          setPersonal("Form_16", url);
          break;
        default:
          break;
      }
    } catch (error) {}
    dispatch(toggleLoading(false));
  };
  const personlEdit = (detail,i)=>{
    const prev  = [...formdata.persondetails]
    prev.splice(i,1) 
    setformdata({...formdata,persondetails:prev})
    setShowFP(true)
    Object.keys(detail).forEach((key) => {
      setPersonal(key, detail[key]);
    });
  }

  return (
    <>
      {formdata._id && (
        <div className="col-12 p-4">
          <p
            className="text-xl col-12 text-center mb-0 pb-0"
            style={{ fontWeight: "500" }}
          >
            Edit Details of Customer
          </p>
          <hr className="m-0 mb-2" />
          <div className="bg-white p-4 border shadow">
            <div className="row align-items-center justify-content-center">
              <div className="loanId row col-12">
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
              </div>
              <div className="row col-12 loandetails">
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
                      setformdata({
                        ...formdata,
                        rateOfInterest: e.target.value,
                      })
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
                      setformdata({
                        ...formdata,
                        dateOfDisburment: e.target.value,
                      })
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
              </div>
              {/* person deatils columns */}
              <div className="row col-12 personalDetails">
              <div className="col-12 mt-2 text-lg text-center bg-light border rounded text-black mb-2">
                {" "}
                Person Details
              </div>
              <button onClick={()=>setShowFP(true)} className="btn btn-primary mb-2" style={{marginLeft:"10px"}}>Add New Co-Applicant</button>
              {formdata?.persondetails?.length !== 0 && (
                  <table className="table border mb-4 mx-2">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Address</th>  
                        <th scope="col">Action</th>  
                      </tr>
                    </thead>
                    <tbody>
                      {formdata?.persondetails.map((row, i) => (
                        <tr key={i}>
                          <th scope="row">{i + 1}</th>
                          <td>{row.name}</td>
                          <td>{row.mobile}</td>
                          <td>{row.address}</td>
                          <td><FiEdit2 onClick={()=>personlEdit(row,i)} color="blue" fontSize={20} style={{cursor:"pointer"}}/></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              {showFP&&<form className="p-2" id="person_detail_form" onSubmit={personalDetailsSubmit}>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-hat-3" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Name"
                          type="text"
                          name="name"
                          value={personalDetailsVal.name}
                          onChange={personalDetailchange}
                          required
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Email"
                          type="email"
                          name="email"
                          required
                          value={personalDetailsVal.email}
                          onChange={personalDetailchange}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa-solid fa-mobile"></i>{" "}
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Mobile Number"
                          type="text"
                          name="mobile"
                          value={personalDetailsVal.mobile}
                          onChange={personalDetailchange}
                          required
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa-solid fa-house"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Address"
                          type="text"
                          name="address"
                          value={personalDetailsVal.address}
                          onChange={personalDetailchange}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <TbMapPinCode />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Pin Code"
                          type="text"
                          name="pincode"
                          value={personalDetailsVal.pincode}
                          onChange={personalDetailchange}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa-solid fa-house"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="City"
                          type="text"
                          name="city"
                          value={personalDetailsVal.city}
                          onChange={personalDetailchange}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa-solid fa-house-chimney"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="State"
                          type="text"
                          name="state"
                          value={personalDetailsVal.state}
                          onChange={personalDetailchange}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa-sharp fa-solid fa-calendar"></i>{" "}
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="DOB"
                          type="date"
                          name="dob"
                          value={personalDetailsVal.dob}
                          onChange={personalDetailchange}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa-solid fa-circle-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Mother Name"
                          type="text"
                          name="mother"
                          value={personalDetailsVal.mother}
                          onChange={personalDetailchange}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa-solid fa-circle-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Father Name"
                          type="text"
                          name="father"
                          value={personalDetailsVal.father}
                          onChange={personalDetailchange}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <div className="col-12 p-3">
                    <div className="w-full p-2 border shadow bg-white rounded d-flex justify-content-between align-items-center">
                      <p className="mb-0">Add Kyc Document</p>
                      {!showKYC && (
                        <p
                          onClick={() => setShowKYC(true)}
                          className="btb btn-primary px-3 text-xl rounded mb-0"
                        >
                          +
                        </p>
                      )}
                      {showKYC && (
                        <p
                          onClick={() => setShowKYC(false)}
                          className="btb btn-danger px-3 text-xl rounded mb-0"
                        >
                          -
                        </p>
                      )}
                    </div>
                  </div>
                  {showKYC && (
                    <>
                      <Col md="6">
                        <div className="mb-3 shadow-md">
                          {" "}
                          <label>Upload Adhaar Card</label>
                          <input
                            type="file"
                            className="fileinput"
                            name="adhaarcard"
                            onChange={(e) => handleDocUpload(e, "adr")}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="mb-3 shadow-md">
                          {" "}
                          <label>Upload Pan Card</label>
                          <input
                            type="file"
                            className="fileinput"
                            name="panCard"
                            onChange={(e) => handleDocUpload(e, "pan")}
                          />
                        </div>
                      </Col>
                    </>
                  )}

                  <div className="col-12 p-3">
                    <div className="w-full p-2 border shadow bg-white rounded d-flex justify-content-between align-items-center">
                      <p className="mb-0">Add ITR Document</p>
                      {!ShowITR && (
                        <p
                          onClick={() => setShowITR(true)}
                          className="btb btn-primary px-3 text-xl rounded mb-0"
                        >
                          +
                        </p>
                      )}
                      {ShowITR && (
                        <p
                          onClick={() => setShowITR(false)}
                          className="btb btn-danger px-3 text-xl rounded mb-0"
                        >
                          -
                        </p>
                      )}
                    </div>
                  </div>
                  {ShowITR && (
                    <div className="d-flex flex-wrap gap-2 justify-content-center">
                      <div className="mb-3 shadow-md col-12 col-md-6">
                        {" "}
                        <label>Upload Salary slip</label>
                        <input
                          type="file"
                          className="fileinput"
                          name="panCard"
                          onChange={(e) => handleDocUpload(e, "salary")}
                        />
                      </div>
                      <div className="mb-3 shadow-md col-12 col-md-6">
                        {" "}
                        <Label style={{ color: "gray" }}>AY First Year</Label>
                        <input
                          className="fileinput"
                          type="file"
                          name="ayfistYear"
                          multiple
                          onChange={(e) => handleDocUploads(e, "ayfirst")}
                        />
                      </div>
                      <div className="mb-3 shadow-md col-12 col-md-6">
                        {" "}
                        <Label style={{ color: "gray" }}>AY Second Year</Label>
                        <input
                          className="fileinput"
                          type="file"
                          name="aysecondYear"
                          multiple
                          onChange={(e) => handleDocUploads(e, "aysecond")}
                        />
                      </div>
                      <div className="mb-3 shadow-md col-12 col-md-6">
                        {" "}
                        <Label style={{ color: "gray" }}>AY Third Year</Label>
                        <input
                          className="fileinput"
                          type="file"
                          name="aythirdYear"
                          multiple
                          onChange={(e) => handleDocUploads(e, "aythird")}
                        />
                      </div>
                    </div>
                  )}

                  <div className="col-12 p-3">
                    <div className="w-full p-2 border shadow bg-white rounded d-flex justify-content-between align-items-center">
                      <p className="mb-0">Add Other Document</p>
                      {!otherdoc && (
                        <p
                          onClick={() => setOtherdoc(true)}
                          className="btb btn-primary px-3 text-xl rounded mb-0"
                        >
                          +
                        </p>
                      )}
                      {otherdoc && (
                        <p
                          onClick={() => setOtherdoc(false)}
                          className="btb btn-danger px-3 text-xl rounded mb-0"
                        >
                          -
                        </p>
                      )}
                    </div>
                  </div>
                  {otherdoc && (
                    <div className="d-flex flex-wrap gap-2 justify-content-start">
                      <div className="mb-3 shadow-md col-12 col-md-6">
                        {" "}
                        <Label style={{ color: "gray" }}>Loan Scheduler</Label>
                        <input
                          className="fileinput"
                          type="file"
                          name="loanSchedule"
                          multiple
                          onChange={(e) => handleDocUploads(e, "loan")}
                        />
                      </div>
                      <div className="mb-3 shadow-md col-12 col-md-6">
                        {" "}
                        <Label style={{ color: "gray" }}>Property Papers</Label>
                        <input
                          className="fileinput"
                          type="file"
                          name="propertyPapers"
                          multiple
                          onChange={(e) => handleDocUploads(e, "propaper")}
                        />
                      </div>
                      <div className="mb-3 shadow-md col-12 col-md-6">
                        {" "}
                        <Label style={{ color: "gray" }}>Banking</Label>
                        <input
                          className="fileinput"
                          type="file"
                          name="banking"
                          multiple
                          onChange={(e) => handleDocUploads(e, "banking")}
                        />
                      </div>
                      <div className="mb-3 shadow-md col-12 col-md-6">
                        {" "}
                        <Label style={{ color: "gray" }}>Salary Slip</Label>
                        <input
                          className="fileinput"
                          type="file"
                          name="salarySlip"
                          multiple
                          onChange={(e) => handleDocUploads(e, "salary")}
                        />
                      </div>
                      <div className="mb-3 shadow-md col-12 col-md-6">
                        {" "}
                        <Label style={{ color: "gray" }}>Form - 16</Label>
                        <input
                          className="fileinput"
                          type="file"
                          name="form16"
                          multiple
                          onChange={(e) => handleDocUploads(e, "form16")}
                        />
                      </div>
                    </div>
                  )}

                  <div className="d-flex justify-content-start col-12">
                    <Button className="mt-3" color="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </Row>                
              </form>}
              {/* {formdata?.persondetails?.map((it, i) => (
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
              ))} */}
              </div>
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
                    <label className="mb-0"> Policy Renewal Month :</label>
                    <Input
                      type="select"
                      name="dod"
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
                    >
                      <option value="">Select Month</option>
                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="August">August</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                    </Input>
                  </div>
                  <div className="col-6 col-md-4 mb-2">
                    <label className="mb-0"> Policy :</label>
                    <input
                      type="file"
                      placeholder="Enter Policy"
                      className="fileinput"
                      onChange={(e) => {
                        handlecarPolicy(e, i);
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
            <button
              onClick={handleUpdate}
              className="btn btn-primary col-12 mt-2"
            >
              Update Customer Detail
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditPage;
