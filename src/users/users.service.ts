import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from './schemas/user.schema'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { hashPassword } from 'src/common/encrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto
    const emailExists = await this.findByEmail(email)
    if (emailExists)
      throw new ConflictException(`Email ${email}  ya registrado`)
    const passwordHash = await hashPassword(password)

    await this.userModel.create({
      ...createUserDto,
      password: passwordHash,
    })
    return {
      message: 'Usuario creado correctamente',
      status: HttpStatus.CREATED,
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec()
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec()
    if (!user) throw new NotFoundException('Usuario no encontrado')
    return user
  }

  async findByEmail(email: string) {
    return this.userModel
      .findOne({
        email,
      })
      .exec()
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updated = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, {
        new: true,
      })
      .exec()
    if (!updated) throw new NotFoundException('Usuario no encontrado')
    return updated
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.userModel.findByIdAndDelete(id).exec()
    if (!result) throw new NotFoundException('Usuario no encontrado')
    return { message: 'Usuario eliminado correctamente' }
  }
}
