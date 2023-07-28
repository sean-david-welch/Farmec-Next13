import styles from '~/styles/Home.module.css';

import InfoSection from '~/components/server/Info';
import { Hero } from '~/components/server/Hero';
import Contact from '~/components/server/Contact';

const Home = () => {
    return (
        <section id={styles.home}>
            <Hero />
            <InfoSection />
            <Contact />
        </section>
    );
};

export default Home;
