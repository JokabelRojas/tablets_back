// src/tablets/dto/assign-tablet.dto.ts
import { IsMongoId } from 'class-validator';

export class AssignTabletDto {
  @IsMongoId()
  studentId: string;
}
