import { ApiProperty } from '@nestjs/swagger';

export class TaskResponseDto {
  @ApiProperty({ example: 1, description: 'Identifiant unique de la tâche' })
  id: number;

  @ApiProperty({ example: 'Faire les courses', description: 'Nom de la tâche' })
  name: string;

  @ApiProperty({
    example: 'Acheter du pain, du lait et des oeufs',
    description: 'Détails de la tâche',
  })
  details: string;

  @ApiProperty({
    example: true,
    description: 'Indique si la tâche est terminée',
  })
  done: boolean;
}
