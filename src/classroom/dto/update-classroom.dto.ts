import { PartialType } from '@nestjs/mapped-types';
import { CreateClassroomDto } from './create-classroom.dto';

export class UpdateClassroomDto extends PartialType(CreateClassroomDto) {}
