
import Index from "views/Index.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.jsx";
import Upload from "views/examples/Upload";
import Firm from "views/examples/Firm";
import Company from "views/examples/Company";
import Assetsdetails from "views/examples/Assetsdetails";
import Next from "views/examples/Next";
import AddCustomerDetails from "views/examples/AddCustomerDetails";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: <Profile />,
  //   layout: "/admin",
  // },
  
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Add user",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
  {
    path: "/FirmRegister",
    name: "Add Firm",
    icon: "ni ni-circle-08 text-pink",
    component: <Firm />,
    layout: "/auth",
  },
  {
    path: "/CompanyRegister",
    name: "Add Company",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Company />,
    layout: "/auth",
  },
  {
    path: "/add-customer-detail",
    name: "Add Company",
    icon: "ni ni-bullet-list-67 text-red",
    component: <AddCustomerDetails />,
    layout: "/auth",
  },
  {
    path: "/NextStep",
    name: "Add Loan Details",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Next />,
    layout: "/auth",
  },
  {
    path: "/AssetsDetail",
    name: "Add Loan Details",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Assetsdetails />,
    layout: "/auth",
  },
  {
    path: "/Upload",
    name: "Add Loan Details",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Upload />,
    layout: "/auth",
  },
];
export default routes;
