import React from "react";
import "./App.css";
import "./styles/Height.css";
import "./styles/Width.css";
import "./styles/Color.css";
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
