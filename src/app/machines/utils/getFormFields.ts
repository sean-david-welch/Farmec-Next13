import { Machine, Supplier } from '@prisma/client';
import { prisma } from '~/lib/prisma';

export const getFormFields = async (machine?: Machine) => {
    const suppliers: Supplier[] = await prisma.supplier.findMany();
    const supplierOptions = suppliers.map(supplier => ({
        label: supplier.name,
        value: supplier.id,
    }));
    return [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            placeholder: 'Enter name',
            defaultValue: machine?.name,
        },
        {
            name: 'supplier',
            label: 'Supplier',
            type: 'select',
            options: supplierOptions,
            placeholder: 'Select supplier',
        },
        {
            name: 'machine_image',
            label: 'Machine Image',
            type: 'file',
            placeholder: 'Upload machine image',
        },
        {
            name: 'description',
            label: 'Description',
            type: 'text',
            placeholder: 'Enter description',
            defaultValue: machine?.description,
        },
        {
            name: 'machine_link',
            label: 'Machine Link',
            type: 'text',
            placeholder: 'Enter machine link',
            defaultValue: machine?.machine_link,
        },
    ];
};
