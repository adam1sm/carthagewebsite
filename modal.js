const modalRoot = document.getElementById('modal-root');
const modalContainer = document.createElement('div');
modalRoot.appendChild(modalContainer);

window.showWaitlistModal = () => {
  ReactDOM.render(
    React.createElement(WaitlistModal, { 
      isOpen: true,
      onClose: () => {
        ReactDOM.render(null, modalContainer);
      }
    }),
    modalContainer
  );
};