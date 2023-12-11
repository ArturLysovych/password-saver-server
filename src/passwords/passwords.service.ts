import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Password } from './passwords.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PasswordsService {
    constructor(@InjectModel('Password') private readonly passwordModel: Model<Password>) {}

    getAll(): Promise<Password[]> {
        return this.passwordModel.find({ });
    }
    
    async createPassword(password: Password) {
        const createdPassword = new this.passwordModel(password);
        return createdPassword.save();
    }
}
