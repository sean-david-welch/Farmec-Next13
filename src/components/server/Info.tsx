import utils from '~/styles/Utils.module.css';

const InfoSection = () => {
    return (
        <div className={utils.infoSection}>
            <h1 className={utils.subHeading}>Business Information:</h1>
            <div className={utils.infoItem}>
                Opening Hours:
                <br />
                <span className={utils.infoItemText}>
                    Monday - Friday: 9am - 5:30pm
                </span>
            </div>
            <div className={utils.infoItem}>
                Telephone:
                <br />
                <span className={utils.infoItemText}>
                    <a href="tel:01 825 9289">01 825 9289</a>
                </span>
            </div>
            <div className={utils.infoItem}>
                International:
                <br />
                <span className={utils.infoItemText}>
                    <a href="tel:+353 1 825 9289">+353 1 825 9289</a>
                </span>
            </div>
            <div className={utils.infoItem}>
                Email:
                <br />
                <span className={utils.infoItemText}>Info@farmec.ie</span>
            </div>
            <div className={utils.infoItem}>
                Address:
                <br />
                <span className={utils.infoItemText}>
                    Clonross, Drumree, Co. Meath, A85PK30
                </span>
            </div>
        </div>
    );
};

export default InfoSection;
