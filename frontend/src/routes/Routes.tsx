import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../page/404/NotFound";
import Store from "../store/Store";
import Spinner from "../components/loading/Spinner";
import Navbar from "../components/nav/navbar";
import WithUser from "../with-user/with-user";
import Home from "../page/home/Home";
const SignUp = React.lazy(() => import("../page/signup/SignUp"));
const Login = React.lazy(() => import("../page/login/Login"));
const Landing = React.lazy(() => import("../page/landing/Landing"));
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/get-started/"
        element={
          <Suspense>
            <Landing />
          </Suspense>
        }
      />
      <Route
        path="/signup/*"
        element={
          <Suspense fallback={<Spinner />}>
            <SignUp />
          </Suspense>
        }
      />
      <Route
        path="/login/*"
        element={
          <Store>
            <Suspense fallback={<Spinner />}>
              <Login />
            </Suspense>
          </Store>
        }
      />

      <Route
        path="/*"
        element={
          <Store>
            <WithUser>
              <Navbar />
              <Home />
            </WithUser>
          </Store>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default AppRoutes;
