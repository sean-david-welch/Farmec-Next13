import { Hero } from '~/components/server/Hero';
import styles from '~/styles/Home.module.css';

const Home = () => {
    return (
        <section id={styles.home}>
            <Hero />
        </section>
    );
};

export default Home;
