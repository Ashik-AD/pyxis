import React from "react";
import "./App.scss";
import "./styles/Height.scss";
import "./styles/Width.scss";
import "./styles/Color.scss";
import { AxiosConfig } from "./config/default";
import AppRoutes from "./routes/Routes";

AxiosConfig();

const App: React.FC = () => {
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
};
export default App;
