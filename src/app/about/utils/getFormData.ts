export const getEmployeeFormData = (formData: FormData) => ({
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    role: formData.get('role') as string,
    bio: formData.get('bio') as string,
    profile_image: formData.get('profile_image') as File,
});

export const getTimelineFormData = (formData: FormData) => ({
    title: formData.get('title') as string,
    date: formData.get('date') as string,
    body: formData.get('body') as string,
});

export const getTermFormData = (formData: FormData) => ({
    title: formData.get('title') as string,
    body: formData.get('body') as string,
});

export const getPrivacyFormData = (formData: FormData) => ({
    title: formData.get('title') as string,
    body: formData.get('body') as string,
});
