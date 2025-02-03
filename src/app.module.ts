import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service'; // Import PrismaService
import { TaskService } from './tasks/tasks.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [TaskService, PrismaService],
})
export class AppModule {}
