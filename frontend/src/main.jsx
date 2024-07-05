import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import "./index.css";
import axios from "axios";

axios.defaults.baseURL = "https://book-store-lkqe.onrender.com/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SnackbarProvider maxSnack={4}>
      <App />
    </SnackbarProvider>
  </BrowserRouter>
);
