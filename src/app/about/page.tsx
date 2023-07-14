import utils from '~/styles/Utils.module.css';
import Image from 'next/image';

import { prisma } from '~/lib/prisma';
import { AboutForm } from './components/CreateAbout';
import { getSessionAndUser } from '~/utils/user';
import { Employees } from './components/Employees';
import { Timeline } from './components/Timeline';

const About = async () => {
    const { user } = await getSessionAndUser();

    const employees = await prisma.employee.findMany({});
    const timeline = await prisma.timeline.findMany({});

    return (
        <section id="about">
            <h1 className={utils.sectionHeading}>Our Team</h1>
            <Employees />
            {user && user.role === 'ADMIN' && (
                <AboutForm modelName="employee" />
            )}
            <h1 className={utils.sectionHeading}>Our Story</h1>
            <Timeline />
            {user && user.role === 'ADMIN' && (
                <AboutForm modelName="timeline" />
            )}
        </section>
    );
};

export default About;
