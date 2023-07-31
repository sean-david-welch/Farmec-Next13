import { User } from '@prisma/client';

export const getUserFields = (user?: User) => {
    return [
        {
            name: 'username',
            label: 'Username',
            type: 'text',
            placeholder: 'Username',
            defaultValue: user?.username,
        },
        {
            name: 'password',
            label: 'Password',
            type: 'password',
            placeholder: 'Password',
        },
        {
            name: 'role',
            label: 'Role',
            type: 'select',
            options: ['ADMIN', 'USER', 'STAFF'],
            placeholder: 'Role',
            defaultValue: user?.role,
        },
    ];
};
