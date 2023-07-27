import utils from '~/styles/Utils.module.css';

const Success = () => {
    return (
        <div className="">
            <h1 className={utils.sectionHeading}>Payment Completed</h1>
            <h1 className={utils.subHeading}>
                Thank you for your purchase! An email receipt will be sent to
                you shortly.
            </h1>
        </div>
    );
};

export default Success;
