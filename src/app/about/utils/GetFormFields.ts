import { Employee, Timeline, Terms, Privacy } from '@prisma/client';

const employeeFormFields = [
    {
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Enter name',
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter email',
    },
    {
        name: 'phone',
        label: 'Phone',
        type: 'text',
        placeholder: 'Enter phone',
    },
    {
        name: 'role',
        label: 'Role',
        type: 'text',
        placeholder: 'Enter role',
    },
    {
        name: 'bio',
        label: 'Bio',
        type: 'text',
        placeholder: 'Enter bio',
    },
    {
        name: 'profile_image',
        label: 'Profile Image',
        type: 'file',
        placeholder: 'Upload profile image',
    },
];

const timelineFormFields = [
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
        name: 'body',
        label: 'Body',
        type: 'text',
        placeholder: 'Enter body',
    },
];

const termsFormFields = [
    {
        name: 'title',
        label: 'Title',
        type: 'text',
        placeholder: 'Enter title',
    },
    {
        name: 'body',
        label: 'Body',
        type: 'text',
        placeholder: 'Enter body',
    },
];

const privacyFormFields = [
    {
        name: 'title',
        label: 'Title',
        type: 'text',
        placeholder: 'Enter title',
    },
    {
        name: 'body',
        label: 'Body',
        type: 'text',
        placeholder: 'Enter body',
    },
];

export const getFormFields = async (
    modelName: 'employee' | 'timeline' | 'terms' | 'privacy',
    modelInstance?: Employee | Timeline | Terms | Privacy | any
) => {
    const fieldMapping = {
        employee: employeeFormFields,
        timeline: timelineFormFields,
        terms: termsFormFields,
        privacy: privacyFormFields,
    };

    let fields = fieldMapping[modelName];

    if (modelInstance) {
        fields = fields.map(field => ({
            ...field,
            defaultValue: modelInstance[field.name],
        }));
    }

    return fields;
};
