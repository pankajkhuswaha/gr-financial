import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Col } from "reactstrap";
import "./forgot.css";
import { forgotPasswordToken } from "utils/api";
import { useNavigate } from "react-router-dom";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const navigate =  useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPasswordToken({ email });
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Reset PassWord Link is sent to Our Email.");
        navigate("/auth/link-success")
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <ToastContainer />
      <Col lg="5" md="7">
        <div className="form-container">
          <div className="logo-container">Forgot Password</div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="form-submit-btn" type="submit">
              Send Email
            </button>
          </form>
        </div>
      </Col>
    </>
  );
};

export default Forgot;
