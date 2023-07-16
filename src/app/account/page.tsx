import { getSessionAndUser } from '~/utils/user';
import { Products } from './components/Products';

const Account = async () => {
    const { user } = await getSessionAndUser();
    return (
        <div>
            <h1>Account</h1>
            <p>Logged in as {user?.name}</p>
            <Products />
        </div>
    );
};

export default Account;
