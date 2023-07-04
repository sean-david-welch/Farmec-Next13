const ContactForm = () => {
    return (
        <section id="contact">
            <form action="">
                <label htmlFor="name">Name:</label>
                <input type="text" required={true} placeholder="name" />
            </form>
        </section>
    );
};

export default ContactForm;
