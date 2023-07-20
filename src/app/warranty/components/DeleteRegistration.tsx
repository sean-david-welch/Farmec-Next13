'use client';

import axios from 'axios';
import utils from '~/styles/Utils.module.css';

import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface Props {
    registrationId: string;
}

export const DeleteButton: React.FC<Props> = ({ registrationId }) => {
    const router = useRouter();

    const onDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        try {
            const response = await axios.delete(
                `/api/registration/${registrationId}`
            );
            if (response.status >= 200 && response.status < 300) {
                router.push('/account');
                router.refresh();
            }
        } catch (error) {
            console.error('Failed to delete warranty', error);
        }
    };

    return (
        <button className={utils.btnForm} onClick={onDelete}>
            <FontAwesomeIcon icon={faTrash} />
        </button>
    );
};
