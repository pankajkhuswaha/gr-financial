import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Label,
} from "reactstrap";
import { TbMapPinCode } from "react-icons/tb";
import { uploadDoc } from "utils/api";
import { addPerson } from "features/loan/loanSlice";
import { addReference } from "features/loan/loanSlice";
import { addCompany } from "features/loan/loanSlice";
import { addloanType } from "features/loan/loanSlice";
import { addFirm } from "features/loan/loanSlice";
import { toggleLoading } from "features/loading/loadingSlice";
import { uploadManyDoc } from "utils/api";

const AddCustomerDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showKYC, setShowKYC] = useState(false);
  const [ShowITR, setShowITR] = useState(false);
  const [otherdoc, setOtherdoc] = useState(false);
  const typeofLoan = useLocation().state;
  const previouspersonDetails = useSelector(
    (st) => st.customer.data.persondetails
  );

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
      dispatch(addPerson(values));
      personalDetailsReset();
    },
  });

  const {
    values: mainVal,
    handleSubmit: mainSubmit,
    handleChange: mainchange,
    // resetForm: companyReset,
  } = useFormik({
    initialValues: {
      firstreferance: "",
      secondreference: "",
      comapanyDetails: {
        name: "",
        type: "",
        adress: "",
      },
      firmDetails: {
        name: "",
        type: "",
        adress: "",
      },
    },
    onSubmit: (values) => {
      if (previouspersonDetails.length === 0) {
        toast.info("Plaese fill the user details first to continue!");
      } else {
        const data = {
          firstreferance: mainVal.firstreferance,
          secondreference: mainVal.secondreference,
        };
        const comapnyData = mainVal.comapanyDetails;
        const firmData = mainVal.firmDetails;
        dispatch(addReference(data));
        if (comapnyData.name || firmData.name) {
          if (comapnyData.name) {
            dispatch(addCompany(comapnyData));
            dispatch(addloanType("Company"));
            navigate("/NextStep");
          } else if (firmData.name) {
            dispatch(addFirm(firmData));
            dispatch(addloanType("Firm"));
            navigate("/NextStep");
          } else {
            toast.warn("Please fill the all the Details !");
          }
        } else {
          dispatch(addloanType("Individual"));
          navigate("/NextStep");
        }
      }

      // companyDetailsReset();
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

  return (
    <div>
      <div className="registermain">
        <Col lg="12" md="12">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <p style={{ color: "gray", fontSize: "20px" }}>
                  {typeofLoan === "firm" && "Add Firm"}{" "}
                  {typeofLoan === "company" && "Add Company"}
                  {typeofLoan === "individual" && "Add Individual Loan"}
                </p>
              </div>

              <Form id="person_detail_form" onSubmit={personalDetailsSubmit}>
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
                    <div className="w-full p-2 shadow-sm bg-white rounded d-flex justify-content-between align-items-center">
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
                        <div className="mb-3 shadow-sm">
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
                        <div className="mb-3 shadow-sm">
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
                    <div className="w-full p-2 shadow-sm bg-white rounded d-flex justify-content-between align-items-center">
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
                      <div className="mb-3 shadow-sm col-12 col-md-6">
                        {" "}
                        <label>Upload Salary slip</label>
                        <input
                          type="file"
                          className="fileinput"
                          name="panCard"
                          onChange={(e) => handleDocUpload(e, "salary")}
                        />
                      </div>
                      <div className="mb-3 shadow-sm col-12 col-md-6">
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
                      <div className="mb-3 shadow-sm col-12 col-md-6">
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
                      <div className="mb-3 shadow-sm col-12 col-md-6">
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
                    <div className="w-full p-2 shadow-sm bg-white rounded d-flex justify-content-between align-items-center">
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
                      <div className="mb-3 shadow-sm col-12 col-md-6">
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
                      <div className="mb-3 shadow-sm col-12 col-md-6">
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
                      <div className="mb-3 shadow-sm col-12 col-md-6">
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
                      <div className="mb-3 shadow-sm col-12 col-md-6">
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
                      <div className="mb-3 shadow-sm col-12 col-md-6">
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
                      Add More
                    </Button>
                  </div>
                </Row>

                {previouspersonDetails?.length !== 0 && (
                  <table className="table border mb-4">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previouspersonDetails.map((row, i) => (
                        <tr key={i}>
                          <th scope="row">{i + 1}</th>
                          <td>{row.name}</td>
                          <td>{row.mobile}</td>
                          <td>{row.address}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </Form>

              <Form onSubmit={mainSubmit} className="mt-4">
                {typeofLoan === "company" && (
                  <Row className="company_form">
                    <Col md="6">
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa-solid fa-circle-user" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Company Name"
                            type="text"
                            name="comapanyDetails.name"
                            required
                            value={mainVal.comapanyDetails.name}
                            onChange={mainchange}
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
                            placeholder="Company type"
                            type="text"
                            name="comapanyDetails.type"
                            required
                            value={mainVal.comapanyDetails.type}
                            onChange={mainchange}
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
                            placeholder="Company Adress"
                            type="text"
                            required
                            name="comapanyDetails.adress"
                            value={mainVal.comapanyDetails.adress}
                            onChange={mainchange}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                )}

                {typeofLoan === "firm" && (
                  <Row className="firm_form">
                    <Col md="6">
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa-solid fa-circle-user" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Firm Name"
                            type="text"
                            name="firmDetails.name"
                            value={mainVal.firmDetails.name}
                            onChange={mainchange}
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
                            placeholder="Firm type"
                            type="text"
                            name="firmDetails.type"
                            value={mainVal.firmDetails.type}
                            onChange={mainchange}
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
                            placeholder="Firm Address"
                            type="text"
                            name="firmDetails.adress"
                            value={mainVal.firmDetails.adress}
                            onChange={mainchange}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                )}

                <Row id="reference_form">
                  <Col md="6">
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa-solid fa-circle-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="First Reference Name"
                          type="text"
                          name="firstreferance"
                          required
                          value={mainVal.firstreferance}
                          onChange={mainchange}
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
                          placeholder="Second Reference Name"
                          type="text"
                          name="secondreference"
                          required
                          value={mainVal.secondreference}
                          onChange={mainchange}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>

                <div className="col-12 d-flex justify-content-end">
                  <Button className="mt-2" color="primary" type="submit">
                    Next
                  </Button>
                </div>
              </Form>

              <ToastContainer />
            </CardBody>
          </Card>
        </Col>
      </div>
    </div>
  );
};

export default AddCustomerDetails;
