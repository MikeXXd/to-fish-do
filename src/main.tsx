import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { routes } from "./routes.tsx";
import { RitualsProvider } from "./components/Rituals/contexts/Ritual.tsx";
import { TasksProvider } from "./components/Tasks/contexts/Task.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RitualsProvider>
      <TasksProvider>
        <RouterProvider router={routes} />
      </TasksProvider>
    </RitualsProvider>
  </StrictMode>
);
