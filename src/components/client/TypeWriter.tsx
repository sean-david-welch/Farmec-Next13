'use client';
import utils from '~/styles/Utils.module.css';

import TypewriterComponent from 'typewriter-effect';

const Typewriter = () => {
    return (
        <h1 className={utils.typewriter}>
            <TypewriterComponent
                options={{
                    loop: false,
                    cursor: '',
                    delay: 50,
                }}
                onInit={typewriter => {
                    typewriter
                        .stop()
                        .typeString(
                            'Importers & Distributors of Quality Agricultural Machinery'
                        )
                        .start();
                }}
            />
        </h1>
    );
};

export default Typewriter;
