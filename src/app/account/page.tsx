import styles from './styles/Account.module.css';
import utils from '~/styles/Utils.module.css';

import { getSessionAndUser } from '~/utils/user';
import { Products } from './components/Products';
import { Warranty } from './components/Warranty';

const Account = async () => {
    const { user } = await getSessionAndUser();
    return (
        <div>
            <h1 className={utils.sectionHeading}>Account</h1>
            <p className={utils.subHeading}>Logged in as {user?.name}</p>
            <Products />
            <Warranty />
        </div>
    );
};

export default Account;
