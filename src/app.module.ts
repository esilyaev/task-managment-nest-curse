import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'task-user',
      password: 'task-password',
      database: 'task-db',
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
})
export class AppModule {}
