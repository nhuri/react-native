import React, { lazy, Suspense, useContext } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import Nav from "./components/section/Nav";
import Home from "./pages/Home/Home";
import Spinner from "./components/Spinner";
import Error from "./components/Error";
const About = lazy(() => import("./pages/About/About"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const Products = lazy(() => import("./pages/product/Products"));
const ProductPage = lazy(() => import("./pages/product/ProductPage"));
import Login from "./pages/PublicRoutes/Login";
import { AuthContext } from "./contexts/AuthContext";

// Layout - plan of the website
function Root({ isAuth }) {
  return (
    <>
     {isAuth && <Nav />} 
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
    </>
  );
}

function App() {

  const { isAuth } = useContext(AuthContext);
  // Index - the path of the parent
  // Router
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<Root isAuth={isAuth} />}
        errorElement={<div>Error in Root Component</div>}
      >
        <Route index element={<Login />} />

        {/* Routes  - path , element*/}
        {/* Private Routes */}
        <Route element={isAuth ? <Outlet /> : <Navigate to={"/"} />}>
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} errorElement={<Error />} />
          <Route path="contact" element={<Contact />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductPage />} />
        </Route>

        {/* Nested Route */}
        {/* <Route path="/dashboard">
              <Route path="products" element={<Products />} />
              <Route path="users" element={<div>Users</div>} />
              <Route path="orders" element={<div>Orders</div>} />

           </Route> */}
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
