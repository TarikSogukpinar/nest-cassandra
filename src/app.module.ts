import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CassandraModule } from './cassandra/cassandra.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CassandraModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
