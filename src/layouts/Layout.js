import { useState } from "react";
import SideDrawer from "../components/SideDrawer";

import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <>
      <Header onOpenSidebar={() => setShowSideBar(true)} />
      <SideDrawer isShow={showSideBar} onClose={() => setShowSideBar(false)} />
      <main className="container">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
