'use client';
import utils from '~/styles/Utils.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const ToTopButton: React.FC = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            id="toTopButton"
            aria-label="scroll-to-top-button"
            className={utils.toTopButton}
            onClick={scrollToTop}>
            <FontAwesomeIcon icon={faArrowUp} />
        </button>
    );
};

export default ToTopButton;
