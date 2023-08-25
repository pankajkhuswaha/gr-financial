import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { addCustomer } from "utils/api";
import { resetData } from "features/loan/loanSlice";
import { uploadManyDoc } from "utils/api";

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
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const merge = { ...data, documents: docData };
    try {
      const res = await addCustomer(merge);
      console.log(res);
      dispatch(resetData());
      navigate("/admin/index");
      toast.success(res.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDocUploads = async (e, field) => {
    e.preventDefault();
    let url;
    try {
      url = await uploadManyDoc(e.target.files);

      if (url.includes("http")) {
        switch (field) {
          case "adr":
            setDocData({ ...docData, addhaarCard: url });
            break;
          case "pan":
            setDocData({ ...docData, PanCard: url });
            break;
          case "ayfirst":
            setDocData({ ...docData, ayFirstYear: url });
            break;
          case "aysecond":
            setDocData({ ...docData, aySecondYear: url });
            break;
          case "aythird":
            setDocData({ ...docData, ayThirdYear: url });
            break;
          case "loan":
            setDocData({ ...docData, loanSchedle: url });
            break;
          case "propaper":
            setDocData({ ...docData, propertyPaper: url });
            break;
          case "banking":
            setDocData({ ...docData, banking: url });
            break;
          case "salary":
            setDocData({ ...docData, salarySlip: url });
            break;
          case "form16":
            setDocData({ ...docData, form16: url });
            break;
          default:
            break;
        }
      }
    } catch (error) {}
  };
  const images = [
    "https://www.pexels.com/photo/woman-jumping-wearing-green-backpack-214574/",
    "https://www.pexels.com/photo/silhouette-photo-of-woman-against-during-golden-hour-39853/",
    "https://www.pexels.com/photo/person-hand-reaching-body-of-water-296282/",
    "https://www.pexels.com/photo/man-wearing-grey-shirt-standing-on-elevated-surface-103123/",
    "https://www.pexels.com/photo/woman-in-brown-coat-762041/"
  ];
  const [imageList, setImageList] = useState(images);

  const handleDragStart = (index) => (event) => {
    event.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (index) => (event) => {
    event.preventDefault();
  };

  const handleDrop = (index) => (event) => {
    event.preventDefault();

    const sourceIndex = Number(event.dataTransfer.getData("text/plain"));
    const updatedImages = [...imageList];
    const [movedImage] = updatedImages.splice(sourceIndex, 1);
    updatedImages.splice(index, 0, movedImage);

    setImageList(updatedImages);
  };

  return (
    <div className="registermain">
      
      <Col lg="12" md="12">
      <div>
        {imageList.map((image, index) => (
          <div
            key={index}
            draggable
            onDragStart={handleDragStart(index)}
            onDragOver={handleDragOver(index)}
            onDrop={handleDrop(index)}
          >
            <img src={image} alt={`mage ${index}`} />
          </div>
        ))}
      </div>
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <large style={{ color: "gray", fontSize: "20px" }}>
                Upload Files
              </large>
            </div>

            <Form role="form">
              {/* <FormGroup>
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
              </FormGroup> */}

              {/* {showKYC && (
                <>
                  <FormGroup>
                    <Label style={{ color: "gray" }}>Upload Addhaar Card</Label>
                    <InputGroup className="input-group-alternative mb-3 d-flex justify-content-between align-items-center">
                      <Input
                        className="col-8"
                        placeholder=""
                        type="file"
                        name="aadharFile"
                        onChange={(e) => handleDocUploads(e, "adr")}
                      />
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
                        onChange={(e) => handleDocUploads(e, "pan")}
                      />
                    </InputGroup>
                  </FormGroup>
                </>
              )} */}
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
                  <div className="mb-3 shadow-sm">
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
                  <div className="mb-3 shadow-sm">
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
                  <div className="mb-3 shadow-sm">
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
                  <div className="mb-3 shadow-sm">
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
                  <div className="mb-3 shadow-sm">
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
                  <div className="mb-3 shadow-sm">
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
                  <div className="mb-3 shadow-sm">
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
                  <div className="mb-3 shadow-sm">
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
