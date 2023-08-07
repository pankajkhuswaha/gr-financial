import { Link } from "react-router-dom";
// reactstrap components
import { BsFillBellFill } from "react-icons/bs";
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

const AdminNavbar = (props) => {
  const intial = useSelector((st) => st.customer.customerdata);
  const dispatch = useDispatch()
  const handleSearch = (e) => {
    const filt = intial.filter((item) => {
      return item.persondetails.some((person) => person.mobile.includes(e.target.value));
    });
    dispatch(toggleSearch(filt));
  };

  return (
    <>
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
                <Input placeholder="Search" type="number" onChange={handleSearch}/>
              </InputGroup>
            </FormGroup>
          </Form>
          <div className="d-none d-md-block" style={{ margin: "10px" }}>
            <BsFillBellFill color="white" fontSize={25} />
          </div>

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
                    Admin
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
      </Navbar>
    </>
  );
};

export default AdminNavbar;
