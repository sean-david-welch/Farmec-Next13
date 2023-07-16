import { Blog, Exhibition } from '@prisma/client';

const blogFormFields = [
    {
        name: 'title',
        label: 'Title',
        type: 'text',
        placeholder: 'Enter title',
    },
    {
        name: 'date',
        label: 'Date',
        type: 'text',
        placeholder: 'Enter date',
    },
    {
        name: 'main_image',
        label: 'Main Image',
        type: 'file',
        placeholder: 'Upload main image',
    },
    {
        name: 'subheading',
        label: 'Subheading',
        type: 'text',
        placeholder: 'Enter subheading',
    },
    {
        name: 'body',
        label: 'Body',
        type: 'text',
        placeholder: 'Enter body',
    },
];

const exhibitionFormFields = [
    {
        name: 'title',
        label: 'Title',
        type: 'text',
        placeholder: 'Enter title',
    },
    {
        name: 'date',
        label: 'Date',
        type: 'text',
        placeholder: 'Enter date',
    },
    {
        name: 'location',
        label: 'Location',
        type: 'text',
        placeholder: 'Enter location',
    },
    {
        name: 'info',
        label: 'Info',
        type: 'text',
        placeholder: 'Enter info',
    },
];

export const getFormFields = async (
    model: 'blog' | 'exhibition',
    modelInstance?: Blog | Exhibition | any
) => {
    const fieldMapping = {
        blog: blogFormFields,
        exhibition: exhibitionFormFields,
    };

    let fields = fieldMapping[model];

    if (modelInstance) {
        fields = fields.map(field => ({
            ...field,
            defaultValue: modelInstance[field.name],
        }));
    }

    return fields;
};
