import styles from '~/styles/Utils.module.css';

import Spinner from '~/components/client/Spinner';

const Loading = () => {
    return (
        <div className={styles.home}>
            <Spinner />
        </div>
    );
};

export default Loading;
