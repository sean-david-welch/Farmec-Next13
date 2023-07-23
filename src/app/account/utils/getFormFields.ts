import { Carousel } from '@prisma/client';

export const getFormFields = (carousel?: Carousel) => [
    {
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Enter Name',
        defaultValue: carousel?.name,
    },
    {
        name: 'image',
        label: 'Image',
        type: 'file',
        placeholder: 'Select Image',
    },
];
