import { Controller, Get, Post, Body, Delete, Query, Put, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('all')
    getUsers(): Promise<User[]> {
        return this.usersService.getAll();
    }

    @Post('register-user')
    async regUser(@Body() user: User): Promise<User | null | string> {
        try {
            const createdUser = await this.usersService.regUser(user);
            if (!createdUser) {
              console.log('This login is already in use');
              return 'This login is already in use';
            }
            return createdUser;
        } catch(error) {
            console.error('Error while registering user:', error.message);
            return null;
        }
    }

    @Post('login-user')
    async logUser(@Body() user: User) {
        const response = this.usersService.logUser(user);
        return response;
    }

    @Delete('delete-user-byId')
    removeUserById(@Query('_id') userId: string): void {
        this.usersService.removeUserById(userId);
    }

    @Delete('delete-user-byLogin')
    removeUserByLogin(@Query('login') userLogin: string): void {
        this.usersService.removeUserByLogin(userLogin);
    }
    @Put('change-user-password/:userId')
    async changePassword(@Param('userId') userId: string, @Body() passwords: { lastPassword: string, newPassword: string }): Promise<Object> {
        const result = await this.usersService.changePassword(userId, passwords.lastPassword, passwords.newPassword);
        if (result.success) return { success: true, message: 'Password updated successfully.' };
        else return { success: false, message: result.message };
    }
}
