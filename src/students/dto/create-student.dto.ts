import { IsString, IsInt, Min, Max, IsMongoId, IsOptional } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsInt()
  @Min(1)
  @Max(5)
  grade: number;

  @IsString()
  section: string;

  @IsOptional()
  @IsMongoId()
  tablet?: string;

  @IsOptional()
  @IsMongoId()
  classroom?: string;
}
