'use client';
import utils from '~/styles/Utils.module.css';

import axios from 'axios';
import FormDialog from '~/components/client/Dialog';

import { Product } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { uploadImage } from '~/utils/uploadImage';
import { getFormFields } from '../utils/getFormFields';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { DeleteButton } from '~/components/client/DeleteButton';

interface FormField {
    name: string;
    label: string;
    type: string;
    placeholder: string;
    defaultValue?: string | null;
    options?: { label: string | null; value: string }[];
}

const UpdateProduct = ({ product }: { product?: Product }) => {
    const router = useRouter();
    const [showForm, setShowForm] = useState(false);

    const [formFields, setFormFields] = useState<FormField[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const fields = await getFormFields(product);
            setFormFields(fields);
        };
        fetchData();
    }, []);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
        productId: string
    ) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget as HTMLFormElement);

        const productFile = formData.get('product_image') as File;

        const body = {
            name: formData.get('name'),
            machine: formData.get('machine'),
            product_image: productFile ? productFile.name : null,
            description: formData.get('description'),
            product_link: formData.get('product_link'),
        };

        try {
            const response = await axios.put(
                `/api/products/${productId}`,
                body
            );

            if (response.status >= 200 && response.status <= 300) {
                const { productSignature, productTimestamp, folder } =
                    response.data;

                const productFile = formData.get('product_image') as File;

                if (productFile) {
                    await uploadImage(
                        productFile,
                        productSignature,
                        productTimestamp,
                        productFile.name,
                        folder
                    );
                }
            }
        } catch (error) {
            console.error('Failed to create product', error);
        }
        setShowForm(false);

        router.refresh();
    }

    return (
        <section id="form">
            <div className={utils.optionsBtn}>
                <button
                    className={utils.btnForm}
                    onClick={() => setShowForm(!showForm)}>
                    <FontAwesomeIcon
                        icon={faPenToSquare}
                        className={utils.updateIcon}
                    />
                </button>
                {product && (
                    <DeleteButton
                        modelId={product.id}
                        route="products"
                        endpoint={`machines/${product.machineId}`}
                    />
                )}
            </div>
            <FormDialog visible={showForm} onClose={() => setShowForm(false)}>
                <form
                    onSubmit={event =>
                        product && handleSubmit(event, product.id)
                    }
                    className={utils.form}
                    encType="multipart/form-data">
                    <h1 className={utils.mainHeading}>Update Product</h1>
                    {formFields.map(field => (
                        <div key={field.name}>
                            <label htmlFor={field.name}>{field.label}</label>
                            {field.type === 'select' ? (
                                <select
                                    name={field.name}
                                    id={field.name}
                                    defaultValue={field.defaultValue || ''}>
                                    {field.options?.map(option => (
                                        <option
                                            key={option.value}
                                            value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={field.type}
                                    name={field.name}
                                    id={field.name}
                                    defaultValue={field.defaultValue || ''}
                                />
                            )}
                        </div>
                    ))}

                    <button className={utils.btnForm} type="submit">
                        Submit
                    </button>
                </form>
            </FormDialog>
        </section>
    );
};

export default UpdateProduct;
