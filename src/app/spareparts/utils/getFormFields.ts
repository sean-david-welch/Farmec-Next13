import axios from 'axios';
import { SpareParts, Supplier } from '@prisma/client';

export const getFormFields = async (sparepart?: SpareParts) => {
    const suppliers = await axios
        .get<Supplier[]>('/api/suppliers')
        .then(res => res.data);

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
            defaultValue: sparepart?.name,
        },
        {
            name: 'supplier',
            label: 'Supplier',
            type: 'select',
            options: supplierOptions,
            placeholder: 'Select supplier',
            defaultValue: sparepart?.supplierId,
        },
        {
            name: 'parts_image',
            label: 'Parts Image',
            type: 'file',
            placeholder: 'Upload parts image',
        },
        {
            name: 'description',
            label: 'Description',
            type: 'text',
            placeholder: 'Enter description',
            defaultValue: sparepart?.description,
        },
        {
            name: 'spare_parts_link',
            label: 'Spare Parts Link',
            type: 'text',
            placeholder: 'Enter sparepart link',
            defaultValue: sparepart?.spare_parts_link,
        },
    ];
};
