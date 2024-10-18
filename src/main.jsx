import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { CourseProvider } from "./context/CourseContext";
import "./components/i18n"; // Ensure this path is correct

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <CourseProvider>
        <App />
      </CourseProvider>
    </ChakraProvider>
  </React.StrictMode>
);
