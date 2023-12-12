import { Controller, Get, Post, Body, Delete, Query, Param } from '@nestjs/common';
import { PasswordsService } from './passwords.service';
import { Password } from './passwords.schema';

@Controller('passwords')
export class PasswordsController {
    constructor(private readonly passwordsService: PasswordsService) {}

    @Get('')
    getAll() {
        return this.passwordsService.getAll();
    }

    @Get(':userId')
    getPasswordByUserId(@Param('userId') userId: string) {
      return this.passwordsService.getPasswordByUserId(userId);
    }

    @Post('create-password')
    async regUser(@Body() password: Password): Promise<Password> {
        return this.passwordsService.createPassword(password);
    }

    @Delete('delete-password')
    removeUserById(@Query('_id') passwordId: string): void {
        this.passwordsService.removePasswordById(passwordId);
    }
}
