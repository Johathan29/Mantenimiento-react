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
const userLogin=localStorage.getItem('user')
export const 
routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "our_collaborators", element: <Child /> },
      { path: "our_collaborators/:id", element: <DetailChild /> },
      { path: "products", element: <ProductComponent /> },
      { path: "products/:id", element: <DetailProduct /> },
      { path: "inbox", element: <MessagePage /> },
      { path: "inbox/:id", element: <MessageDetailPage /> },
      { path: "contact_page", element: <ContactPage /> },
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
      { path: "edituser", element: <EditUser /> },
      { path: "products", element: <ProductsDashboard /> },
    ]
 }
];
