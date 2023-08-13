'use client';
import utils from '~/styles/Utils.module.css';

import Link from 'next/link';
import TypewriterComponent from 'typewriter-effect';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

const Typewriter = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            {!isClient ? (
                <div className={utils.typewriterSkeleton}></div>
            ) : (
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

                    <button className={utils.btn}>
                        <Link href={'#Info'}>
                            Find Out More:
                            <FontAwesomeIcon icon={faChevronCircleDown} />
                        </Link>
                    </button>
                </div>
            )}
        </>
    );
};

export default Typewriter;
