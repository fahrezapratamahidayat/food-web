import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import FoodOrderingApp from "./FoodOrdering";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <FoodOrderingApp />
    </StrictMode>
);
