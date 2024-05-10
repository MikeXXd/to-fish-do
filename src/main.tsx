import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { routes } from "./routes.tsx";
import { RitualsProvider } from "./components/Rituals/contexts/Ritual.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RitualsProvider>
      <RouterProvider router={routes} />
    </RitualsProvider>
  </StrictMode>
);
