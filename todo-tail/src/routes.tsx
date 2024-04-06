import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import { Rituals } from "./components/Riruals.tsx";
import { Statistics } from "./components/Statistics.tsx";
import { About } from "./components/About.tsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { errorElement: <div>404 Not Found</div> },
      {
        children: [
          { index: true, element: <App /> },
          {
            path: "rituals",
            element: <Rituals />
          },
          { path: "statistics", element: <Statistics /> },
          { path: "about", element: <About /> }
        ]
      }
    ]
  }
]);
