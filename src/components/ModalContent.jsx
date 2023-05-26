import PropTypes from 'prop-types';

ModalContent.propTypes = {
  message: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  onYes: PropTypes.func.isRequired,
};
function ModalContent({ message, onClose, onYes }) {
  return (
    <>
      <div className="panel"></div>
      <div className="modal">
        <div>{message}</div>
        <br />
        <button onClick={onYes}>Yes</button>
        <button onClick={onClose}>No</button>
      </div>
    </>
  );
}

export { ModalContent }