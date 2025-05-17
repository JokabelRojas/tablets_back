import { IsString, IsOptional, IsIn, IsMongoId } from 'class-validator'

export class CreateTabletDto {
  @IsString()
  code: string

  @IsOptional()
  @IsIn(['free', 'in_use', 'inactive'])
  status?: 'free' | 'in_use' | 'inactive'

  @IsOptional()
  @IsMongoId()
  assignedTo?: string
}
