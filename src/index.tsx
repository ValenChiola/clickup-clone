import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TrelloProvider } from "./context/TrelloContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <TrelloProvider>
    <App />
  </TrelloProvider>
);
