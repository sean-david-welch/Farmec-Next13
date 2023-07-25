import utils from '~/styles/Utils.module.css';
import Link from 'next/link';

interface LinkProps {
    text: string;
    href: string;
}

interface Props {
    links: LinkProps[];
    title: string;
}

const Index = ({ links, title }: Props) => {
    return (
        <div className={utils.index}>
            <h1 className={utils.indexHeading}>{title}</h1>
            {links.map((link, index) => (
                <Link key={index} href={link.href}>
                    <h1 className={utils.indexItem}>{link.text}</h1>
                </Link>
            ))}
        </div>
    );
};

export default Index;
