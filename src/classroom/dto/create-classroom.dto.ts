import { IsInt, Min, Max, IsString } from 'class-validator'

export class CreateClassroomDto {
  @IsInt()
  @Min(1)
  @Max(12)
  grade: number

  @IsString()
  section: string
}
