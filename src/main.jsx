import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Users from "./Component/Users";
import Edit from "./Component/Edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>
  },

  {
    path:'/users',
    element:<Users></Users>,
    loader: () => fetch('https://user-management-practice-server.onrender.com/users')
  },
  {
    path:'/edit/:id',
    element:<Edit></Edit>,
    loader:({params}) => fetch(`https://user-management-practice-server.onrender.com/user/${params.id}`)
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);