import styles from '../styles/About.module.css';
import utils from '~/styles/Utils.module.css';

import { prisma } from '~/lib/prisma';
import { UpdateAbout } from './UpdateAbout';
import { getSessionAndUser } from '~/utils/user';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

export const Timeline = async () => {
    const timeline = await prisma.timeline.findMany({});
    const { user } = await getSessionAndUser();

    return (
        <section id="timeline">
            <div className={styles.timeline}>
                {timeline.map(event => (
                    <div className={styles.timelineCard} key={event.id}>
                        <h1 className={utils.mainHeading}>{event.title}</h1>
                        <h1 className={utils.paragraph}>
                            <FontAwesomeIcon icon={faClock} size="sm" />-
                            {event.date}
                        </h1>
                        <p className={utils.paragraph}>{event.body}</p>
                        {user && user.role === 'ADMIN' && (
                            <UpdateAbout modelName="timeline" model={event} />
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};