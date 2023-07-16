import styles from '../styles/Blog.module.css';
import utils from '~/styles/Utils.module.css';

import Image from 'next/image';
import Link from 'next/link';

import { prisma } from '~/lib/prisma';
import { getSessionAndUser } from '~/utils/user';
import { UpdateBlog } from '../components/UpdateBlog';

interface Props {
    params: { id: string };
}

const Blog = async ({ params }: Props) => {
    const { user } = await getSessionAndUser();
    const blog = await prisma.blog.findUnique({
        where: {
            id: params.id,
        },
    });

    if (!blog) {
        return <div>Blog not found</div>;
    }

    return (
        <section id="blog">
            <div className={styles.blogDetail}>
                <h1 className={utils.sectionHeading}>{blog.title}</h1>
                <div className={styles.blogBody}>
                    <Image
                        src={blog.main_image || '/default.jpg'}
                        alt={'/default.jpg'}
                        width={400}
                        height={400}
                    />
                    <h1 className={utils.mainHeading}>{blog.subheading}</h1>
                    <p className={utils.paragraph}>{blog.body}</p>
                </div>
            </div>
        </section>
    );
};

export default Blog;
