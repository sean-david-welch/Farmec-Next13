import { prisma } from '~/lib/prisma';
import { Supplier } from '@prisma/client';

import Link from 'next/link';
import SupplierForm from './components/SupplierForm';

const Suppliers = async () => {
    const suppliers: Supplier[] = await prisma.supplier.findMany();

    if (!suppliers) {
        return <div>loading...</div>;
    }

    return (
        <section id="suppliers">
            <h1>Suppliers</h1>
            {suppliers.map(supplier => (
                <div key={supplier.id}>
                    <h2>{supplier.name}</h2>
                    <p>{supplier.description}</p>
                    <Link href={`/suppliers/${supplier.id}`}>
                        <button>Link</button>
                    </Link>
                </div>
            ))}
            <SupplierForm />
        </section>
    );
};

export default Suppliers;
