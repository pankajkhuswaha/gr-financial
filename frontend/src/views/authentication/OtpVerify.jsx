import { ToastContainer, toast } from "react-toastify";
import { Col } from "reactstrap";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./forgot.css";
import { CheckResetPasswordUser } from "utils/api";
import { resetUserPassword } from "utils/api";

const OtpVerify = () => {
  const [password, setPassword] = useState("");
  const [confirm, setconfirm] = useState("");
  const [message, setmessage] = useState("");
  const [email, setemail] = useState("");
  const token = useLocation().pathname.split("/")[2];
  const navigate = useNavigate()
  const checkUser = async () => {
    try {
      const res = await CheckResetPasswordUser({ token });
      if(res.error){
        toast.error(res.error)
        navigate("/login")
      }else{
        setemail(res)
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirm) {
      console.log(password);
      try {
        const res = await resetUserPassword({token,password})
        if(res.error){
            toast.error(res.error)
          }else{
            toast.success(res)
            navigate("/login")
          }
      } catch (error) {
        toast.error(error.message)
      }
      setmessage("");
    } else {
      setmessage("Password and Confirm Password Must be Same !");
    }
  };
  useEffect(()=>{
    checkUser()
  },[])
  return (
    <>
      <ToastContainer />
      <Col lg="5" md="7">
        <div className="form-container">
          <div className="logo-container">Reset Password</div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label >Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                readOnly
              />
            </div>
            <div className="form-group">
              <label >Enter your password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label >Confirm password</label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setconfirm(e.target.value)}
                required
              />
            </div>
            <div className="d-flex align-items-center">
                {message && (
                  <p className="text-danger text-sm">{message}</p>
                )}
              </div>
            <button className="form-submit-btn" type="submit">
              Reset PassWord
            </button>
          </form>
        </div>
      </Col>
    </>
  );
};

export default OtpVerify;
