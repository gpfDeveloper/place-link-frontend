import Modal from "./Modal";

const ErrorModal = ({ error, onClear, headerMsg }) => (
  <Modal
    className="modal--small"
    isShow={!!error}
    header={headerMsg || "An Error Occured."}
    actions={
      <button className="btn btn--blue" onClick={onClear}>
        OK
      </button>
    }
  >
    <h4 className="center">{error}</h4>
  </Modal>
);

export default ErrorModal;
