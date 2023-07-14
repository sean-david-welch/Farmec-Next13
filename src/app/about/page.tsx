import utils from '~/styles/Utils.module.css';
import { AboutForm } from './components/CreateAbout';

const About = async () => {
    return (
        <section id="about">
            <h1 className={utils.sectionHeading}>Our Team</h1>
            <AboutForm modelName="employee" />
            <h1 className={utils.sectionHeading}>Our Story</h1>
            <AboutForm modelName="timeline" />
        </section>
    );
};

export default About;
