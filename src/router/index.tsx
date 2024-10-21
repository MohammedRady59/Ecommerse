import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../pages/Home";
import Proudcts from "../pages/Proudcts";
import Product from "../pages/Product";
import Login from "../pages/Login";
import CookiesServise from "../service/CookiesServise";
import ProtectedRoute from "../Auth/ProtectedRoute";
import DashLayout from "../Dashboard/DashLayout";
import HomeDash from "../Dashboard/pages/HomeDash";
import ProudctsDash from "../Dashboard/pages/ProudctsDash";

const isAllow = CookiesServise.get("jwt");
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="/products" element={<Proudcts />}></Route>
        <Route path={`/productDetails/:id`} element={<Product />}></Route>
      </Route>

      {/* 2 */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAllow={isAllow} path="/">
            <DashLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<HomeDash />}></Route>
        <Route path="/dashboard/proudcts" element={<ProudctsDash />}></Route>
      </Route>

      {/* 3 */}

      <Route
        path="/login"
        element={
          <ProtectedRoute path="/" isAllow={!isAllow}>
            <Login />
          </ProtectedRoute>
        }
      ></Route>
    </Route>
  )
);
export default router;

/* import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../pages/Home";
import About from "../pages/About";
import Proudcts from "../pages/Proudcts";
import Product from "../pages/Product";
import Login from "../pages/Login";
import CookiesServise from "../service/CookiesServise";
import ProtectedRoute from "../Auth/ProtectedRoute";

const isAllow = CookiesServise.get("jwt");
console.log(isAllow);
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <ProtectedRoute path="/login" isAllow={isAllow}>
              <Home />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/about"
          element={
            <ProtectedRoute path="/login" isAllow={isAllow}>
              <About />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/products"
          element={
            <ProtectedRoute path="/login" isAllow={isAllow}>
              <Proudcts />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path={`/productDetails/:id`}
          element={
            <ProtectedRoute path="/login" isAllow={isAllow}>
              <Product />
            </ProtectedRoute>
          }
        ></Route>
      </Route>

      <Route
        path="/login"
        element={
          <ProtectedRoute path="/" isAllow={!isAllow}>
            <Login />
          </ProtectedRoute>
        }
      ></Route>
    </Route>
  )
);
export default router; */
