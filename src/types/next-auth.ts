import { Role } from '@prisma/client';
import 'next-auth/jwt';

type UserID = string;
type UserRole = Role;

declare module 'next-auth/jwt' {
    interface JWT {
        id: UserID;
        role: UserRole;
    }
}

declare module 'next-auth' {
    interface Session {
        user: User & { id: UserID };
        role: UserRole;
    }
}

declare module 'next-auth' {
    interface User {
        id: UserID;
        role: UserRole;
    }
}
