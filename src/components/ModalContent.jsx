import PropTypes from 'prop-types';

ModalContent.propTypes = {
  onClose: PropTypes.func.isRequired,
  onYes: PropTypes.func.isRequired,
};
function ModalContent({ onClose, onYes }) {
  return (
    <>
      <div className="panel"></div>
      <div className="modal">
        <div>Are you sure you want to delete this post?</div>
        <br />
        <button onClick={onYes}>Yes</button>
        <button onClick={onClose}>No</button>
      </div>
    </>
  );
}

export { ModalContent }