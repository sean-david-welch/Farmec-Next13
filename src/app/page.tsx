import styles from '~/styles/Home.module.css';
import { Carousel } from '~/components/client/Carousel';

const Home = () => {
    return (
        <section id={styles.home}>
            <Carousel />
        </section>
    );
};

export default Home;
