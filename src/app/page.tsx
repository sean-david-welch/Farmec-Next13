import styles from '~/styles/Home.module.css';

import Contact from '~/components/server/Contact';
import Displays from '~/components/server/Displays';

import { Hero } from '~/components/server/Hero';

const Home = () => {
    return (
        <section id={styles.home}>
            <Hero />
            <Displays />
            <Contact />
        </section>
    );
};

export default Home;
