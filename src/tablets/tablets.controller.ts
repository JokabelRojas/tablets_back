import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common'
import { TabletsService } from './tablets.service'
import { CreateTabletDto } from './dto/create-tablet.dto'
import { UpdateTabletDto } from './dto/update-tablet.dto'
import { AssignTabletDto } from './dto/assign-tablet.dto'
import { AuthGuard } from '@nestjs/passport'
// import { RolesGuard } from '../auth/guards/auth.guard'
import { Roles } from '../common/decorators/roles.decorator'

@Controller('tablets')
export class TabletsController {
  constructor(private readonly tabletsService: TabletsService) {}

  @Post()
  create(@Body() dto: CreateTabletDto) {
    return this.tabletsService.create(dto)
  }

  @Get()
  findAll() {
    return this.tabletsService.findAll()
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTabletDto) {
    return this.tabletsService.update(id, dto)
  }

  @Patch(':id/assign')
  assign(@Param('id') id: string, @Body() dto: AssignTabletDto) {
    return this.tabletsService.assign(id, dto.studentId)
  }

  @Patch(':id/unassign')
  unassign(@Param('id') id: string) {
    return this.tabletsService.unassign(id)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tabletsService.delete(id)
  }

  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Get('stats')
  stats() {
    return this.tabletsService.stats()
  }
}
// console.log
