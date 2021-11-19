import { useState } from "react";
import SideDrawer from "../UIs/SideDrawer";

import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <>
      <Header onOpenSidebar={() => setShowSideBar(true)} />
      <SideDrawer isShow={showSideBar} onClose={() => setShowSideBar(false)} />
      <main className="main-page container">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
