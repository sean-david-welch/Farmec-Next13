import styles from '../styles/Account.module.css';
import utils from '~/styles/Utils.module.css';

interface Props {
    children: React.ReactNode;
}

const UserServices = ({ children }: Props) => {
    return (
        <>
            <h1 className={utils.sectionHeading}>User Services:</h1>
            {children}
        </>
    );
};

export default UserServices;
