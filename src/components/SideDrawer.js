import { createPortal } from "react-dom";
import CSSTransition from "react-transition-group/CSSTransition";

import NavLinks from "./NavLinks";
import Backdrop from "./Backdrop";

const SideDrawerOverlay = ({ isShow, onClick }) => {
  return createPortal(
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={isShow}
      timeout={300}
      classNames="slide-in-left"
    >
      <aside className="side-drawer" onClick={onClick}>
        <NavLinks classes="nav-links-mobile" />
      </aside>
    </CSSTransition>,
    document.getElementById("side-drawer")
  );
};

const SideDrawer = ({ isShow, onClose }) => {
  return (
    <>
      <Backdrop isShow={isShow} onClick={onClose} />
      <SideDrawerOverlay isShow={isShow} onClick={onClose} />
    </>
  );
};

export default SideDrawer;
