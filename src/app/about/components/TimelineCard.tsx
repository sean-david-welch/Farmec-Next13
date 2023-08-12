'use client';

import styles from '../styles/About.module.css';
import utils from '~/styles/Utils.module.css';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimation, motion } from 'framer-motion';

import { User } from '@prisma/client';
import { UpdateAbout } from './UpdateAbout';

import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    event: any;
    user: User | null | undefined;
    direction: string;
}

const TimelineCard: React.FC<Props> = ({ event, user }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) controls.start('visible');
    }, [controls, inView]);

    const timelineVariant = {
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5 },
        },
        hidden: { opacity: 0, scale: 0 },
    };

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
