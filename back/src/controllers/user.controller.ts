import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { UsuarioService } from '../services/account/user.service';

@Controller('users')
export class UsuarioController {
    constructor(private readonly userService: UsuarioService) { }

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

    @Post(':id')
    async updateUser(@Param('id') id: string, @Body() data: any) {
        return this.userService.update(Number(id), data);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return this.userService.remove(Number(id));
    }
}
