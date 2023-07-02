'use client';
import styles from '../styles/Carousel.module.css';
import Image from 'next/image';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

export const Carousel = () => {
    const images = [
        '/sulkydx30.jpeg',
        '/sip1250.jpeg',
        '/mx.jpeg',
        '/sulkydx20.jpeg',
        '/mxloader.jpeg',
        '/sipout.jpeg',
    ];
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const variants = {
        initial: (direction: number) => {
            return {
                x: direction > 0 ? 1000 : -1000,
                opacity: 0,
            };
        },
        animate: {
            x: 0,
            opacity: 1,
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
            },
        },
        exit: (direction: number) => {
            return {
                x: direction > 0 ? -1000 : 1000,
                opacity: 0,
                transition: {
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 },
                },
            };
        },
    };

    function nextStep() {
        setDirection(1);
        if (index === images.length - 1) {
            setIndex(0);
            return;
        }
        setIndex(index + 1);
    }

    function prevStep() {
        setDirection(-1);
        if (index === 0) {
            setIndex(images.length - 1);
            return;
        }
        setIndex(index - 1);
    }

    return (
        <div className={styles.slideshow}>
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    variants={variants}
                    animate="animate"
                    initial="initial"
                    exit="exit"
                    key={images[index]}
                    custom={direction}>
                    <Image
                        src={images[index]}
                        alt="slides"
                        className={styles.slides}
                        width={500}
                        height={500}
                        priority={index === 0}
                    />
                </motion.div>
            </AnimatePresence>
            <button className={styles.prevButton} onClick={prevStep}>
                <FontAwesomeIcon icon={faChevronLeft} height={60} />
            </button>
            <button className={styles.nextButton} onClick={nextStep}>
                <FontAwesomeIcon icon={faChevronRight} height={60} />
            </button>
        </div>
    );
};
