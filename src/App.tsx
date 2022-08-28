import React from "react";
import { NavBar } from "./components/NavBar";

import "bootstrap/dist/css/bootstrap.min.css";
import { CardManage } from "./pages/Card/CardManage";

function App() {
  return (
    <div>
      <NavBar />
      <CardManage />
    </div>
  );
}

export default App;
