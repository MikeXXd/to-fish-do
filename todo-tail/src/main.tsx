import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TasksProvider } from "./contexts/Task.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TasksProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TasksProvider>
);
