'use client';

import axios from 'axios';
import utils from '~/styles/Utils.module.css';

import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface Props {
    modelId: string;
    route: string;
    endpoint: string;
    modelName?:
        | 'employee'
        | 'timeline'
        | 'terms'
        | 'privacy'
        | 'blog'
        | 'exhibition';
}

export const DeleteButton: React.FC<Props> = ({
    modelId,
    route,
    endpoint,
    modelName,
}) => {
    const router = useRouter();

    const onDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        let response;
        try {
            if (modelName) {
                response = await axios.delete(`/api/${route}/${modelId}`, {
                    data: { model: modelName, id: modelId },
                });
            } else {
                response = await axios.delete(`/api/${route}/${modelId}`);
            }

            if (response.status >= 200 && response.status < 300) {
                router.push(`/${endpoint}`);
                router.refresh();
            }
        } catch (error) {
            console.error(`Failed to delete model`, error);
        }
    };

    return (
        <button className={utils.btnForm} onClick={onDelete}>
            <FontAwesomeIcon icon={faTrash} />
        </button>
    );
};
