import styles from '../styles/About.module.css';
import utils from '~/styles/Utils.module.css';

import { prisma } from '~/lib/prisma';

export const Timeline = async () => {
    const timeline = await prisma.timeline.findMany({});

    return (
        <div className={styles.timeline}>
            {timeline.map(event => (
                <div key={event.id}>
                    <h2>
                        {event.title} - {event.date}
                    </h2>
                    <p>{event.body}</p>
                </div>
            ))}
        </div>
    );
};
