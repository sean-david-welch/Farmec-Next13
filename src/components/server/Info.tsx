import dynamic from 'next/dynamic';

const Stats = dynamic(() => import('../client/Stats'));
const Specials = dynamic(() => import('../client/Specials'));

const InfoSection = async () => {
    return (
        <section id="Info">
            <Stats />
            <Specials />
        </section>
    );
};

export default InfoSection;
