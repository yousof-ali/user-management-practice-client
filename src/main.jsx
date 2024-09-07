import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Users from "./Component/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>
  },
  {
    path:'/users',
    element:<Users></Users>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);