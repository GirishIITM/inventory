import React, { useEffect, ReactNode } from 'react';
import '../styles/modal.css';
import CloseIcon from '@mui/icons-material/Close';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  elementRef: React.RefObject<HTMLDivElement>;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, children, elementRef }) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);


  return (
    <div className="modal-overlay" ref={elementRef} style={{ display: isOpen ? "block" : "none" }}>
      <CloseIcon onClick={onClose} className='close-icon' />
      {children}
    </div>
  );
};

export default CustomModal;
