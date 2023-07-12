import axios from 'axios';
import { Product, Machine } from '@prisma/client';

export const getFormFields = async (product?: Product) => {
    const machines = await axios
        .get<Machine[]>('/api/machines')
        .then(res => res.data);

    const machineOptions = machines.map(machine => ({
        label: machine.name,
        value: machine.id,
    }));
    return [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            placeholder: 'Enter name',
            defaultValue: product?.name,
        },
        {
            name: 'machine',
            label: 'Machine',
            type: 'select',
            options: machineOptions,
            placeholder: 'Select machine',
            defaultValue: product?.machineId,
        },
        {
            name: 'product_image',
            label: 'Product Image',
            type: 'file',
            placeholder: 'Upload product image',
        },
        {
            name: 'description',
            label: 'Description',
            type: 'text',
            placeholder: 'Enter description',
            defaultValue: product?.description,
        },
        {
            name: 'product_link',
            label: 'Product Link',
            type: 'text',
            placeholder: 'Enter product link',
            defaultValue: product?.product_link,
        },
    ];
};
