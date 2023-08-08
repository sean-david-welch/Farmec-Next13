import styles from '~/styles/Utils.module.css';

import Contact from '~/components/server/Contact';
import Displays from '~/components/server/Displays';

import { Hero } from '~/components/server/Hero';

const Home = () => {
    return (
        <section id="Home">
            <div className={styles.home}>
                <Hero />
                <Displays />
                <Contact />
            </div>
        </section>
    );
};

export default Home;
