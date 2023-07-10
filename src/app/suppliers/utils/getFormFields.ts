import { Supplier } from '@prisma/client';

export const getFormFields = (suppler?: Supplier) => [
    {
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Enter name',
        defaultValue: suppler?.name,
    },
    {
        name: 'logo_image',
        label: 'Logo Image',
        type: 'file',
        placeholder: 'Upload logo image',
        defaultValue: suppler?.logo_image,
    },
    {
        name: 'marketing_image',
        label: 'Marketing Image',
        type: 'file',
        placeholder: 'Upload marketing image',
        defaultValue: suppler?.marketing_image,
    },
    {
        name: 'description',
        label: 'Description',
        type: 'text',
        placeholder: 'Enter description',
        defaultValue: suppler?.description,
    },
    {
        name: 'social_facebook',
        label: 'Facebook',
        type: 'text',
        placeholder: 'Enter Facebook URL',
        defaultValue: suppler?.social_facebook,
    },
    {
        name: 'social_instagram',
        label: 'Instagram',
        type: 'text',
        placeholder: 'Enter Instagram URL',
        defaultValue: suppler?.social_instagram,
    },
    {
        name: 'social_twitter',
        label: 'Twitter',
        type: 'text',
        placeholder: 'Enter Twitter URL',
        defaultValue: suppler?.social_twitter,
    },
    {
        name: 'social_linkedin',
        label: 'LinkedIn',
        type: 'text',
        placeholder: 'Enter LinkedIn URL',
        defaultValue: suppler?.social_linkedin,
    },
    {
        name: 'social_youtube',
        label: 'YouTube',
        type: 'text',
        placeholder: 'Enter YouTube URL',
        defaultValue: suppler?.social_youtube,
    },
    {
        name: 'social_website',
        label: 'Website',
        type: 'text',
        placeholder: 'Enter website URL',
        defaultValue: suppler?.social_website,
    },
];
