import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../app/globals.css";
import PortfolioClient from "../app/portfolio-client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PortfolioClient />
  </StrictMode>,
);
