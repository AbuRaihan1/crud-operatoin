import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Products from "./Products";
import Home from "./Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "products",
      element: <Products />,
      // loader: () => fetch("http://localhost:5000/users"),
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
