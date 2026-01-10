import Layout from "../Views/Layout.jsx";
import Layoutdashboard from "../Views/LayoutDashBoard.jsx";

// Páginas públicas
import HomePage from "../Views/Home.jsx";
import ContactPage from "../Views/Contact.jsx";
import NoPage from "../Views/NoPage.jsx";

// Colaboradores
import Child from "../Views/Child.jsx";
import DetailChild from "../Views/DetailChild.jsx";

// Productos
import ProductComponent from "../Views/Product.jsx";
import DetailProduct from "../Views/DetailProduct.jsx";

// Mensajería
import MessagePage from "../Views/MessagePage.jsx";
import MessageDetailPage from "../Views/MessageDetailPage.jsx";

// Dashboard
import Homedashboard from "../Views/HomeDashboard.jsx";
import EditUser from "../Views/EditUser.jsx";
import ProductsDashboard from "../Views/ProductsDashboard.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Login from "../Components/FormLogin.jsx";
import Register from "../Components/Register.jsx";
import Carts from "../Views/Carts.jsx";
import AdminRolesPanel from "../Views/gestionUser.jsx";
import About from "../Views/About.jsx";
import FormUpdateUsers from "../Views/FormUpdateUser.jsx";
import { element } from "prop-types";
import Checkout from "../Views/Checkout.jsx";
const userLogin=localStorage.getItem('user')
export const 
 
routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      {path:"checkout", element:<Checkout></Checkout>},
      { path: "our-collaborators", element: <Child /> },
      { path: "our-collaborators/:id", element: <DetailChild /> },
      { path: "products", element: <ProductComponent /> },
      { path: "carts", element: <Carts /> },
      { path: "products/:id", element: <DetailProduct /> },
      { path: "inbox", element: <MessagePage /> },
      { path: "inbox/:id", element: <MessageDetailPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "login", element: <Login/> },
      { path:"/register", element:<Register />},
      { path:"/about", element:<About />},
      { path:"/form-update-user", element:<FormUpdateUsers />},
      { path: "*", element: <NoPage /> },
    ],
  },
  {
    path: "/dashboard",
    element:  <ProtectedRoute>
        <Layoutdashboard />
      </ProtectedRoute>,
    children: [
      { index: true, element:  <Homedashboard />  },
      
    ]
 },
 { path: "edituser", element:  <ProtectedRoute>
        <Layoutdashboard />
      </ProtectedRoute>, children:[ { element: <EditUser />}] },
      { path: "dashboard-products", element:  <ProtectedRoute>
        <Layoutdashboard />
      </ProtectedRoute>, children:[ { index:true, element:  <ProductsDashboard />}] },
       { path: "users", element: <AdminRolesPanel /> },
];
