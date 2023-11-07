import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropsWithChildren, ReactNode } from 'react';

interface ModalProps {
  children: PropsWithChildren<ReactNode>;
  isOpen?: boolean;
  onClose: () => void;
}

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <button className="modal-close" onClick={onClose}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default Modal;
