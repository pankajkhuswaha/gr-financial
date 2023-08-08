import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import {
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
import { addLoanDetailindvidual } from "features/loan/loanSlice";
import { toast } from "react-toastify";
import Select from "react-select";


const Next = ({ direction, ...args }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loanType, setSelectedLoans] = useState([]);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState("");
  const [rateOfInterest, setrateOfInterest] = useState("");
  const [tennuretime, settennuretime] = useState("");
  const [dateOfDisburment, setdateOfDisburment] = useState("");
  const previousp = useSelector((st) => st.customer.data.persondetails);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      loanType,
      loanAmount,
      rateOfInterest,
      tennuretime,
      dateOfDisburment,
    };
    if (loanType.length === 0) {
      toast.info("Please Select atleast one type of loan");
      return;
    }
    if (previousp.length !== 0) {
      dispatch(addLoanDetailindvidual(data));
      navigate("/AssetsDetail");
    } else {
      navigate("/admin");
      toast.error("error Occured");
    }
  };
  const [selectedOption, setSelectedOption] = useState();
  const options = [
    { value: "PL", label: "PL" },
    { value: "BL", label: "BL" },
    { value: "LAP", label: "LAP" },
    { value: "HL", label: "HL" },
    { value: "AL", label: "AL" },
  ];

  const handleLoanSelection = (e) => {
    setSelectedOption(e);
    const opt = e.map((itm) => itm.value);
    setSelectedLoans(opt);
  };

  return (
    <div className="registermain">
      <Col lg="12" md="12">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <p style={{ color: "gray", fontSize: "20px" }}>Loan Details</p>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <Row>
                <Col md="6">
                  <FormGroup>
                  <Select
                      isMulti
                      placeholder="Select Loan Type"
                      defaultValue={selectedOption}
                      onChange={handleLoanSelection}
                      options={options}
                    />
                  </FormGroup>
                    
                </Col>
                <Col md="6">
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa-solid fa-money-bill-1-wave"></i>{" "}
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Loan Amount"
                        type="number"
                        name="loan"
                        required
                        onChange={(e) => setLoanAmount(e.target.value)}
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
                          <i className="fa-solid fa-percent"></i>{" "}
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Rate of Interest"
                        type="NUMBER"
                        name="roi"
                        required
                        onChange={(e) => setrateOfInterest(e.target.value)}
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
                        placeholder="Tennure Time Year"
                        type="NUMBER"
                        name="tennuretime"
                        required
                        onChange={(e) => settennuretime(e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label style={{ color: "gray" }}>
                      Date of Disbursement
                    </Label>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa-sharp fa-solid fa-calendar"></i>{" "}
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Date of Disbursement"
                        type="date"
                        required
                        name="dateOfDisburment"
                        onChange={(e) => setdateOfDisburment(e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button className="mt-4" color="primary" type="submit">
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

export default Next;
