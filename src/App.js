import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./App.scss";
import { Footer } from "./components/footer/Footer";
import { Header } from "./components/header/Header";
import { ConfigRoutes } from "./config/ConfigRoutes";
import { ScrollToTop } from "./config/ScrollToTop";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <ConfigRoutes />
        <Footer />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
