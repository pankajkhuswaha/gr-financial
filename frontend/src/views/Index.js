import { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import { GrView } from "react-icons/gr";
import Select from "react-select";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import {
  Button,
  Card,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getallCustomerData } from "features/loan/loanSlice";
import { addviewCustomer } from "features/loan/customer";
import { deleteCustomer } from "utils/api";
import { getallUserAcess } from "features/loan/loanSlice";
import { assignCustomers } from "utils/api";
import { getallnotification } from "features/loan/loanSlice";

const Index = ({ direction, ...args }) => {
  const [show, setShow] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const intial = useSelector((st) => st.customer.customerdata);
  const [customers, setCustomers] = useState([]);
  const filters = useSelector((st) => st.customer.filterdata);
  const searchs = useSelector((st) => st.customer.filterdata);
  const allusers = useSelector((st) => st.customer.userlist);
  useEffect(() => {
    dispatch(getallCustomerData());
    dispatch(getallUserAcess());
  }, [dispatch]);

  useEffect(() => {
    setCustomers(intial);
  }, [intial]);

  useEffect(() => {
    if (typeof filters === "string") {
      setCustomers(intial);
    } else {
      setCustomers(filters);
    }
  }, [filters, intial]);

  useEffect(() => {
    if (typeof searchs === "string") {
      setCustomers(intial);
    } else {
      setCustomers(searchs);
    }
  }, [searchs, intial]);
  const handleView = async (itm) => {
    dispatch(addviewCustomer(itm));
    navigate("/admin/view");
  };
  const handleEdit = async (itm) => {
    dispatch(addviewCustomer(itm));
    navigate("/admin/edit");
  };
  const handleDelete = async (itm) => {
    const _id = itm._id;
    try {
      const res = await deleteCustomer({ _id });
      toast.info(res);
      dispatch(getallCustomerData());
      dispatch(getallnotification());
    } catch (error) {
      toast.error(error.message);
    }
  };
  const [selectedOption, setSelectedOption] = useState();
  const options = [
    { value: "Individual", label: "Individual" },
    { value: "Company", label: "Comapany" },
    { value: "Firm", label: "Firm" },
  ];

  const handleLoanSelection = (e) => {
    setSelectedOption(e);
    const opt = e.value;
    const filt = intial.filter((item) => opt.includes(item.customertype));
    setCustomers(filt);
  };
  const user = JSON.parse(localStorage.getItem("user"));
  const handleAssign = async (e, it) => {
    const data = { userid: e.target.value, customerid: it };
    try {
      const res = await assignCustomers(data);
      toast.success(res);
    } catch (error) {
      toast.error(error.response.data);
    }
    dispatch(getallCustomerData())
  };

  return (
    <>
      <ToastContainer />
      <Header />
      {/* filter  */}
      <div className="trigeredbut">
        <Card className="shadow col-12">
          <CardHeader className="border-0">
            <div className="d-flex flex-col md-flex-row align-items-center col-12 justify-content-between ">
              <div className="col-12 col-md-8 mt-4 d-flex align-items-center">
                <Select
                  className="col-6"
                  placeholder="Select Customer Type"
                  defaultValue={selectedOption}
                  onChange={handleLoanSelection}
                  options={options}
                />
                <Button
                  onClick={() => setCustomers(intial)}
                  className="col-3 btn btn-danger"
                >
                  Clear Filters
                </Button>
              </div>
              <div className="col-12 col-md-4">
                <Dropdown
                  isOpen={dropdownOpen}
                  toggle={toggle}
                  direction={direction}
                >
                  <DropdownToggle caret>Add New Costumer</DropdownToggle>
                  <DropdownMenu {...args}>
                    <Link to={"/auth/add-customer-detail"} state={"individual"}>
                      <DropdownItem>Individual</DropdownItem>
                    </Link>
                    <Link to={"/auth/add-customer-detail"} state={"firm"}>
                      <DropdownItem>Firm</DropdownItem>
                    </Link>{" "}
                    <Link to={"/auth/add-customer-detail"} state={"company"}>
                      <DropdownItem>Company</DropdownItem>
                    </Link>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
      {/*  */}
      {show ? (
        <div className="trigeredbut">
          <Card className="shadow col-12">
            <CardHeader className="border-0">
              <Row className="align-items-center ">
                <div className="filter">
                  <h3>Types of Loan</h3>
                </div>
                <div className="filterloan">
                  <div className="cols">
                    <Button color="primary" outline size="md">
                      PL
                    </Button>
                  </div>
                  <div className="cols">
                    <Button color="primary" outline size="md">
                      BL
                    </Button>
                  </div>
                  <div className="cols">
                    <Button color="primary" outline size="md">
                      LAP
                    </Button>
                  </div>
                  <div className="cols">
                    <Button color="primary" outline size="md">
                      HL
                    </Button>
                  </div>
                  <div className="cols">
                    <Button color="primary" outline size="md">
                      AL
                    </Button>
                  </div>
                </div>
              </Row>
            </CardHeader>
          </Card>
        </div>
      ) : null}

      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8"></Col>
          <Col xl="4"></Col>
        </Row>
        <Row className="mt-5">
          <Card className="shadow col-12">
            <CardHeader className="border-0">
              <Row className="align-items-center">
                <div className="col">
                  <h3 className="mb-0">Recent Users</h3>
                </div>
              </Row>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col" style={{ maxWidth: "45px" }}>
                    Sr.No
                  </th>
                  <th scope="col">Date</th>
                  <th scope="col" style={{ maxWidth: "120px" }}>
                    Customer Type
                  </th>
                  {user?.super && <th scope="col">Assign</th>}
                  <th scope="col">Customer name</th>
                  <th scope="col" style={{ maxWidth: "90px" }}>
                    Mobile
                  </th>
                  <th scope="col" style={{ maxWidth: "90px" }}>
                    Loan Type
                  </th>
                  <th scope="col" style={{ maxWidth: "90px" }}>
                    Loan Amount
                  </th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {customers &&
                  customers?.map((itm, i) => (
                    <tr key={i}>
                      <th scope="row" style={{ maxWidth: "45px" }}>
                        {i + 1}
                      </th>
                      <td>{itm.createdAt.split("T")[0]}</td>
                      <td>{itm.customertype}</td>
                      {user?.super && (
                        <td>
                          <div className="form-control">
                            <select
                              className="border-0"
                              onChange={(e) => handleAssign(e, itm._id)}
                            >
                              <option>{itm.handleby}</option>
                              {allusers.map((user, i) => {
                                if (user.name !== itm.handleby) {
                                  return (
                                    <option value={user._id} key={i}>
                                      {user.name}
                                    </option>
                                  );
                                }
                              })}
                            </select>
                          </div>
                        </td>
                      )}
                      <td>{itm.persondetails[0]?.name}</td>
                      <td>{itm.persondetails[0]?.mobile}</td>
                      <td>{itm?.loantype?.join(" ")}</td>
                      <td>{itm?.loanAmount}</td>
                      <td>
                        <div style={{ display: "flex", gap: "12px" }}>
                          <AiFillEdit
                            fontSize={22}
                            color="green"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleEdit(itm)}
                          />
                          <AiFillDelete
                            fontSize={22}
                            color="red"
                            onClick={() => handleDelete(itm)}
                            style={{ cursor: "pointer" }}
                          />
                          <GrView
                            fontSize={22}
                            color="skyblue"
                            onClick={() => handleView(itm)}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            {customers?.length === 0 && <p className="text-center mt-4">No Customer Found</p>}
          </Card>
        </Row>
      </Container>
    </>
  );
};

export default Index;
