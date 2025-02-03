import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class TaskRequestDto {
  @ApiProperty({ example: 'Faire les courses', description: 'Nom de la tâche' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: true,
    description: 'Indique si la tâche est terminée',
  })
  @IsOptional()
  @IsBoolean()
  done?: boolean;

  @ApiProperty({
    example: 'Acheter du pain, du lait et des oeufs',
    description: 'Détails de la tâche',
  })
  @IsOptional()
  @IsString()
  details?: string;
}
