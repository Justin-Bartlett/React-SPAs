import { createBrowserRouter, RouterProvider } from "react-router-dom"

import ErrorPage from "./pages/ErrorPage"
import HomePage from "./pages/HomePage"
import Layout from "./pages/Layout"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "booking/:classId", element: <HomePage /> },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
