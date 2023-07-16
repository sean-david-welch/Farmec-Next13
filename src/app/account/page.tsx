import { getSessionAndUser } from '~/utils/user';

const Account = async () => {
    const { user } = await getSessionAndUser();
    return (
        <div>
            <h1>Account</h1>
            <p>Logged in as {user?.name}</p>
        </div>
    );
};

export default Account;
