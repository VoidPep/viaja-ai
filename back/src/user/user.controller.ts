import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() data: any) {
        return this.userService.create(data);
    }

    @Get(':id')
    async getUser(@Param('id') id: string) {
        return this.userService.findOne(Number(id));
    }

    @Get()
    async getAllUsers() {
        return this.userService.findAll();
    }

    @Patch(':id')
    async updateUser(@Param('id') id: string, @Body() data: any) {
        return this.userService.update(Number(id), data);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return this.userService.remove(Number(id));
    }
}
