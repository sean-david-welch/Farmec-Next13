'use client';
import utils from '~/styles/Utils.module.css';

import Link from 'next/link';
import TypewriterComponent from 'typewriter-effect';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

const Typewriter = () => {
    return (
        <div className={utils.typewriter}>
            <h1>
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

            <Link href={'#Info'}>
                <button className={utils.btn}>
                    Find Out More:
                    <FontAwesomeIcon icon={faChevronCircleDown} />
                </button>
            </Link>
        </div>
    );
};

export default Typewriter;
