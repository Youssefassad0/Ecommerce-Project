import { Outlet } from "react-router-dom";
import "./App.css";
import NavItems from "./components/NavItems";
import Footer from "./components/Footer";
import IndexHome from "./ChatSupport/Home/IndexHome";

function App() {
  return (
    <>
      <NavItems />
      <div className="">
        <Outlet />
        <IndexHome />
      </div>
      <Footer />
    </>
  );
}

export default App;
