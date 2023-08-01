import styles from '../styles/About.module.css';
import TimelineCard from './TimelineCard';

import { prisma } from '~/lib/prisma';
import { getSessionAndUser } from '~/utils/user';

export const Timeline = async () => {
    const timeline = await prisma.timeline.findMany({});
    const { user } = await getSessionAndUser();

    return (
        <section id="timeline">
            <div className={styles.timeline}>
                {timeline.map((event, index) => (
                    <TimelineCard
                        key={event.id}
                        event={event}
                        user={user}
                        direction={index % 2 === 0 ? 'left' : 'right'}
                    />
                ))}
            </div>
        </section>
    );
};
