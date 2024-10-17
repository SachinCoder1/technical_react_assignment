import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import "./App.scss";
import Navbar from "./components/navbar";

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      {/* Navbar will be present across all routes */}
      <Navbar />
      
      {/* The Outlet will render child routes */}
      <Outlet />
    </MantineProvider>
  );
}
