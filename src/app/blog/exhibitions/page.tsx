import utils from '~/styles/Utils.module.css';
import styles from '../styles/Blog.module.css';

import { prisma } from '~/lib/prisma';
import { Exhibition } from '@prisma/client';
import { getSessionAndUser } from '~/utils/user';

import { BlogForm } from '../components/CreateBlog';
import { UpdateBlog } from '../components/UpdateBlog';

const Exhibitions = async () => {
    const { user } = await getSessionAndUser();
    const exhibitions: Exhibition[] = await prisma.exhibition.findMany();

    return (
        <section id="exhibitions">
            <h1 className={utils.sectionHeading}>Exhibitions:</h1>
            <h1 className={utils.subHeading}>
                Check out upcoming events related to Farmec
            </h1>
            <div className={styles.exhibitions}>
                {exhibitions.map(exhibition => (
                    <div className={styles.exhibition} key={exhibition.id}>
                        <h1 className={utils.mainHeading}>
                            {exhibition.title}
                        </h1>
                        <p className={utils.paragraph}>{exhibition.date}</p>
                        <p className={utils.paragraph}>{exhibition.location}</p>
                        <p className={utils.paragraph}>{exhibition.info}</p>
                        {user && user.role === 'ADMIN' && (
                            <UpdateBlog
                                model={exhibition}
                                modelName="exhibition"
                            />
                        )}
                    </div>
                ))}
            </div>
            {user && user.role === 'ADMIN' && (
                <BlogForm modelName="exhibition" />
            )}
        </section>
    );
};

export default Exhibitions;
