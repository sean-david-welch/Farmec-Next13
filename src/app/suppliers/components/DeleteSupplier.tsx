'use client';

import axios from 'axios';
import utils from '~/styles/Utils.module.css';

import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface Props {
    SupplierId: string;
}

export const DeleteButton: React.FC<Props> = ({ SupplierId }) => {
    const router = useRouter();

    const onDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        try {
            const response = await axios.delete(`/api/suppliers/${SupplierId}`);
            if (response.status >= 200 && response.status < 300) {
                router.push('/suppliers');
                router.refresh();
            } else {
                alert(`Error: ${response.status}`);
            }
        } catch (error) {
            alert(`Network error: ${error}`);
        }
    };

    return (
        <button className={utils.btn} onClick={onDelete}>
            <FontAwesomeIcon icon={faTrash} />
        </button>
    );
};
