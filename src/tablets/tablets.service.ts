import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Tablet, TabletDocument } from './schemas/tablet.schema'
import { CreateTabletDto } from './dto/create-tablet.dto'
import { UpdateTabletDto } from './dto/update-tablet.dto'

@Injectable()
export class TabletsService {
  constructor(
    @InjectModel(Tablet.name)
    private readonly tabletModel: Model<TabletDocument>,
  ) {}

  async create(dto: CreateTabletDto): Promise<Tablet> {
    return this.tabletModel.create(dto)
  }

  async findAll(): Promise<Tablet[]> {
    return this.tabletModel.find().populate('assignedTo').exec()
  }

  async update(id: string, dto: UpdateTabletDto): Promise<Tablet> {
    const tablet = await this.tabletModel.findByIdAndUpdate(id, dto, {
      new: true,
    })
    if (!tablet) throw new NotFoundException('Tablet no encontrada')
    return tablet
  }

  async assign(id: string, studentId: string): Promise<Tablet> {
    const tablet = await this.tabletModel.findById(id)
    if (!tablet) throw new NotFoundException('Tablet no encontrada')

    tablet.assignedTo = new Types.ObjectId(studentId)
    tablet.status = 'in_use'
    return tablet.save()
  }

  async unassign(id: string): Promise<Tablet> {
    const tablet = await this.tabletModel.findById(id)
    if (!tablet) throw new NotFoundException('Tablet no encontrada')

    tablet.assignedTo = null as any // <-- evita el error de tipo
    tablet.status = 'free'
    return tablet.save()
  }

  async delete(id: string): Promise<{ message: string }> {
    const result = await this.tabletModel.findByIdAndDelete(id)
    if (!result) throw new NotFoundException('Tablet no encontrada')
    return { message: 'Tablet eliminada correctamente' }
  }

  async stats() {
    const [inUse, free, inactive] = await Promise.all([
      this.tabletModel.countDocuments({ status: 'in_use' }),
      this.tabletModel.countDocuments({ status: 'free' }),
      this.tabletModel.countDocuments({ status: 'inactive' }),
    ])

    return { inUse, free, inactive }
  }
}
