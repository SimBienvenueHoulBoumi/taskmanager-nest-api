import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { TaskService } from './tasks/tasks.service';
import { TaskResponseDto } from './tasks/task-response.dto';
import { TaskRequestDto } from './tasks/task-request.dto';
import { Task } from '@prisma/client';

@ApiTags('Tasks')
@Controller('tasks')
export class AppController {
  constructor(private readonly taskService: TaskService) {}

  private mapToResponseDto(task: Task): TaskResponseDto {
    return {
      id: task.id,
      name: task.name ?? '', 
      done: task.done,
      details: task.details ?? '',
    };
  }

  @Get()
  @ApiOperation({ summary: 'Liste des tâches' })
  @ApiResponse({
    status: 200,
    description: 'Liste des tâches',
    type: [TaskResponseDto],
  })
  async getTasks(): Promise<TaskResponseDto[]> {
    const tasks = await this.taskService.tasks({});
    return tasks.map(this.mapToResponseDto);
  }

  @Get(':id')
  @ApiOperation({ summary: "Détails d'une tâche" })
  @ApiParam({
    name: 'id',
    description: 'Identifiant de la tâche',
    type: 'integer',
  })
  @ApiResponse({
    status: 200,
    description: 'Détails de la tâche',
    type: TaskResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Tâche non trouvée' })
  async getTask(@Param('id') id: string): Promise<TaskResponseDto> {
    const task = await this.taskService.task({ id: Number(id) });
    if (!task) {
      throw new NotFoundException(`La tâche #${id} n'existe pas`);
    }
    return this.mapToResponseDto(task);
  }

  @Post()
  @ApiOperation({ summary: 'Créer une tâche' })
  @ApiBody({ type: TaskRequestDto })
  @ApiResponse({
    status: 201,
    description: 'La tâche a été créée',
    type: TaskResponseDto,
  })
  async createTask(@Body() data: TaskRequestDto): Promise<TaskResponseDto> {
    const task = await this.taskService.createTask(data);
    return this.mapToResponseDto(task);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une tâche' })
  @ApiParam({
    name: 'id',
    description: 'Identifiant de la tâche',
    type: 'integer',
  })
  @ApiBody({ type: TaskRequestDto })
  @ApiResponse({
    status: 200,
    description: 'La tâche a été mise à jour',
    type: TaskResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Tâche non trouvée' })
  async updateTask(
    @Param('id') id: string,
    @Body() data: TaskRequestDto,
  ): Promise<TaskResponseDto> {
    const task = await this.taskService.task({ id: Number(id) });
    if (!task) {
      throw new NotFoundException(`La tâche #${id} n'existe pas`);
    }
    const updatedTask = await this.taskService.updateTask({
      where: { id: Number(id) },
      data,
    });
    return this.mapToResponseDto(updatedTask);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une tâche' })
  @ApiParam({
    name: 'id',
    description: 'Identifiant de la tâche',
    type: 'integer',
  })
  @ApiResponse({
    status: 200,
    description: 'La tâche a été supprimée',
    type: TaskResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Tâche non trouvée' })
  async deleteTask(@Param('id') id: string): Promise<TaskResponseDto> {
    const task = await this.taskService.task({ id: Number(id) });
    if (!task) {
      throw new NotFoundException(`La tâche #${id} n'existe pas`);
    }
    const deletedTask = await this.taskService.deleteTask({ id: Number(id) });
    return this.mapToResponseDto(deletedTask);
  }
}
