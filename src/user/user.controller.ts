import { Controller, Get, Post, Body } from '@nestjs/common';
import { CassandraService } from '../cassandra/cassandra.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('users')
export class UsersController {
    constructor(private readonly cassandraService: CassandraService) { }

    @Post()
    async createUser(@Body() body: { name: string; email: string }) {
        const id = uuidv4();
        const query = 'INSERT INTO users (id, name, email) VALUES (?, ?, ?)';
        await this.cassandraService.execute(query, [id, body.name, body.email]);
        return { id, ...body };
    }

    @Get()
    async getUsers() {
        const query = 'SELECT * FROM users';
        return this.cassandraService.execute(query);
    }
}
