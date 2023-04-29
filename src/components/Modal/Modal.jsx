import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { BsXLg } from 'react-icons/bs';
import { Backdrop, ModalContainer, Wrapper, Title, Button } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = class Modal extends Component {
    static propTypes = {
        title: PropTypes.string,
        onClose: PropTypes.func.isRequired,
        currentImageUrl: PropTypes.string,
        currentImageDescription: PropTypes.string,
    };

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleClickBackdrop = e => {
        if (e.target === e.currentTarget) {
        this.props.onClose();
        }
    };

    handleKeyDown = e => {
        if (e.code === 'Escape') {
        this.props.onClose();
        }
    };

    render() {
        const { title, onClose, currentImageUrl, currentImageDescription } =
        this.props;

        return createPortal(
            <Backdrop onClick={this.handleClickBackdrop}>
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
}
