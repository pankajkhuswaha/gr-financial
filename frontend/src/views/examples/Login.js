import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
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
import { base_url } from "utils/baseUrl";

const Login = () => {
  const loginData = {
    email: "",
    password: "",
  };
  const [logins, setLogin] = useState(loginData);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${base_url}user/login`, logins);
      if (res.data.name !== undefined) {
        toast.success("Login Sucessfull");
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/admin");
        window.location.reload()
      } else {
        alert("sdfs");
        toast.error(res.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <p> Sign in with credentials</p>
            </div>
            <Form role="form" onSubmit={handleLogin}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    onChange={(e) =>
                      setLogin({ ...logins, email: e.target.value })
                    }
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    onChange={(e) =>
                      setLogin({ ...logins, password: e.target.value })
                    }
                    required
                  />
                </InputGroup>
              </FormGroup>

              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-1">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              {/* <small>Forgot password?</small> */}
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
