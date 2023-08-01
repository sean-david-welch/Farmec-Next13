'use client';

import styles from '../styles/About.module.css';
import utils from '~/styles/Utils.module.css';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimation, motion } from 'framer-motion';

import { UpdateAbout } from './UpdateAbout';

import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '@prisma/client';

interface Props {
    event: any;
    user: User | null | undefined;
    direction: string;
}

const TimelineCard: React.FC<Props> = ({ event, user, direction }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView();
    const timelineVariant = {
        visible: {
            x: direction === 'left' ? -200 : 200,
            transition: { duration: 0.4 },
        },
        hidden: { x: direction === 'left' ? -1100 : 1100 },
    };

    useEffect(() => {
        if (inView) controls.start('visible');
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={timelineVariant}
            className={styles.timelineCard}
            key={event.id}>
            <h1 className={utils.mainHeading}>{event.title}</h1>
            <h1 className={utils.paragraph}>
                <FontAwesomeIcon icon={faClock} className={styles.clockIcon} />-
                {event.date}
            </h1>
            <p className={utils.paragraph}>{event.body}</p>
            {user && user.role === 'ADMIN' && (
                <UpdateAbout modelName="timeline" model={event} />
            )}
        </motion.div>
    );
};

export default TimelineCard;
