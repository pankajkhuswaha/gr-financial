import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Col } from 'reactstrap';
import "./forgot.css";
import check from "../../assets/check.png";


const LinkSucess = () => {
  return (
    <>
      <ToastContainer />
      <Col lg="5" md="7">
        <div className="form-container w-full">
          <div className="logo-container">Mail Sent</div>
            <div className="d-flex align-items-center justify-content-center flex-wrap">
                <img src={check} alt="" className='w-50' />
                <p className='text-center mx-4'>A email was sent to your email id containing a url to change your password</p>
            </div>
        </div>
      </Col>
    </>
  );
}

export default LinkSucess;
