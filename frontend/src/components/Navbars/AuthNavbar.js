
import React from "react";
import { Link, useLocation } from "react-router-dom";
import './index.css'
// reactstrap components
import {
  Button,
  Navbar,
} from "reactstrap";

const AdminNavbar = () => {
  const atLogin = useLocation().pathname.includes('auth')
  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">     
        <div className="logodiv">
          <h1 className="logo" >G.R Financial Services</h1>
          <Link to={"/admin/index"}>{!atLogin && <Button>Back</Button>}</Link>
        </div>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
