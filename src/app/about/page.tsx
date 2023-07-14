import utils from '~/styles/Utils.module.css';
import { AboutForm } from './components/CreateAbout';
import { getSessionAndUser } from '~/utils/user';

const About = async () => {
    const { user } = await getSessionAndUser();

    return (
        <section id="about">
            <h1 className={utils.sectionHeading}>Our Team</h1>
            {user && user.role === 'ADMIN' && (
                <AboutForm modelName="employee" />
            )}
            <h1 className={utils.sectionHeading}>Our Story</h1>
            {user && user.role === 'ADMIN' && (
                <AboutForm modelName="timeline" />
            )}
        </section>
    );
};

export default About;
