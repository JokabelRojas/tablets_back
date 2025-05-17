import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Student, StudentDocument } from './schemas/student.schema'
import { CreateStudentDto } from './dto/create-student.dto'
import { UpdateStudentDto } from './dto/update-student.dto'

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = new this.studentModel(createStudentDto)
    return student.save()
  }

  async findAll(): Promise<Student[]> {
    return this.studentModel
      .find()
      .populate('tablet')
      .populate('classroom')
      .exec()
  }

  async findOne(id: string): Promise<Student> {
    const student = await this.studentModel
      .findById(id)
      .populate('tablet')
      .populate('classroom')
      .exec()

    if (!student) throw new NotFoundException('Estudiante no encontrado')
    return student
  }

  async update(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const student = await this.studentModel
      .findByIdAndUpdate(id, updateStudentDto, {
        new: true,
      })
      .exec()

    if (!student) throw new NotFoundException('Estudiante no encontrado')
    return student
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.studentModel.findByIdAndDelete(id).exec()

    if (!result) {
      throw new NotFoundException('Estudiante no encontrado')
    }

    return { message: 'Estudiante eliminado correctamente' }
  }
}
