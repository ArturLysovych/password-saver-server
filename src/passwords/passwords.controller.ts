import { Controller, Get, Post, Body } from '@nestjs/common';
import { PasswordsService } from './passwords.service';
import { Password } from './passwords.schema';

@Controller('passwords')
export class PasswordsController {
    constructor(private readonly passwordsService: PasswordsService) {}

    @Get('all')
    getAll() {
        return this.passwordsService.getAll();
    }

    @Post('create-password')
    async regUser(@Body() password: Password): Promise<Password> {
        return this.passwordsService.createPassword(password);
    }
}
