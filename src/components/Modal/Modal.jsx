import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BsXLg } from 'react-icons/bs';
import { Backdrop, ModalContainer, Wrapper, Title, Button } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = function Modal({
    title,
    onClose,
    currentImageUrl,
    currentImageDescription,
  }) {
    useEffect(() => {
      const handleKeyDown = e => e.code === 'Escape' && onClose();
  
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [onClose]);
    const handleClickBackdrop = e => e.target === e.currentTarget && onClose();
        
    return createPortal(
        <Backdrop onClick={handleClickBackdrop}>
            <ModalContainer>
            <Wrapper>
                {title && <Title>{title}</Title>}
                <Button type="button" onClick={onClose}>
                <BsXLg /* className={css.icon} */ />
                </Button>
            </Wrapper>
            <img
                src={currentImageUrl}
                alt={currentImageDescription}
                loading="lazy"
            />
            </ModalContainer>
        </Backdrop>,
        modalRoot
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    currentImageUrl: PropTypes.string,
    currentImageDescription: PropTypes.string,
  };