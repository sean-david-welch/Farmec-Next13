import utils from '~/styles/Utils.module.css';

import ContactForm from '../client/ContactForm';
import InfoSection from './Info';

const Contact = () => {
    return (
        <section id="contact">
            <h1 className={utils.sectionHeading}>Contact Us: </h1>
            <div className={utils.contactSection}>
                <ContactForm />
                <iframe
                    width="650"
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
