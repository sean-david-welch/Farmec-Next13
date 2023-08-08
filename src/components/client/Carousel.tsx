'use client';

import styles from '../styles/Carousel.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { CldImage } from 'next-cloudinary';

interface Props {
    images: string[];
}

export const Carousel = ({ images }: Props) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    function nextStep() {
        setCurrentIndex(prevIndex => {
            if (prevIndex === images.length - 1) {
                return 0;
            }
            return prevIndex + 1;
        });
    }

    function prevStep() {
        setCurrentIndex(prevIndex => {
            if (prevIndex === 0) {
                return images.length - 1;
            }
            return prevIndex - 1;
        });
    }

    return (
        <div className={styles.slideshow}>
            {images.map((src, index) => (
                <CldImage
                    key={index}
                    src={src}
                    alt="slides"
                    format="webp"
                    className={`${styles.slides} ${
                        currentIndex === index ? styles.fadeIn : styles.fadeOut
                    }`}
                    quality={100}
                    width={1400}
                    height={1400}
                />
            ))}
            <button className={styles.prevButton} onClick={prevStep}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button className={styles.nextButton} onClick={nextStep}>
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    );
};
