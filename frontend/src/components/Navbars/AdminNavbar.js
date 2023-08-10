import { Link, useLocation, useNavigate } from "react-router-dom";
// reactstrap components
import {  BsFillBellFill } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { toggleSearch } from "features/loan/loanSlice";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import pop from "../../assets/birthday.gif";
import bell from "../../assets/bell.gif";
import { AiOutlineLogout } from "react-icons/ai";

const AdminNavbar = (props) => {
  const intial = useSelector((st) => st.customer.customerdata);
  const nofictaion = useSelector((st) => st.customer.notification);
  const [reminder, setsetting] = useState([])
  const dispatch = useDispatch();
  const pathname = useLocation().pathname;
  const atviews = pathname.includes("edit")||pathname.includes("view")
  const [atview, setAtview] = useState(atviews)
  useEffect(()=>{
    setsetting(nofictaion)
  },[nofictaion])
  useEffect(()=>{
    setAtview(atviews)
  },[atviews])
  const navigate = useNavigate()
  const handleSearch = (e) => {
    const filt = intial.filter((item) => {
      return item.persondetails.some((person) =>
        person.mobile.includes(e.target.value)
      );
    });
    dispatch(toggleSearch(filt));
  };
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <>
    {!atview &&
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to=""
          >
            {props.brandText}
          </Link>
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Search"
                  type="number"
                  onChange={handleSearch}
                />
              </InputGroup>
            </FormGroup>
          </Form>
          <Box
            className="d-none d-md-block"
            sx={{ flexGrow: 0, marginRight: 2 }}
          >
            <Tooltip title="Reminder" sx={{ background: "white" }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <BsFillBellFill color="white" fontSize={25} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "35px", cursor: "pointer" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {reminder.map((e, i) => (
                <div
                  className="shadow bg-white"
                  key={i}
                  onClick={handleCloseUserMenu}
                >
                  <div
                    className="border-bottom px-2 d-flex align-items-center"
                    style={{ width: "260px" }}
                  >
                    {e.type==="birthday"&&<img src={pop} alt="" style={{ width: 60 }} />}
                    {e.type==="disburse"&&<img src={bell} alt="" style={{ width: 60 }}/>}
                    <p className="mb-0 mt-2 text-sm">{e.message}</p>
                  </div>
                </div>
              ))}
              {reminder.length===0&& <p>No Reminder for today</p>}
            </Menu>
          </Box>

          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              {/* <DropdownToggle className="pr-0" nav> */}
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={require("../../assets/img/theme/admin.png")}
                  />
                </span>

                <Media className="ml-2 d-none d-lg-block">
                  <span
                    style={{ color: "white" }}
                    className="mb-0 text-sm font-weight-bold "
                  >
                    {user?.name}
                  </span>
                </Media>
                <Media className="ml-2 d-none d-lg-block" onClick={()=>{
                  localStorage.removeItem("user")
                  navigate("/auth")
                }} style={{cursor:"pointer"}}>
                  <span
                    style={{ color: "white" }}
                    className="mb-0 text-sm font-weight-bold "
                  >
                    <AiOutlineLogout fontSize={25} color="red" />
                  </span>
                </Media>

              </Media>
              {/* </DropdownToggle> */}
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-calendar-grid-58" />
                  <span>Activity</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Support</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>}
    </>
  );
};

export default AdminNavbar;
