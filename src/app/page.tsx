import styles from '~/styles/Home.module.css';

import InfoSection from '~/components/server/Info';
import { Hero } from '~/components/server/Hero';

const Home = () => {
    return (
        <section id={styles.home}>
            <Hero />
            <InfoSection />
        </section>
    );
};

export default Home;
