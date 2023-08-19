import React, { useEffect } from "react";
import {
  useLocation,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
import ViewPage from "views/examples/ViewPage";
import EditPage from "views/examples/EditPage";
import { toast } from "react-toastify";
import { verifyUserLogin } from "utils/api";
import { useDispatch } from "react-redux";
import { getallnotification } from "features/loan/loanSlice";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const verifyLogin = async () => {
    const user = JSON.parse(localStorage.getItem("user"))?.email;
    if (user) {
      try {
        const res = await verifyUserLogin();
        if (res.success) {
          return;
        } else {
          toast.info("Your login session is expired. Please Login again !");
          localStorage.removeItem("user");
          window.location.reload();
        }
      } catch (error) {
        navigate("/auth");
        toast.info("Your login session is expired. Please Login again !");
      }
    } else {
      navigate("/auth");
      toast.info("Your login session is expired. Please Login again !");
    }
  };

  useEffect(() => {
    verifyLogin();
    dispatch(getallnotification());
  }, []);

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/argon-react.png"),
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props?.location?.pathname)}
        />
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/admin/index" replace />} />
          <Route path="/view" element={<ViewPage />} />
          <Route path="/edit" element={<EditPage />} />
        </Routes>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
