import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";

const ModalOverlay = (props) => {
  const content = (
    <div className={`modal ${props.className}`}>
      <header className={`modal__header`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content`}>
          {props.children}
        </div>
        <footer className={'modal__actions'}>
          {props.actions}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal"));
};

const Modal = (props) => {
  return (
    <>
      <Backdrop isShow={props.isShow} onClick={props.onCancel} />
      <CSSTransition
        in={props.isShow}
        mountOnEnter
        unmountOnExit
        timeout={300}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;
