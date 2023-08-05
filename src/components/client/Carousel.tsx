'use client';
import styles from '../styles/Carousel.module.css';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

interface Props {
    children: React.ReactNode;
}

export const Carousel = ({ children }: Props) => {
    const images = React.Children.toArray(children);
    const [carouselState, setCarouselState] = useState({
        index: 0,
        direction: 0,
    });

    const variants = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: {
                opacity: { duration: 0.2 },
            },
        },
        exit: {
            opacity: 0,
            transition: {
                opacity: { duration: 0.2 },
            },
        },
    };

    function nextStep() {
        setCarouselState(prevState => {
            if (prevState.index === images.length - 1) {
                return { index: 0, direction: 1 };
            }
            return { index: prevState.index + 1, direction: 1 };
        });
    }

    function prevStep() {
        setCarouselState(prevState => {
            if (prevState.index === 0) {
                return { index: images.length - 1, direction: -1 };
            }
            return { index: prevState.index - 1, direction: -1 };
        });
    }

    return (
        <div className={styles.slideshow}>
            <AnimatePresence initial={false} custom={carouselState.direction}>
                <motion.div
                    variants={variants}
                    animate="animate"
                    initial="initial"
                    exit="exit"
                    key={carouselState.index}
                    className={styles.motionELement}
                    custom={carouselState.direction}>
                    {images[carouselState.index]}
                </motion.div>
            </AnimatePresence>
            <button
                className={styles.prevButton}
                onClick={prevStep}
                aria-label="Last Slide">
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
                className={styles.nextButton}
                onClick={nextStep}
                aria-label="Next Slide">
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    );
};
