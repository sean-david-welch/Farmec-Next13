import axios from 'axios';

import { Supplier, Video } from '@prisma/client';

export const getFormFields = (supplier?: Supplier) => [
    {
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Enter name',
        defaultValue: supplier?.name,
    },
    {
        name: 'logo_image',
        label: 'Logo Image',
        type: 'file',
        placeholder: 'Upload logo image',
    },
    {
        name: 'marketing_image',
        label: 'Marketing Image',
        type: 'file',
        placeholder: 'Upload marketing image',
    },
    {
        name: 'description',
        label: 'Description',
        type: 'text',
        placeholder: 'Enter description',
        defaultValue: supplier?.description,
    },
    {
        name: 'social_facebook',
        label: 'Facebook',
        type: 'text',
        placeholder: 'Enter Facebook URL',
        defaultValue: supplier?.social_facebook,
    },
    {
        name: 'social_instagram',
        label: 'Instagram',
        type: 'text',
        placeholder: 'Enter Instagram URL',
        defaultValue: supplier?.social_instagram,
    },
    {
        name: 'social_twitter',
        label: 'Twitter',
        type: 'text',
        placeholder: 'Enter Twitter URL',
        defaultValue: supplier?.social_twitter,
    },
    {
        name: 'social_linkedin',
        label: 'LinkedIn',
        type: 'text',
        placeholder: 'Enter LinkedIn URL',
        defaultValue: supplier?.social_linkedin,
    },
    {
        name: 'social_youtube',
        label: 'YouTube',
        type: 'text',
        placeholder: 'Enter YouTube URL',
        defaultValue: supplier?.social_youtube,
    },
    {
        name: 'social_website',
        label: 'Website',
        type: 'text',
        placeholder: 'Enter website URL',
        defaultValue: supplier?.social_website,
    },
];

export const getVideoFields = async (video?: Video) => {
    const suppliers = await axios
        .get<Supplier[]>('/api/suppliers')
        .then(res => res.data);

    const supplierOptions = suppliers.map(supplier => ({
        label: supplier.name,
        value: supplier.id,
    }));
    return [
        {
            name: 'supplier',
            label: 'Supplier',
            type: 'select',
            options: supplierOptions,
            placeholder: 'Select supplier',
            defaultValue: video?.supplierId,
        },
        {
            name: 'web_url',
            label: 'YouTube URL',
            type: 'text',
            placeholder: 'Enter YouTube URL',
        },
    ];
};
