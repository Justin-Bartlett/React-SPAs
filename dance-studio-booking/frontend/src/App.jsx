import { createBrowserRouter, RouterProvider } from "react-router-dom"

import ErrorPage from "./pages/ErrorPage"
import HomePage from "./pages/HomePage"
import Layout from "./pages/Layout"
import AdminPage from "./pages/AdminPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ":classId", element: <HomePage /> },
      { path: "booking/:classId", element: <HomePage /> },
      { path: "admin", element: <AdminPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
