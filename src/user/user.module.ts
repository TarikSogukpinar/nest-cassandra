import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { CassandraModule } from 'src/cassandra/cassandra.module';

@Module({
    imports: [CassandraModule],
    controllers: [UsersController],
    providers: [],
    exports: [],
})
export class UserModule { }