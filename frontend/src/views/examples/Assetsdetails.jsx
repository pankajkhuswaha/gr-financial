import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Label,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { addPropertyindvidual,addcarindvidual } from "features/loan/loanSlice";
import { toast } from "react-toastify";
import { addasset } from "features/loan/loanSlice";
import { useNavigate } from "react-router-dom";
import { uploadDoc } from "utils/api";

const Assetsdetails = ({ direction, ...args }) => {
  const [propertyOption, setPropertyOption] = useState("");
  const [carOption, setCarOption] = useState("");

  const dispatch = useDispatch();
  const [propertyDetails, setpropertyDetails] = useState({
    propertyName: "",
    propertyDetail: "",
    propertyType: "",
    propertyAddress: "",
  });
  const previousproperty = useSelector(
    (st) => st.customer.data.assetdetail.propertyDetails
  );
  const previouscar = useSelector(
    (st) => st.customer.data.assetdetail.carDetails
  );
  const [cardetails, setCardetails] = useState({
    carName: "",
    modelNumber: "",
    insuredBy: "",
    cardetails: "",
    policyRenewalMonth: "",
  });


  const [profitentfund, setProfitantFund] = useState("");

  const [cashinhand, setCashinHand] = useState("");
  const navigate = useNavigate()

  const handleAsset = (e) => {
    e.preventDefault();
    if(profitentfund , cashinhand){
      const data ={profitentfund , cashinhand}
      dispatch(addasset(data))
      navigate("/upload")
    }else{
      toast.warn("Please fill all the details to continue")
    }
  };

  const handleFileUpload =async (file) => {
    let url = await uploadDoc(file);
    setCardetails({ ...cardetails, cardetails: url });
    if(url){
      toast.success("Policy is uploaded Sucessfully")
    }
  };
  const addPropertyForm = () => {
    const { propertyName, propertyDetail, propertyType, propertyAddress } =
      propertyDetails;
    if ((propertyName, propertyDetail, propertyType, propertyAddress)) {
      dispatch(addPropertyindvidual(propertyDetails));
      toast.success("Property details is added Sucessfully");
      setpropertyDetails({
        propertyName: "",
        propertyDetail: "",
        propertyType: "",
        propertyAddress: "",
      })
    } else {
      toast.warn("Please fill all the details about Property");
    }
  };

  const addCarForm = () => {
    const { carName, modelNumber, insuredBy, policy, policyRenewalMonth } =
      cardetails;
    if ((carName, modelNumber, insuredBy, policy, policyRenewalMonth)) {
      dispatch(addcarindvidual(cardetails));
      setCardetails({
        carName: "",
        modelNumber: "",
        insuredBy: "",
        cardetails: "",
        policyRenewalMonth: "",
      })
      toast.success("Car details is added Sucessfully");
    } else {
      toast.warn("Please fill all the details about Car");
    }
  };

  const handlePropertyOptionChange = (e) => {
    setPropertyOption(e.target.value);
  };

  const handleCarOptionChange = (e) => {
    setCarOption(e.target.value);
  };

  return (
    <div className="registermain">
      <Col lg="12" md="12">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <p style={{ color: "gray", fontSize: "20px" }}>Assets Details</p>
            </div>
            <Form role="form">
              <Row>
                <Col md="6">
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa-solid fa-percent"></i>{" "}
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Provident Fund"
                        type="number"
                        name="profitentfund"
                        onChange={(e) => setProfitantFund(e.target.value)}
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
                        placeholder="Cash in Hand"
                        type="number"
                        name="cashinhand"
                        onChange={(e) => setCashinHand(e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Label style={{ color: "gray" }} for="propertyOption">
                      Property Details
                    </Label>
                    <Input
                      type="select"
                      name="propertyOption"
                      id="propertyOption"
                      onChange={(e) => handlePropertyOptionChange(e)}
                    >
                      <option value="">Select Option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              {propertyOption === "Yes" && (
                <>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa-sharp fa-solid fa-calendar"></i>{" "}
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Property Name"
                            type="text"
                            name="propertyName"
                            value={propertyDetails.propertyName}
                            onChange={(e) =>
                              setpropertyDetails({
                                ...propertyDetails,
                                propertyName: e.target.value,
                              })
                            }
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
                            placeholder="Property Details"
                            type="text"
                            name="propertyDetail"
                            value={propertyDetails.propertyDetail}
                            onChange={(e) =>
                              setpropertyDetails({
                                ...propertyDetails,
                                propertyDetail: e.target.value,
                              })
                            }
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
                            placeholder="Property Type"
                            type="text"
                            name="propertyType"
                            value={propertyDetails.propertyType}
                            onChange={(e) =>
                              setpropertyDetails({
                                ...propertyDetails,
                                propertyType: e.target.value,
                              })
                            }
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
                            placeholder="Property Address"
                            type="text"
                            name="propertyAddress"
                            value={propertyDetails.propertyAddress}
                            onChange={(e) =>
                              setpropertyDetails({
                                ...propertyDetails,
                                propertyAddress: e.target.value,
                              })
                            }
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button className="mb-2" onClick={addPropertyForm}>
                    Add
                  </Button>
                </>
              )}
              {previousproperty?.length !== 0 && (
                <table
                  className="table border mb-4"
                  style={{ overflowX: "scroll" }}
                >
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Property Name</th>
                      <th scope="col">Property Type</th>
                      <th scope="col">Property Detail</th>
                      <th scope="col">Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previousproperty.map((row, i) => (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{row.propertyName}</td>
                        <td>{row.propertyType}</td>
                        <td>{row.propertyDetail}</td>
                        <td>{row.propertyAddress}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Label style={{ color: "gray" }} for="carOption">
                      Do you have a car?
                    </Label>
                    <Input
                      type="select"
                      name="carOption"
                      id="carOption"
                      onChange={(e) => handleCarOptionChange(e)}
                    >
                      <option value="">Select Option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              {carOption === "Yes" && (
                <>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa-sharp fa-solid fa-car"></i>{" "}
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Car Name"
                            type="text"
                            name="carName"
                            value={cardetails.carName}
                            onChange={(e) =>
                              setCardetails({
                                ...cardetails,
                                carName: e.target.value,
                              })
                            }
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa-sharp fa-solid fa-car"></i>{" "}
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Model Number"
                            type="text"
                            name="modelNumber"
                            value={cardetails.modelNumber}
                            onChange={(e) =>
                              setCardetails({
                                ...cardetails,
                                modelNumber: e.target.value,
                              })
                            }
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa-sharp fa-solid fa-car"></i>{" "}
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Insured By"
                            type="text"
                            name="insuredBy"
                            value={cardetails.insuredBy}
                            onChange={(e) =>
                              setCardetails({
                                ...cardetails,
                                insuredBy: e.target.value,
                              })
                            }
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>Policy Upload</Label>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend"></InputGroupAddon>
                          <Input
                            placeholder="Policy Upload "
                            type="file"
                            name="upload"
                            onChange={(e) => handleFileUpload(e.target.files[0])}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label style={{ color: "gray" }}>Renewable Month</Label>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa-sharp fa-solid fa-calendar"></i>{" "}
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="select"
                            name="dod"
                            value={cardetails.policyRenewalMonth}
                            onChange={(e) =>
                              setCardetails({
                                ...cardetails,
                                policyRenewalMonth: e.target.value,
                              })
                            }
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
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button onClick={addCarForm}>Add</Button>
                  <hr />
                </>
              )}
              {previouscar?.length !== 0 && (
                <table
                  className="table border mb-4"
                  style={{ overflowX: "scroll" }}
                >
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Car Name</th>
                      <th scope="col">Model No</th>
                      <th scope="col">Insurred By</th>
                      <th scope="col">Renewal Month</th>
                      {/* <th scope="col">Policy</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {previouscar.map((row, i) => (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{row.carName}</td>
                        <td>{row.modelNumber}</td>
                        <td>{row.insuredBy}</td>
                        <td>{row.policyRenewalMonth}</td>
                        {/* <td>{row.policy}</td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div className="d-flex justify-content-end">
                <Button
                  onClick={handleAsset}
                  className="mt-4"
                  color="primary"
                  type="submit"
                >
                  Next
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default Assetsdetails;
