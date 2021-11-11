import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

const Backdrop = ({ isShow, onClick }) => {
  return createPortal(
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={isShow}
      timeout={300}
      classNames="fade"
    >
      <div className="backdrop" onClick={onClick}></div>
    </CSSTransition>,
    document.getElementById("backdrop")
  );
};

export default Backdrop;
