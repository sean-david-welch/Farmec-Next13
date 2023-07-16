export const getBlogFormData = (formData: FormData) => ({
    title: formData.get('title') as string,
    date: formData.get('date') as string,
    main_image: formData.get('main_image') as File,
    subheading: formData.get('subheading') as string,
    body: formData.get('body') as string,
});

export const getExhibitionFormData = (formData: FormData) => ({
    title: formData.get('title') as string,
    date: formData.get('date') as string,
    location: formData.get('location') as string,
    info: formData.get('info') as string,
});
