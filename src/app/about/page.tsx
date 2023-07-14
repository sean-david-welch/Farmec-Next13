import utils from '~/styles/Utils.module.css';
import Image from 'next/image';

import { prisma } from '~/lib/prisma';
import { AboutForm } from './components/CreateAbout';
import { getSessionAndUser } from '~/utils/user';

const About = async () => {
    const { user } = await getSessionAndUser();

    const employees = await prisma.employee.findMany({});
    const timeline = await prisma.timeline.findMany({});

    return (
        <section id="about">
            <h1 className={utils.sectionHeading}>Our Team</h1>
            {employees.map(employee => (
                <div key={employee.id}>
                    <h2>{employee.name}</h2>
                    <Image
                        src={employee.profile_image || '/default.jpg'}
                        alt={'/default.jpg'}
                        width={200}
                        height={200}
                    />
                </div>
            ))}
            {user && user.role === 'ADMIN' && (
                <AboutForm modelName="employee" />
            )}
            <h1 className={utils.sectionHeading}>Our Story</h1>
            {timeline.map(event => (
                <div key={event.id}>
                    <h2>
                        {event.title} - {event.date}
                    </h2>
                    <p>{event.body}</p>
                </div>
            ))}
            {user && user.role === 'ADMIN' && (
                <AboutForm modelName="timeline" />
            )}
        </section>
    );
};

export default About;
