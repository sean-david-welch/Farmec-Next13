import styles from '../styles/Suppliers.module.css';
import utils from '~/styles/Utils.module.css';

import { CreateVideo } from './CreateVideo';
import { UpdateVideo } from './UpdateVideo';

import { prisma } from '~/lib/prisma';
import { Video, Supplier } from '@prisma/client';
import { getSessionAndUser } from '~/utils/user';

interface Props {
    supplier: Supplier;
}

const Videos = async ({ supplier }: Props) => {
    const { id } = supplier;

    const { user } = await getSessionAndUser();
    const videos: Video[] = await prisma.video.findMany({
        where: {
            supplierId: id,
        },
    });

    if (!videos) {
        return <div>loading...</div>;
    }

    return (
        <section id="videos">
            <h1 className={utils.sectionHeading}>Videos</h1>
            {user && user.role === 'ADMIN' && <CreateVideo />}

            <div className={styles.videoGrid}>
                {videos.map(video => (
                    <div
                        className={styles.videoCard}
                        key={video.id}
                        id={video.title || ''}>
                        <h1 className={utils.mainHeading}>{video.title}</h1>
                        <iframe
                            width="425"
                            height="315"
                            className={styles.video}
                            src={`https://www.youtube.com/embed/${video.video_id}`}
                            allowFullScreen
                        />
                        {user && user.role === 'ADMIN' && (
                            <UpdateVideo video={video} />
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Videos;
