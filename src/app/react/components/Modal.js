import React from 'react';

const Modal = ({ handleClose, handleCloseOnEsc = false, show, children, title = '' }) => {

    if (handleCloseOnEsc) {
        document.addEventListener('keyup', (e) => {
            if (e.keyCode === 27) handleClose();
        })
    }

    if (show) {
        return (
            <div className="ideas-modal ideas-flex-center">
                <div className="ideas-shade"></div>
                <div className="ideas-inner">
                    <div className="other-inner">

                        {children}

                        <div className="modal-header-ideas">
                            <h1 className="modal-title-ideas">{title}</h1>
                            <span className="modal-close-ideas" onClick={handleClose}>×</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return ('');
};

export default Modal;
