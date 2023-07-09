import { CldImage } from 'next-cloudinary';
import Image from 'next/image';
import { prisma } from '~/lib/prisma';

interface Props {
    params: { id: string };
}

const SupplierDetail = async ({ params }: Props) => {
    const supplier = await prisma.supplier.findUnique({
        where: {
            id: params.id,
        },
    });

    if (!supplier) {
        return <div>loading...</div>;
    }

    return (
        <section id="supplierDetail">
            <h1>Supplier Detail</h1>
            <Image
                src={supplier.logo_image || '/default.jpg'}
                alt={'/default.jpg'}
                width={200}
                height={200}
            />
        </section>
    );
};

export default SupplierDetail;
