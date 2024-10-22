import { Routes, Route } from "react-router-dom";
import NotFound from "../page/404/NotFound";
import Store from "../store/Store";
import Navbar from "../components/nav/navbar";
import WithUser from "../with-user/with-user";
import Home from "../page/home/Home";

const AppRoutes = () => {
  return (
    <Routes>
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
