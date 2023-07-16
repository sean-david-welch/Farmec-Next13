import { PaymentProduct } from '@prisma/client';

export const getFormFields = (paymentProduct?: PaymentProduct) => [
    {
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Enter name',
        defaultValue: paymentProduct?.name,
    },
    {
        name: 'price',
        label: 'Price',
        type: 'text',
        placeholder: 'Enter price',
        defaultValue: paymentProduct?.price,
    },
    {
        name: 'marketing_image',
        label: 'Marketing Image',
        type: 'file',
        placeholder: 'Upload marketing image',
    },
];
