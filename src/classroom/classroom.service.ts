import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Classroom, ClassroomDocument } from './schemas/classroom.schema'
import { CreateClassroomDto } from './dto/create-classroom.dto'
import { UpdateClassroomDto } from './dto/update-classroom.dto'

@Injectable()
export class ClassroomService {
  constructor(
    @InjectModel(Classroom.name)
    private readonly classroomModel: Model<ClassroomDocument>,
  ) {}

  async create(createClassroomDto: CreateClassroomDto): Promise<Classroom> {
    return this.classroomModel.create(createClassroomDto)
  }

  async findAll(): Promise<Classroom[]> {
    return this.classroomModel.find().populate('students').exec()
  }

  async findOne(id: string): Promise<Classroom> {
    const classroom = await this.classroomModel
      .findById(id)
      .populate('students')
      .exec()
    if (!classroom) {
      throw new NotFoundException(`Classroom with ID ${id} not found`)
    }
    return classroom
  }

  async update(
    id: string,
    updateClassroomDto: UpdateClassroomDto,
  ): Promise<Classroom> {
    const updatedClassroom = await this.classroomModel
      .findByIdAndUpdate(id, updateClassroomDto, { new: true })
      .exec()
    if (!updatedClassroom) {
      throw new NotFoundException(`Classroom with ID ${id} not found`)
    }
    return updatedClassroom
  }

  async remove(id: string): Promise<void> {
    const result = await this.classroomModel.findByIdAndDelete(id).exec()
    if (!result) {
      throw new NotFoundException(`Classroom with ID ${id} not found`)
    }
  }
}
