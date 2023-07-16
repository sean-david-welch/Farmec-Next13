import styles from '../styles/About.module.css';
import utils from '~/styles/Utils.module.css';

import { prisma } from '~/lib/prisma';
import { getSessionAndUser } from '~/utils/user';
import { AboutForm } from '../components/CreateAbout';
import { UpdateAbout } from '../components/UpdateAbout';

const Policies = async () => {
    const terms = await prisma.terms.findMany();
    const privacy = await prisma.privacy.findMany();
    const { user } = await getSessionAndUser();

    return (
        <section id="policies">
            <div className={styles.terms}>
                <h1 className={utils.sectionHeading}>Terms of Service</h1>
                {terms.map(term => (
                    <div className={styles.infoCard} key={term.id}>
                        <h2 className={utils.mainHeading}>{term.title}</h2>
                        <p className={utils.paragraph}>{term.body}</p>
                        {user && user.role === 'ADMIN' && (
                            <UpdateAbout modelName="terms" model={term} />
                        )}
                    </div>
                ))}

                {user && user.role === 'ADMIN' && (
                    <AboutForm modelName="terms" />
                )}
            </div>

            <div className={styles.privacy}>
                <h1 className={utils.sectionHeading}>Privacy Policy</h1>
                {privacy.map(policy => (
                    <div className={styles.infoCard} key={policy.id}>
                        <h2 className={utils.mainHeading}>{policy.title}</h2>
                        <p className={utils.paragraph}>{policy.body}</p>
                        {user && user.role === 'ADMIN' && (
                            <UpdateAbout modelName="privacy" model={policy} />
                        )}
                    </div>
                ))}

                {user && user.role === 'ADMIN' && (
                    <AboutForm modelName="privacy" />
                )}
            </div>
        </section>
    );
};

export default Policies;
