import utils from '~/styles/Utils.module.css';

import dynamic from 'next/dynamic';
import InfoSection from './Info';

const Contact = () => {
    const ContactForm = dynamic(() => import('../client/ContactForm'));

    return (
        <section id="contact">
            <h1 className={utils.sectionHeading}>Contact Us: </h1>
            <div className={utils.contactSection}>
                <ContactForm />
                <iframe
                    width="600"
                    height="600"
                    title="Farmec Ireland Ltd Location"
                    className={utils.map}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps/embed/v1/place?q=Farmec%20Ireland%20ltd&key=${process.env.NEXT_PUBLIC_MAPS_KEY}`}
                />
                <InfoSection />
            </div>
        </section>
    );
};

export default Contact;
