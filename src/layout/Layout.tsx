import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import SubHeader from "../components/SubHeader/SubHeader";
import "./layout.css";

function Layout() {
  return (
    <>
      <div className="App">
        <div className="header-container">
          <Header />
        </div>
        <div className="sub-header-container">
          <SubHeader />
        </div>
        <main>
          <div className="page-container dynamicContentBlock">
            <Outlet />
          </div>
        </main>
        <div className="footer-container dynamicContent">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Layout;
