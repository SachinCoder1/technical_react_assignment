import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import Landing from "./pages/landing/Landing";
import LoginPage from "./pages/auth/Login";
import PrivateRoute from "./layout/PrivateRoute";
import ResourceListPage from "./pages/resources/Resource";
import ResourceDetailPage from "./pages/resources/PerticularResource";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Landing />, // Default public landing page
      },
      {
        path: "/login",
        element: <LoginPage />, // Public login route
      },
      {
        path: "/person",
        element: (
          <PrivateRoute>
            <ResourceListPage /> {/* Protected landing page */}
          </PrivateRoute>
        ),
      },
      {
        path: "/person/:id", // :id is the dynamic parameter
        element: (
          <PrivateRoute>
            <ResourceDetailPage />
          </PrivateRoute>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 1000 * 60 * 15,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
