import utils from '~/styles/Utils.module.css';
import Link from 'next/link';

interface LinkProps {
    text: string;
    href: string;
}

interface Props {
    links: LinkProps[];
    title: string;
    page?: string;
    children?: React.ReactNode;
}

const Index = ({ links, title, page, children }: Props) => {
    return (
        <div className={page === 'account' ? utils.accountIndex : utils.index}>
            <h1 className={utils.indexHeading}>{title}</h1>
            {links.map((link, index) => (
                <Link key={index} href={link.href}>
                    <h1 className={utils.indexItem}>{link.text}</h1>
                </Link>
            ))}
            {children}
        </div>
    );
};

export default Index;
