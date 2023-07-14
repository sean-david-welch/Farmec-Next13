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
    {
        name: 'created',
        label: 'Created Date',
        type: 'date',
        placeholder: 'Select date',
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
        type: 'date',
        placeholder: 'Enter date',
    },
    {
        name: 'body',
        label: 'Body',
        type: 'textarea',
        placeholder: 'Enter body',
    },
    {
        name: 'created',
        label: 'Created Date',
        type: 'date',
        placeholder: 'Select date',
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
        type: 'textarea',
        placeholder: 'Enter body',
    },
    {
        name: 'created',
        label: 'Created Date',
        type: 'date',
        placeholder: 'Select date',
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
        type: 'textarea',
        placeholder: 'Enter body',
    },
    {
        name: 'created',
        label: 'Created Date',
        type: 'date',
        placeholder: 'Select date',
    },
];

export const getFormFields = async (
    modelName: 'employee' | 'timeline' | 'terms' | 'privacy',
    modelInstance?: any
) => {
    let fields;

    switch (modelName) {
        case 'employee':
            fields = employeeFormFields;
            break;
        case 'timeline':
            fields = timelineFormFields;
            break;
        case 'terms':
            fields = termsFormFields;
            break;
        case 'privacy':
            fields = privacyFormFields;
            break;
    }

    if (modelInstance) {
        fields = fields.map(field => ({
            ...field,
            defaultValue: modelInstance[field.name],
        }));
    }

    return fields;
};
