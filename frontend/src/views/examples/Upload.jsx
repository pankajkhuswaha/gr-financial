import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Label,
  InputGroup,
  Col,
} from "reactstrap";
import { uploadDoc } from "utils/api";
import { addDocument } from "features/loan/loanSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addCustomer } from "utils/api";

const Upload = ({ direction, ...args }) => {
  const dispatch = useDispatch();

  const [showKYC, setShowKYC] = useState(false);
  const [showITR, setShowITR] = useState(false);
  const [otherdoc, setOtherdoc] = useState(false);
  const [docData, setDocData] = useState({
    addhaarCard: "",
    PanCard: "",
    ayFirstYear: "",
    aySecondYear: "",
    ayThirdYear: "",
    loanSchedle: "",
    propertyPaper: "",
    banking: "",
    salarySlip: "",
    form16: "",
  });
  const data = useSelector((st) => st.customer.data);
  // console.log(data)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addCustomer(data)
      toast.success(res.data);
      navigate("/admin/index")
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDocUpload = async (e, field) => {
    e.preventDefault();
    let url;
    switch (field) {
      case "adr":
        url = await uploadDoc(docData.addhaarCard);
        setDocData({ ...docData, addhaarCard: url });
        if (url) {
          toast.success("Addhaar Card uploaded Sucessfully");
        } else {
          toast.error("Addhaar Card upload failed !");
        }
        break;
      case "pan":
        url = await uploadDoc(docData.PanCard);
        setDocData({ ...docData, PanCard: url });
        if (url) {
          toast.success("Pan Card uploaded Sucessfully");
        } else {
          toast.error("Pan Card upload failed !");
        }
        break;
      case "ayfirst":
        url = await uploadDoc(docData.ayFirstYear);
        setDocData({ ...docData, ayFirstYear: url });
        if (url) {
          toast.success("AY First Year is uploaded Sucessfully");
        } else {
          toast.error("AY First Year upload failed !");
        }
        break;
      case "aysecond":
        url = await uploadDoc(docData.aySecondYear);
        setDocData({ ...docData, aySecondYear: url });
        if (url) {
          toast.success("AY Second Year is uploaded Sucessfully");
        } else {
          toast.error("AY Second Year upload failed !");
        }
        break;
      case "aythird":
        url = await uploadDoc(docData.ayThirdYear);
        setDocData({ ...docData, ayThirdYear: url });
        if (url) {
          toast.success("AY Third Year is uploaded Sucessfully");
        } else {
          toast.error("AY Third Year upload failed !");
        }
        break;
      case "loan":
        url = await uploadDoc(docData.loanSchedle);
        setDocData({ ...docData, loanSchedle: url });
        if (url) {
          toast.success("Loan Scedule is uploaded Sucessfully");
        } else {
          toast.error("Loan Scedule upload failed !");
        }
        break;
      case "propaper":
        url = await uploadDoc(docData.propertyPaper);
        setDocData({ ...docData, propertyPaper: url });
        if (url) {
          toast.success("Property Papers is uploaded Sucessfully");
        } else {
          toast.error("Property Papers upload failed !");
        }
        break;
      case "banking":
        url = await uploadDoc(docData.banking);
        setDocData({ ...docData, banking: url });
        if (url) {
          toast.success("Banking is uploaded Sucessfully");
        } else {
          toast.error("Banking upload failed !");
        }
        break;
      case "salary":
        url = await uploadDoc(docData.salarySlip);
        setDocData({ ...docData, salarySlip: url });
        if (url) {
          toast.success("Salary Slip is uploaded Sucessfully");
        } else {
          toast.error("Salary Slip upload failed !");
        }
        break;
      case "form16":
        url = await uploadDoc(docData.form16);
        setDocData({ ...docData, form16: url });
        if (url) {
          toast.success("Form 16 is uploaded Sucessfully");
        } else {
          toast.error("Form 16 upload failed !");
        }
        break;
      default:
        break;
    }
    dispatch(addDocument(docData));
  };

  return (
    <div className="registermain">
      <Col lg="12" md="12">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <large style={{ color: "gray", fontSize: "20px" }}>
                Upload Files
              </large>
            </div>

            <Form role="form">
              <FormGroup>
                <Button
                  className="uploadbut mt-4"
                  color="primary"
                  onClick={() => setShowKYC(!showKYC)}
                >
                  <span>
                    <i
                      style={{ margin: "0px 16px 0px 4px" }}
                      className="fa-solid fa-file"
                    ></i>
                    KYC
                    <i
                      style={{ margin: "0px 0px 0px 34px", fontSize: "25px" }}
                      className="fa-solid fa-down-left-and-up-right-to-center"
                    ></i>
                  </span>
                </Button>
              </FormGroup>

              {showKYC && (
                <>
                  <FormGroup>
                    <Label style={{ color: "gray" }}>Upload Addhaar Card</Label>
                    <InputGroup className="input-group-alternative mb-3 d-flex justify-content-between align-items-center">
                      <Input
                        className="col-8"
                        placeholder=""
                        type="file"
                        name="aadharFile"
                        onChange={(e) =>
                          setDocData({
                            ...docData,
                            addhaarCard: e.target.files[0],
                          })
                        }
                      />
                      <button
                        className="btn btn-primary col-3"
                        onClick={(e) => handleDocUpload(e, "adr")}
                      >
                        Upload
                      </button>
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <Label style={{ color: "gray" }}>Upload Pan Card</Label>
                    <InputGroup className="input-group-alternative mb-3 d-flex justify-content-between align-items-center">
                      <Input
                        className="col-8"
                        placeholder=""
                        type="file"
                        name="panfile"
                        onChange={(e) =>
                          setDocData({
                            ...docData,
                            PanCard: e.target.files[0],
                          })
                        }
                      />
                      <button
                        className="btn btn-primary col-3"
                        onClick={(e) => handleDocUpload(e, "pan")}
                      >
                        Upload
                      </button>
                    </InputGroup>
                  </FormGroup>
                </>
              )}
              <FormGroup>
                <Button
                  className=" uploadbut mt-4"
                  color="primary"
                  onClick={() => setShowITR(!showITR)}
                >
                  <span>
                    <i
                      style={{ margin: "0px 16px 0px 4px" }}
                      className="fa-solid fa-file"
                    ></i>
                    Financial Documents
                    <i
                      style={{ margin: "0px 0px 0px 34px", fontSize: "25px" }}
                      className="fa-solid fa-down-left-and-up-right-to-center"
                    ></i>
                  </span>
                </Button>
              </FormGroup>
              {showITR && (
                <>
                  <FormGroup>
                    <Label style={{ color: "gray" }}>AY First Year</Label>
                    <InputGroup className="input-group-alternative mb-3 d-flex justify-content-between align-items-center">
                      <Input
                        className="col-8"
                        placeholder=""
                        type="file"
                        name="ayfistYear"
                        onChange={(e) =>
                          setDocData({
                            ...docData,
                            ayFirstYear: e.target.files[0],
                          })
                        }
                      />
                      <button
                        className="btn btn-primary col-3"
                        onClick={(e) => handleDocUpload(e, "ayfirst")}
                      >
                        Upload
                      </button>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <Label style={{ color: "gray" }}>AY Second Year</Label>
                    <InputGroup className="input-group-alternative mb-3 d-flex justify-content-between align-items-center">
                      <Input
                        className="col-8"
                        placeholder=""
                        type="file"
                        name="aysecondYear"
                        onChange={(e) =>
                          setDocData({
                            ...docData,
                            aySecondYear: e.target.files[0],
                          })
                        }
                      />
                      <button
                        className="btn btn-primary col-3"
                        onClick={(e) => handleDocUpload(e, "aysecond")}
                      >
                        Upload
                      </button>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <Label style={{ color: "gray" }}>AY Third Year</Label>
                    <InputGroup className="input-group-alternative mb-3 d-flex justify-content-between align-items-center">
                      <Input
                        className="col-8"
                        placeholder=""
                        type="file"
                        name="aythirdYear"
                        onChange={(e) =>
                          setDocData({
                            ...docData,
                            ayThirdYear: e.target.files[0],
                          })
                        }
                      />
                      <button
                        className="btn btn-primary col-3"
                        onClick={(e) => handleDocUpload(e, "aythird")}
                      >
                        Upload
                      </button>
                    </InputGroup>
                  </FormGroup>
                </>
              )}
              <FormGroup>
                <Button
                  className=" uploadbut mt-4"
                  color="primary"
                  onClick={() => setOtherdoc(!otherdoc)}
                >
                  <span>
                    <i
                      style={{ margin: "0px 16px 0px 4px" }}
                      className="fa-solid fa-file"
                    ></i>
                    Other Documents
                    <i
                      style={{ margin: "0px 0px 0px 34px", fontSize: "25px" }}
                      className="fa-solid fa-down-left-and-up-right-to-center"
                    ></i>
                  </span>
                </Button>
              </FormGroup>

              {otherdoc && (
                <>
                  <FormGroup>
                    <Label style={{ color: "gray" }}>Loan Scheduler</Label>
                    <InputGroup className="input-group-alternative mb-3 d-flex justify-content-between align-items-center">
                      <Input
                        className="col-8"
                        placeholder=""
                        type="file"
                        name="loanSchedule"
                        onChange={(e) =>
                          setDocData({
                            ...docData,
                            loanSchedle: e.target.files[0],
                          })
                        }
                      />
                      <button
                        className="btn btn-primary col-3"
                        onClick={(e) => handleDocUpload(e, "loan")}
                      >
                        Upload
                      </button>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <Label style={{ color: "gray" }}>Property Papers</Label>
                    <InputGroup className="input-group-alternative mb-3 d-flex justify-content-between align-items-center">
                      <Input
                        className="col-8"
                        placeholder=""
                        type="file"
                        name="propertyPapers"
                        onChange={(e) =>
                          setDocData({
                            ...docData,
                            propertyPaper: e.target.files[0],
                          })
                        }
                      />
                      <button
                        className="btn btn-primary col-3"
                        onClick={(e) => handleDocUpload(e, "propaper")}
                      >
                        Upload
                      </button>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <Label style={{ color: "gray" }}>Banking</Label>
                    <InputGroup className="input-group-alternative mb-3 d-flex justify-content-between align-items-center">
                      <Input
                        className="col-8"
                        placeholder=""
                        type="file"
                        name="banking"
                        onChange={(e) =>
                          setDocData({
                            ...docData,
                            banking: e.target.files[0],
                          })
                        }
                      />
                      <button
                        className="btn btn-primary col-3"
                        onClick={(e) => handleDocUpload(e, "banking")}
                      >
                        Upload
                      </button>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <Label style={{ color: "gray" }}>Salary Slip</Label>
                    <InputGroup className="input-group-alternative mb-3 d-flex justify-content-between align-items-center">
                      <Input
                        className="col-8"
                        placeholder=""
                        type="file"
                        name="salarySlip"
                        onChange={(e) =>
                          setDocData({
                            ...docData,
                            salarySlip: e.target.files[0],
                          })
                        }
                      />
                      <button
                        className="btn btn-primary col-3"
                        onClick={(e) => handleDocUpload(e, "salary")}
                      >
                        Upload
                      </button>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <Label style={{ color: "gray" }}>Form - 16</Label>
                    <InputGroup className="input-group-alternative mb-3 d-flex justify-content-between align-items-center">
                      <Input
                        className="col-8"
                        placeholder=""
                        type="file"
                        name="form16"
                        onChange={(e) =>
                          setDocData({
                            ...docData,
                            form16: e.target.files[0],
                          })
                        }
                      />
                      <button
                        className="btn btn-primary col-3"
                        onClick={(e) => handleDocUpload(e, "form16")}
                      >
                        Upload
                      </button>
                    </InputGroup>
                  </FormGroup>
                </>
              )}

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  onClick={(e) => handleSubmit(e)}
                  className="mt-4"
                  color="primary"
                >
                  Create Customer
                </Button>
              </div>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </Form>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default Upload;
