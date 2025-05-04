import { PartialType } from '@nestjs/mapped-types';
import { CreateTabletDto } from './create-tablet.dto';

export class UpdateTabletDto extends PartialType(CreateTabletDto) {}
