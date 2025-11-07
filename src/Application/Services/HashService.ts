import { Injectable } from '@nestjs/common';
import { IHashService } from 'Application/Interfaces/IHashService';

@Injectable()
export class HashService implements IHashService {

    async hash(password: string): Promise<string> {
        const bcrypt = await import('bcrypt');
        return bcrypt.hash(password, 10);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        const bcrypt = await import('bcrypt');
        return bcrypt.compare(password, hash);
    }
}