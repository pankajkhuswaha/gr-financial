import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { TbMapPinCode } from "react-icons/tb";
// import { addPerson } from "features/loan/loanSlice";
// import { addReference } from "features/loan/loanSlice";
import {
  addPerson,
  addFirm,
  addloanType,
  addReference,
} from "features/loan/loanSlice";

const Firm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setaddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [mother, setMother] = useState("");
  const [father, setFather] = useState("");
  const [firstreferance, firstsetreferance] = useState("");
  const [secondreference, setsecondreference] = useState("");
  const [Firmdata, setFirmdata] = useState({
    name: "",
    type: "",
    adress: "",
  });
  const previousp = useSelector((st) => st.customer.data.persondetails);

  const handlpersonData = () => {
    const data = {
      name,
      email,
      city,
      address,
      pincode,
      state,
      mobile,
      dob,
      mother,
      father,
    };
    if (
      (name, address, email, city, pincode, state, mobile, dob, mother, father)
    ) {
      dispatch(addPerson(data));
      setName("");
      setEmail("");
      setaddress("");
      setCity("");
      setPincode("");
      setState("");
      setMobile("");
      setDob("");
      setMother("");
      setFather("");
    } else {
      toast.error("Please fill all the details of user.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (previousp.length === 0) {
      toast.info("Plaese fill the user details first to continue!");
    } else {
      if ((firstreferance, secondreference)) {
        const data = { firstreferance, secondreference };
        dispatch(addReference(data));
        if ((Firmdata.name, Firmdata.type, Firmdata.adress)) {
          dispatch(addFirm(Firmdata));
          dispatch(addloanType("Firm"));
          navigate("/NextStep");
        } else {
          toast.warn("Please fill the firm Details !");
        }
      } else {
        toast.warn("Please fill the reference name");
      }
    }
    // console.log(Firmdata);
  };

  return (
    <div className="registermain">
      <Col lg="12" md="12">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <p style={{ color: "gray", fontSize: "20px" }}> Firm</p>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        value={email}
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
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
                        value={mobile}
                        name="mobileNumber"
                        onChange={(e) => setMobile(e.target.value)}
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
                        value={address}
                        name="address"
                        onChange={(e) => setaddress(e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
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
                        value={pincode}
                        type="text"
                        name="pinCode"
                        onChange={(e) => setPincode(e.target.value)}
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
                        value={city}
                        type="text"
                        name="city"
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
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
                        value={state}
                        name="state"
                        onChange={(e) => setState(e.target.value)}
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
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
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
                        value={mother}
                        name="motherName"
                        onChange={(e) => setMother(e.target.value)}
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
                        value={father}
                        name="fatherName"
                        onChange={(e) => setFather(e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              {previousp?.length !== 0 && (
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
                    {previousp.map((row, i) => (
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
              <Row>
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
                        onChange={(e) => firstsetreferance(e.target.value)}
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
                        onChange={(e) => setsecondreference(e.target.value)}
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
                        placeholder="Firm Name"
                        type="text"
                        name="firmname"
                        value={Firmdata.name}
                        onChange={(e) =>
                          setFirmdata({ ...Firmdata, name: e.target.value })
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
                          <i className="fa-solid fa-circle-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Firm type"
                        type="text"
                        value={Firmdata.type}
                        name="firmtype"
                        onChange={(e) =>
                          setFirmdata({ ...Firmdata, type: e.target.value })
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
                          <i className="fa-solid fa-circle-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Firm Adress"
                        type="text"
                        name="secondreference"
                        value={Firmdata.adress}
                        onChange={(e) =>
                          setFirmdata({ ...Firmdata, adress: e.target.value })
                        }
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  onClick={handlpersonData}
                  className="mt-4"
                  color="primary"
                >
                  Add More
                </Button>
                <Button className="mt-4" color="primary" type="submit">
                  Next
                </Button>
              </div>
              <ToastContainer />
            </Form>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default Firm;
