import styles from './styles/Blog.module.css';
import utils from '~/styles/Utils.module.css';

import Image from 'next/image';
import Link from 'next/link';

import { prisma } from '~/lib/prisma';
import { getSessionAndUser } from '~/utils/user';
import { BlogForm } from './components/CreateBlog';
import { UpdateBlog } from './components/UpdateBlog';

const Blogs = async () => {
    const { user } = await getSessionAndUser();
    const blogs = await prisma.blog.findMany();

    return (
        <section id="blog">
            <h1 className={utils.sectionHeading}>
                Check out our Latest Blog Posts
            </h1>
            <p className={utils.subHeading}> Read our latest news</p>
            {blogs.map(blog => (
                <div className={styles.blogGrid} key={blog.id}>
                    <div className={styles.blogCard}>
                        <Image
                            src={blog.main_image || '/default.jpg'}
                            alt={'/default.jpg'}
                            width={400}
                            height={400}
                        />
                        <div className={styles.blogLink}>
                            <h1 className={utils.mainHeading}>{blog.title}</h1>
                            <p className={utils.paragraph}>{blog.subheading}</p>
                            <p className={utils.paragraph}>{blog.body}</p>
                            <button className={utils.btnForm}>
                                <Link href={`/blog/${blog.id}`}>Read More</Link>
                            </button>
                        </div>
                    </div>
                    {user && user.role === 'ADMIN' && (
                        <UpdateBlog modelName="blog" model={blog} />
                    )}
                </div>
            ))}
            {user && user.role === 'ADMIN' && <BlogForm modelName="blog" />}
        </section>
    );
};

export default Blogs;
